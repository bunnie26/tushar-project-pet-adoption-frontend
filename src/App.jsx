import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import "./App.css";
import NotFoundPage from "./pages/NotFoundpage";
import { QueryClientProvider } from "react-query";
import { Provider } from "jotai";
import queryClient from "./services/queryClient";
import toast, { Toaster } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import AdoptedPage from "./pages/AddoptedPage";

const Homepage = lazy(() => import("./pages/Homepage"));
const Donate = lazy(() => import("./pages/Donate"));
const SinglePetPage = lazy(() => import("./pages/SinglePetPage"));
const PetsPage = lazy(() => import("./pages/PetsPage"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));

function App() {
  const hideComponent = window.location.href.includes("/auth/login" || "/auth/register")
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <Router>
          {!hideComponent && <Navbar />}
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Homepage />
                </Suspense>
              }
            />
            <Route
              path="/donate"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Donate />
                </Suspense>
              }
            />
            <Route
              path="/pets/:petId"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SinglePetPage />
                </Suspense>
              }
            />
            <Route
              path="/pets"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <PetsPage />
                </Suspense>
              }
            />
            <Route
              path="/profile"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Profile />
                </Suspense>
              }
            />
            <Route
              path="/adopted"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AdoptedPage />
                </Suspense>
              }
            />
            <Route
              path="/auth/login"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/auth/signup"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Signup />
                </Suspense>
              }
            />
            <Route path="*" element={<NotFoundPage />} /> {/* 404 Route */}
          </Routes>
          <Footer />
        <UnauthorizedAccessHandler />

        </Router>
        <Toaster />
      </Provider>
    </QueryClientProvider>
  );
}


const UnauthorizedAccessHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleUnauthorizedAccess = () => {
      navigate("/auth/login"); // Redirect to login page when unauthorized access event is triggered
      localStorage.removeItem("token");
      // console.log(0)
    };

    document.addEventListener("unauthorizedAccess", handleUnauthorizedAccess);

    return () => {
      document.removeEventListener("unauthorizedAccess", handleUnauthorizedAccess);
    };
  }, [navigate]);

  return null;
};

export default App;
