import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage("Please enter your email.");
      return;
    }

    // Axios request to send reset password email
    axios.post('http://localhost:3001/auth/forgot-password', { email })
      .then(() => {
        setMessage("If the email is registered, a password reset link has been sent.");
      })
      .catch(() => {
        setErrorMessage("Something went wrong. Please try again later.");
      });
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="w-[500px] mx-auto mt-4 bg-gradient-to-r from-[#482566] to-black p-12 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Forgot Password</h2>

        <form onSubmit={handleResetPassword}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-white">Enter your email</label>
            <input
              type="email"
              id="email"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Display success or error message */}
          {message && <p className="text-green-500 text-center">{message}</p>}
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full py-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none"
          >
            Reset Password
          </button>
        </form>

        <p className="text-center mt-6 text-white">
          Remembered your password?{' '}
          <a
            href="#"
            onClick={() => navigate('/login')} // Navigate to Login page
            className="text-red-500 hover:underline"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
