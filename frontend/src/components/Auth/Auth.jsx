import React, { useContext, useState } from "react";
import "../../styles/Auth.css";
import { Context } from "../../main";
import { Navigate } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import { toast } from "react-toastify";
import axiosInstance from "../../utils/axiosInstance";

const Auth = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  // Handle Login
  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/users/login", { email, password });

      console.log("Login Response:", response); // ✅ Debugging

      if (response.data && response.data.status === "success") {
        setUser(response.data.data.user);
        setIsAuthenticated(true);
        toast.success(response.data.message || "Login successful");
      } else {
        toast.error("Unexpected response format from server");
      }
    } catch (error) {
      console.error("Login Error:", error); // ✅ Debugging
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle Signup
  const handleSignup = async (username, email, password, passwordconfirm) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/users/signup", {
        username,
        email,
        password,
        passwordconfirm, // ✅ Added missing password confirmation
      });

      console.log("Signup Response:", response); // ✅ Debugging

      if (response.data && response.data.status === "success") {
        toast.success(response.data.message || "Signup successful, please verify your email");
        setIsLogin(true); // ✅ Switch to login after successful signup
      } else {
        toast.error("Unexpected response format from server");
      }
    } catch (error) {
      console.error("Signup Error:", error); // ✅ Debugging
      toast.error(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-toggle">
          <button
            className={`toggle-btn ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`toggle-btn ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>
        {isLogin ? (
          <Login onSubmit={handleLogin} loading={loading} />
        ) : (
          <Signup onSubmit={handleSignup} loading={loading} />
        )}
      </div>
    </div>
  );
};

export default Auth;
