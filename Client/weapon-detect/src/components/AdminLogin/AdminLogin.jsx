import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // React Router for navigation

const AdminLogin = ({ setIsAdminLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Use navigate to redirect on success

  const handleAdminLogin = (e) => {
    e.preventDefault();

    // Reset error message before making the API call
    setErrorMessage('');

    // Call the backend to check credentials
    axios
      .post('http://localhost:3001/auth/admin/login', { email, password })  // Notice the '/auth' prefix
      .then((response) => {
        console.log("login",response); // Log the response for debugging
        setIsAdminLoggedIn(true); // If admin login is successful, set state
        navigate('/dashboard'); // Redirect to Admin Dashboard
      })
      .catch((error) => {
        if (error.response) {
          // Server responded with an error
          console.log("Error login response:", error.response); // Log for debugging
          setErrorMessage(error.response.data.error || 'Something went wrong');
        } else if (error.request) {
          // Request was made but no response was received
          console.log("Error request:", error.request); // Log for debugging
          setErrorMessage('No response from the server');
        } else {
          // Something went wrong in setting up the request
          console.log("Error message:", error.message); // Log for debugging
          setErrorMessage('Error: ' + error.message);
        }
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-[#4F2A7F] to-[#482566]">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
        <h1 className="text-3xl font-bold text-center text-[#4F2A7F] mb-6">Admin Login</h1>

        {/* Login Form */}
        <form onSubmit={handleAdminLogin}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F2A7F] focus:border-[#4F2A7F]"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-gray-700">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4F2A7F] focus:border-[#4F2A7F]"
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center mb-4">{errorMessage}</p>
          )}

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-[#4F2A7F] text-white font-semibold rounded-md hover:bg-[#482566] transition duration-300"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">Forgot your password?</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
