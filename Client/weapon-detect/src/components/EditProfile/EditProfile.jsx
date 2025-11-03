import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(""); // State for error message
  const [success, setSuccess] = useState(""); // State for success message
  const [loader, setLoader] = useState(false); // Added loader state
  const navigate = useNavigate();

  useEffect(() => {
    setLoader(true); // Start loader when data is being fetched
    axios.get('http://localhost:3001/user/profile', { withCredentials: true })
      .then((response) => {
        const { firstName, lastName, email, profilePicture } = response.data;
        setFirstName(firstName);
        setLastName(lastName);
        setEmail(email);
        setProfilePicture(profilePicture);  // Set the profile picture from DB
        setLoader(false); // Stop loader once data is fetched
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
        setLoader(false); // Stop loader on error
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    const updateData = {
      currentPassword: password,
      newPassword: newPassword,
    };

    axios.post('http://localhost:3001/user/update-password', updateData, { withCredentials: true })
      .then(response => {
        console.log('Password updated successfully:', response.data);
        navigate("/UserDashboard");
      })
      .catch(error => {
        console.error("Error updating password:", error.response ? error.response.data : error);
      });
  };

  // Handle the profile picture change with file type validation
  const handleProfilePictureChange = async (e) => {
    const selectedFile = e.target.files[0];
    
    if (selectedFile) {
      // Check the file size (50KB = 50 * 1024 bytes)
      if (selectedFile.size > 50 * 1024) {
        setError("File must be less than 50KB. Please select a smaller file.");
        setSuccess(""); // Clear success message
        return;
      }
      
      // Check for valid file types (jpg, png, jpeg)
      const validFileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validFileTypes.includes(selectedFile.type)) {
        setError("Invalid file type. Only JPG, PNG, and JPEG are allowed.");
        setSuccess(""); // Clear success message
        return;
      } else {
        setError(""); // Clear error message if the file type is valid
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result); // Update the profile picture preview

        // Send the base64 string to the backend
        axios.post('http://localhost:3001/user/update-profile-picture', { profilePicture: reader.result }, { withCredentials: true })
          .then(() => {
            setSuccess("Profile picture updated successfully!");
          })
          .catch((error) => {
            console.error('Error updating profile picture:', error);
          });
      };
      reader.readAsDataURL(selectedFile); // Read the file as data URL
    }
  };

  const handleCancel = () => {
    navigate("/UserDashboard/UserDash");
  };

  return (
    <>
      {loader ? <div className="max-w-4xl mx-auto mt-6 p-6 text-center text-gray-600">Loading...</div> : (
        <div className="max-w-4xl mx-auto mt-4 p-6 border border-gray-100 rounded-2xl bg-white/95 backdrop-blur shadow mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Edit Profile</h2>

          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-28 h-28 rounded-full overflow-hidden mb-3 ring-2 ring-offset-2 ring-indigo-500/30">
              {/* Use the default avatar if no profile picture is uploaded */}
              <img
                src={profilePicture || "/Avatar.png"}  // Default avatar if not selected
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <button
              onClick={() => document.getElementById("profilePicture").click()}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-500 transition"
            >
              Change Profile
            </button>
            <input
              type="file"
              id="profilePicture"
              onChange={handleProfilePictureChange}
              className="hidden"
            />
            {/* Show the error message here */}
            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
            {/* Show the success message here */}
            {success && <div className="text-green-500 text-sm mt-2">{success}</div>}
          </div>

          {/* User Info Form */}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <div className="mb-4">
                <label htmlFor="firstName" className="text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/40 bg-gray-50 text-gray-500"
                  required
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border text-gray-500 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/40 bg-gray-50"
                  required
                  readOnly
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border text-gray-500 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/40 bg-gray-50"
                  required
                  readOnly
                />
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="mb-4">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 border text-gray-500 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-2 border text-gray-500 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 border text-gray-500 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
                  required
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="col-span-2 flex flex-row gap-3 justify-end">
              <button
                type="button"
                onClick={handleCancel}
                className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-500"
              >
                Update Info
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default EditProfile;
