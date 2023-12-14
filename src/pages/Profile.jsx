import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Tabs,
  Tab,
  TextField,
  Button,
  Grid,
  Skeleton,
} from "@mui/material";
import { useGetProfileData } from "../services/hooks";
import { useUpdateUserData } from "../services/mutation";
import toast from "react-hot-toast";


const Profile = () => {
  const [value, setValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const userData = useGetProfileData();
  const user = userData?.data;
  const isLoading = userData.isLoading;
  const mutationUpdateProfile = useUpdateUserData({
    onSuccess: (e) => {
      console.log(e);
      toast.success("User Profile Updated Successfuly!", {
        duration: 4000,
        position: "top-center",
      });
      setLoading(false);
    },
    onError: (e) => {
      if (e.response && e.response.data) {
        const randomKey = Object.keys(e.response.data.error)[0]; // Get the first key in the response data
        const errorMessage = randomKey + " : " + e.response.data.error[randomKey]; // Get the corresponding error message

        toast.error(errorMessage, {
          duration: 4000,
          position: "top-center",
          isError: true, // Use isError flag to differentiate error toast
        });
      } else {
        toast.error("There is an error!", {
          duration: 4000,
          position: "top-center",
          isError: true,
        });
      }
      console.log(e);
      setLoading(false);
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setPhoneNumber(user.phone_number);
      setCountry(user.country);
      setAddress(user.address);
      setState(user.state);
      setZipCode(user.zip_code);
      setEmail(user.email);
    }
  }, [user]);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleStateChange = (event) => {
    setState(event.target.value);
  };

  const handleZipCodeChange = (event) => {
    setZipCode(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = () => {
    mutationUpdateProfile.mutateAsync({
      email: email,
      name: name,
      phone_number: phoneNumber,
      country: country,
      state: state,
      zip_code: zipCode,
      address: address,
    });
    console.log("Form submitted!", {
      name,
      phoneNumber,
      email,
      country,
      address,
      state,
      zipCode,
    });
  };

  return (
    <Box
      sx={{
        background: "#f1f1f1",
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "75vh",
      }}
    >
      <Container maxWidth="lg" className="py-4 bg-white px-2 my-12">
        <Typography variant="h4" component="div">
          My Profile
        </Typography>
        <Box sx={{ width: "100%" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            aria-label="profile tabs"
          >
            <Tab label="About Me" />
            {/* Add other tabs as needed */}
          </Tabs>
          <Box hidden={value !== 0}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12}>
                  <Typography variant="body1">What is your name?</Typography>
                </Grid>
                <Grid item xs={12}>
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={60} />
                  ) : (
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Name"
                      value={name}
                      onChange={handleNameChange}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">What is your email?</Typography>
                </Grid>
                <Grid item xs={12}>
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={60} />
                  ) : (
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">
                    How can you be reached?
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={60} />
                  ) : (
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Phone Number"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1">Where do you live?</Typography>
                </Grid>
                <Grid item xs={6}>
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={60} />
                  ) : (
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Country"
                      value={country}
                      onChange={handleCountryChange}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={60} />
                  ) : (
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Address"
                      value={address}
                      onChange={handleAddressChange}
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={60} />
                  ) : (
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="State"
                      value={state}
                      onChange={handleStateChange}
                    />
                  )}
                </Grid>
                <Grid item xs={6}>
                  {isLoading ? (
                    <Skeleton variant="rectangular" height={60} />
                  ) : (
                    <TextField
                      fullWidth
                      variant="outlined"
                      label="Zip Code"
                      value={zipCode}
                      onChange={handleZipCodeChange}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                  disabled={loading} // Disable button during loading
                  sx={{
                    backgroundColor: "#FF842D",
                    "&:hover": {
                      backgroundColor: "#FF842D",
                      opacity: 0.9,
                    },
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
                </Grid>
              </Grid>
            </form>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Profile;
