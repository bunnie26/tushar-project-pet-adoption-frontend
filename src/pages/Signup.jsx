import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useSignupData } from "../services/mutation";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { authAtom, isLoggedIn } from "../atoms/index";
import toast from "react-hot-toast";
import axiosWithAuth from "../services/axios";

import { CircularProgress } from "@mui/material";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useAtom(authAtom);
  const [loggedIn, setLoggedIn] = useAtom(isLoggedIn);
  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const mutationSignup = useSignupData({
    onSuccess: (e) => {
      localStorage.setItem(
        "token",
        JSON.stringify({
          authToken: e.token.access,
          refreshToken: e.token.refresh,
        })
      );
      axiosWithAuth.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${e.token.access}`;
      setAuthTokens({
        authToken: e.token.access,
        refreshToken: e.token.refresh,
      });
      setLoggedIn(true);
      toast.success("Successfully Signed Up!", {
        duration: 4000,
        position: "top-center",
      });
      setLoading(false);
      setFormData({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
      navigate("/profile");
    },
    onError: (e) => {
      toast.error(
        e?.response?.data?.error?.non_field_errors
          ? e.response.data.error.non_field_errors[0]
          : "There is a error!",
        {
          duration: 4000,
          position: "top-center",
        }
      );
      setLoading(false);
    },
  });

  const handleSignup = () => {
    // Handle signup logic here
    setLoading(true);
    mutationSignup.mutateAsync(formData);
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
      <Container maxWidth="xs" className="py-4 bg-white px-2 mt-20">
        <Typography
          variant="h4"
          component="div"
          sx={{ textAlign: "center", mb: 3 }}
        >
          Sign Up
        </Typography>
        <form>
          <TextField
            fullWidth
            variant="outlined"
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Confirm Password"
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSignup}
            sx={{ mb: 2 }}
          >
            Sign Up
          </Button>
          <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
            Already have an account? <Link href="/auth/login">Log in</Link>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default SignupPage;
