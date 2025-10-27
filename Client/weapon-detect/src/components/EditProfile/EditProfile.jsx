import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from 'axios'; 

function EditProfile() {
  const [firstName, setFirstName] = useState(""); 
  const [lastName, setLastName] = useState("");   
  const [email, setEmail] = useState("");         
  const [password, setPassword] = useState("");   
  const [newPassword, setNewPassword] = useState(""); 
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [profilePicture, setProfilePicture] = useState(null); 
  const navigate = useNavigate(); 

  useEffect(() => {
    axios.get('http://localhost:3001/user/profile', { withCredentials: true })
      .then((response) => {
        const { firstName, lastName, email } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    const updateData = {
      currentPassword: password,  // The current password entered by the user
      newPassword: newPassword,   // The new password entered by the user
    };

    // Send the request to update the password with credentials
    axios.post('http://localhost:3001/user/update-password', updateData, { withCredentials: true })
      .then(response => {
        console.log('Password updated successfully:', response.data);
        navigate("/UserDashboard");
      })
      .catch(error => {
        console.error("Error updating password:", error.response ? error.response.data : error);
      });
  };

  const handleCancel = () => {
    navigate("/UserDashboard/UserDash");
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file));  // Update the profile picture preview with the selected file
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-2 p-6 border border-gray-300 rounded-lg bg-white shadow-lg mb-2 ">
      <h2 className="text-xl font-bold text-center text-gray-800 mb-2">Edit Profile</h2>

      {/* Profile Picture */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-32 h-32 rounded-full overflow-hidden mb-4 border-2 border-gray-300">
          <img
            // Display the uploaded picture or a default avatar if not uploaded
            src={profilePicture || "/src/assets/Avatar.png"} // Update the default avatar path if needed
            alt="Profile Preview"
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={() => document.getElementById("profilePicture").click()}
          className="bg-blue-500 text-white px-2 py-1 rounded-md text-lg hover:bg-blue-400 transition duration-300"
        >
          Change Profile
        </button>
        <input
          type="file"
          id="profilePicture"
          onChange={handleProfilePictureChange}
          className="hidden"
        />
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Column - User Info */}
        <div>
          <div className="mb-4">
            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="James Allan"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              readOnly 
            />
          </div>

          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Allan"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              readOnly
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="demomail@mail.com"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              readOnly
            />
          </div>
        </div>

        {/* Right Column - Password and Confirmation */}
        <div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Current Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Submit buttons */}
        <div className="col-span-2 flex justify-between">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-6 py-3 rounded-md text-sm hover:bg-red-400 transition duration-300 ml-80"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded-md text-sm hover:bg-blue-400 transition duration-300"
          >
            Update Info
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
