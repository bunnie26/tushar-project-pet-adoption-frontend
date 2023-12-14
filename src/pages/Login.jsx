import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { useLoginData } from "../services/mutation";
import { authAtom, isLoggedIn } from "../atoms/index";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";
import axiosWithAuth from "../services/axios";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [authTokens, setAuthTokens] = useAtom(authAtom);
  const [loggedIn, setLoggedIn] = useAtom(isLoggedIn);
  const handleInputChange = (event) => {
    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };
  const mutationLogin = useLoginData({
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
      toast.success("Successfully Logged In!", {
        duration: 4000,
        position: "top-center",
      });
      setLoading(false);
      setCredentials({ email: "", password: "" });
      navigate("/");
    },
    onError: (e) => {
      toast.error(
        e?.response?.data?.errors?.non_field_errors
          ? e.response.data.errors.non_field_errors[0]
          : "There is a error!",
        {
          duration: 4000,
          position: "top-center",
        }
      );
      setLoading(false);
    },
  });
  const handleLogin = () => {
    // Handle login logic here
    setLoading(true);
    mutationLogin.mutateAsync(credentials);
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
          Login
        </Typography>
        <form>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            name="email"
            type="email"
            value={credentials.email}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Password"
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleLogin}
            disabled={loading} // Disable button during loading
            sx={{ mb: 2, position: "relative" }}
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
                }}
              />
            )}{" "}
            {/* Show CircularProgress when loading */}
            {!loading ? "Login" : "Logging in..."}{" "}
            {/* Change text based on loading state */}
          </Button>
          <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
            Don't have an account? <Link href="/auth/signup">Sign up</Link>
          </Typography>
        </form>
      </Container>
    </Box>
  );
};

export default LoginPage;
