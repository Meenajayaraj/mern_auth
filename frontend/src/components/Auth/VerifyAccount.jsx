import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import '../../styles/Verify.css'

const VerifyAccount = () => {
  const [otp, setOtp] = useState('');
  const [resending, setResending] = useState(false); 
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post('/users/verify', { otp });
      alert(response.data.message);
      navigate('/login'); 
    } catch (error) {
      alert(error.response?.data?.message || 'Verification failed');
    }
  };

  // Resend OTP logic
  const handleResendOtp = async () => {
    setResending(true); 
    setError(''); 

    try {
      const response = await axiosInstance.post('/users/resend-otp');
      alert(response.data.message);
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setResending(false); 
    }
  };

  return (
    <div className="verify-container">
      <h2>Verify Your Account</h2>
      <p>Please enter the OTP sent to your email.</p>
      <form onSubmit={handleSubmit} className="verify-form">
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify</button>

        {/* Resend OTP */}
        <div className="resend-container">
          <a
            href="#"
            className="resend-otp"
            onClick={handleResendOtp}
            disabled={resending} 
          >
            {resending ? 'Resending OTP...' : "Didn't receive the code? Resend"}
          </a>
          {error && <div className="error-message">{error}</div>}
        </div>
      </form>
    </div>
  );
};

export default VerifyAccount;
