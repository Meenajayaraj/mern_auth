import React, { useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import '../../styles/Forgot.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/users/forgot-password', { email });
      alert(response.data.message);
      setOtpSent(true);
    } catch (error) {
      alert(error.response?.data?.message || 'Request failed');
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    navigate('/reset-password');
  };

  return (
    <div>
      <h1>Forgot Password</h1>
      {!otpSent ? (
        <form onSubmit={handleEmailSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Send OTP</button>
        </form>
      ) : (
        <form onSubmit={handleOtpSubmit}>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            onChange={(e) => setOtp(e.target.value)}
            required
          />
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
