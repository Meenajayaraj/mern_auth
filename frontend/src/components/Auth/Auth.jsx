import React, { useContext, useState } from "react";
import '../../styles/Auth.css';
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

  
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  const handleLogin = async (email, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/login", { email, password });
      setUser(response.data.user); 
      setIsAuthenticated(true);
      toast.success("Login successful");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (username, email, password) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/signup", { username, email, password });
      toast.success("Signup successful, please verify your email");
      setIsLogin(true); 
    } catch (error) {
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
