import React, { useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import DonateImg from "../assets/donatePet.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import { useAtom } from "jotai";
import { useDonatePet } from "../services/mutation";

const initialFormState = {
  name: "",
  photo: "",
  gender: "",
  age: 0,
  breed: "",
  size: "",
  vaccination: false,
  description: "",
  donation_reason: "",
  pet_type: "",
};

const Donate = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const mutationDonatePet = useDonatePet({
    onSuccess: (e) => {
        console.log(e);
        toast.success("Pet Added Successfully", {
            duration: 4000,
            position: "top-center",
        });
        setLoading(false);
        setFormData(initialFormState);
    },
    onError: (e) => {
        console.log(e);
        if (e.response && e.response.data) {
            const randomKey = Object.keys(e.response.data)[0]; // Get the first key in the response data
            const errorMessage = e.response.data[randomKey]; // Get the corresponding error message

            toast.error(errorMessage, {
                duration: 4000,
                position: "top-center",
                isError: true // Use isError flag to differentiate error toast
            });
        } else {
            toast.error("There is an error!", {
                duration: 4000,
                position: "top-center",
                isError: true
            });
        }
        setLoading(false);
    },
});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    if (name === "age") {
      setFormData({
        ...formData,
        [name]: parseInt(value) || 0,
      });
    } else if (name === "vaccination") {
      setFormData({
        ...formData,
        [name]: value === "true",
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = () => {
    // Check for empty or undefined values in formData
    const emptyFields = Object.entries(formData).filter(([key, value]) => {
      return value === "" || value === null || value === undefined;
    });

    if (emptyFields.length > 0) {
      // Handle case where form has empty or undefined fields
      emptyFields.forEach(([key, value]) => {
        toast.error(`Field '${key}' is empty.`);
      });
      return;
    }

    // All fields are filled; proceed with submission
    // Add further processing logic here
    mutationDonatePet.mutateAsync(formData);
  };

  return (
    <div>
      <Box
        sx={
          {
            // Your styles...
          }
        }
      >
        {/* Your content */}
        <Grid container spacing={3}>
          {/* Left side: Form */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  Pet Donation Form
                </Typography>
                {Object.keys(initialFormState).map((key) => {
                  if (key === "size") {
                    return (
                      <FormControl key={key} fullWidth margin="normal">
                        <InputLabel>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </InputLabel>
                        <Select
                          name={key}
                          value={formData[key]}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="small">Small</MenuItem>
                          <MenuItem value="medium">Medium</MenuItem>
                          <MenuItem value="large">Large</MenuItem>
                        </Select>
                      </FormControl>
                    );
                  } else if (key === "gender") {
                    return (
                      <FormControl key={key} fullWidth margin="normal">
                        <InputLabel>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </InputLabel>
                        <Select
                          name={key}
                          value={formData[key]}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="male">Male</MenuItem>
                          <MenuItem value="female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    );
                  } else if (key === "vaccination") {
                    return (
                      <FormControl key={key} fullWidth margin="normal">
                        <InputLabel>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </InputLabel>
                        <Select
                          name={key}
                          value={formData[key].toString()}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="true">Yes</MenuItem>
                          <MenuItem value="false">No</MenuItem>
                        </Select>
                      </FormControl>
                    );
                  } else if (key === "pet_type") {
                    // New field for pet_type
                    return (
                      <FormControl key={key} fullWidth margin="normal">
                        <InputLabel>
                          {key.charAt(0).toUpperCase() + key.slice(1)}
                        </InputLabel>
                        <Select
                          name={key}
                          value={formData[key]}
                          onChange={handleInputChange}
                        >
                          <MenuItem value="dog">Dog</MenuItem>
                          <MenuItem value="cat">Cat</MenuItem>
                        </Select>
                      </FormControl>
                    );
                  } else {
                    return (
                      <TextField
                        key={key}
                        label={key.charAt(0).toUpperCase() + key.slice(1)}
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        name={key}
                        value={formData[key]}
                        onChange={handleInputChange}
                        type={key === "age" ? "number" : "text"}
                      />
                    );
                  }
                })}
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleSubmit}
                  disabled={loading} // Disable button during loading
                  sx={{
                    mt: 2,
                    color: "#FF842D",
                    borderColor: "#FF842D",
                    position: "relative", // Position relative for CircularProgress
                  }}
                >
                  {loading && (
                    <CircularProgress
                      size={24}
                      sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                        color: "#FF842D", // Match CircularProgress color with button
                      }}
                    />
                  )}
                  {!loading ? "Submit" : "Submitting..."}
                </Button>
              </CardContent>
            </Card>
          </Grid>
          {/* Right side: Random Image */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
            }}
          >
            {window.innerWidth > 600 && (
              <img
                src={DonateImg}
                alt="Pet"
                style={{ height: "600px", borderRadius: "8px" }}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Donate;
