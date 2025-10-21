import React from "react";

// Import React Router components for navigation
import {
  BrowserRouter as Router, // Main routing context provider
  Routes, // Container for all Route definitions
  Route, // Used to define individual route paths
  Navigate, // Used for redirection
} from "react-router-dom";

// Import application page components
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import Home from "./pages/Dashboard/Home";
import Income from "./pages/Dashboard/Income";
import Expense from "./pages/Dashboard/Expense";
import UserProvider from "./context/UserContext";
import { Toaster } from "react-hot-toast";

// Main application component
const App = () => {
  return (
    <UserProvider>
      <div>
        {/* Setup the Router to handle browser routing */}
        <Router>
          <Routes>
            {/* Root route that checks auth status and redirects accordingly */}
            <Route path="/" element={<Root />} />

            {/* Auth-related pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />

            {/* Protected dashboard-related pages */}
            <Route path="/dashboard" element={<Home />} />
            <Route path="/income" element={<Income />} />
            <Route path="/expense" element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize:'13px'
          },
        }}
      />
    </UserProvider>
  );
};

export default App;

// Root component for the "/" route
const Root = () => {
  // Convert the token presence into a boolean
  const isAuthenticated = !!localStorage.getItem("token");

  // If authenticated, redirect to dashboard; otherwise, go to login
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  );
};
