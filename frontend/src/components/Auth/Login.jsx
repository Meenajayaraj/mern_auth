import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Link, useNavigate } from "react-router-dom";
import '../../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axiosInstance.post('/users/login', formData);
      alert(response.data.message);
      navigate("/home");
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input 
        type="email" 
        name="email" 
        placeholder="Email" 
        onChange={handleChange} 
        value={formData.email}
        required 
      />
      <input 
        type="password" 
        name="password" 
        placeholder="Password" 
        onChange={handleChange} 
        value={formData.password}
        required 
      />
      {error && <p className="error">{error}</p>}
      <p className="forgot-password">
        <Link to="/forgot-password">Forgot your password?</Link>
      </p>
      <button type="submit" disabled={loading}>
        {loading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
};

export default Login;
