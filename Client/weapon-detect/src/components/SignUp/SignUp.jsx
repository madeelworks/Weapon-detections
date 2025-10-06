import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import axios from 'axios';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Frontend validation before sending the request
    if (!email || !password || !confirmPassword) {
      setErrorMessage('All fields are required.');
      return; // Don't proceed if any field is missing
    }

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return; // Don't proceed if passwords don't match
    }

    // Clear any existing error messages
    setErrorMessage('');

    try {
      // Make the POST request to the backend to register the user
      const result = await axios.post('http://localhost:3001/auth/register', { email, password });
      console.log(result);
      
      // On success, navigate to login page
      navigate('/login');
    } catch (err) {
      console.log(err);
      setErrorMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="bg-white min-h-screen flex justify-center items-center">
      <div className="w-[500px] mx-auto mt-12 bg-gradient-to-r from-[#482566] to-black p-12 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold mb-6 text-center text-white">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="email" className="block text-lg font-medium text-white">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Directly use setEmail
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-lg font-medium text-white">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Directly use setPassword
              required
            />
          </div>

          <div className="mb-8">
            <label htmlFor="confirmPassword" className="block text-lg font-medium text-white">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-4 mt-2 border border-gray-300 rounded-md"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)} // Directly use setConfirmPassword
              required
            />
          </div>

          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

          <button
            type="submit"
            className="w-full py-4 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 focus:outline-none"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center mt-6 text-white">
          Already have an account?{' '}
          <a
            href="#"
            onClick={() => navigate('/login')} // This will navigate to the login page
            className="text-red-600 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
