import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

function ResetPassword() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { id, token } = useParams();  // Extract the user ID and token from URL parameters

  const handleSubmit = (e) => {
    e.preventDefault();

    // Ensure the token and id are properly encoded
    const url = `http://localhost:3001/auth/reset-password/${encodeURIComponent(id)}/${encodeURIComponent(token)}`;

    axios.post(url, { password })
      .then((res) => {
        if (res.data.Status === 'Success') {
          navigate('/login');  // Navigate to login page after reset
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="w-[500px] mx-auto mt-4 bg-gradient-to-r from-[#482566] to-black p-12 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Reset Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-white">New Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              autoComplete="off"
              name="password"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Display success or error message */}
          <button
            type="submit"
            className="w-full py-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none"
          >
            Update
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
}

export default ResetPassword;
