import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const Login = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate if fields are empty
    if (!email || !password) {
      setErrorMessage("Both fields are required");
      return;
    }

    // Axios request to send login data
    axios.post('http://localhost:3001/auth/login', { email, password })
      .then(result => {
        console.log("result", result);
        // If login is successful, navigate to dashboard
        if (result.data.message === "Login successful") {
          setIsLoggedIn(true); // Set the login state to true
          console.log("User logged in successfully");

          // Use navigate to redirect to the dashboard
          navigate('/UserDashboard'); // Navigate to the dashboard page
        } else {
          setErrorMessage("Invalid credentials, please try again.");
        }
      })
      .catch(err => {
        console.log(err);
        setErrorMessage("Something went wrong, please try again later.");
      });
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="w-[500px] mx-auto mt-4 bg-gradient-to-r from-[#482566] to-black p-12 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6 text-center text-white">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Directly update email
              required
            />
          </div>

          <div className="mb-8">
            <label htmlFor="password" className="block text-lg font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Directly update password
              required
            />
          </div>

          {/* Display error message if any */}
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full py-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-white">
          Don't have an account?{' '}
          <a
            href="#"
            onClick={() => navigate('/signup')} // This will navigate to the signup page
            className="text-red-500 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
