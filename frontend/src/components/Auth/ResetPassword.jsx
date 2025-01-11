import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'sonner'; 
import '../../styles/Reset.css';

const ResetPassword = () => {
  const [formData, setFormData] = useState({ email: '', otp: '', password: '', passwordconfirm: '' });
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.passwordconfirm) {
      toast.error("Passwords do not match.");
      return;
    }
    
    try {
      const response = await axiosInstance.post('/users/reset-password', formData);
      toast.success(response.data.message);
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleSubmit} className="reset-password-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          required
        />
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          onChange={handleChange}
          value={formData.otp}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="New Password"
          onChange={handleChange}
          value={formData.password}
          required
        />
        <input
          type="password"
          name="passwordconfirm"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={formData.passwordconfirm}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
