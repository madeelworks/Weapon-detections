import React, { useState, useEffect } from 'react';

const UserModel = ({ isOpen, onClose, onAddUser, user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || '');
  const [lastName, setLastName] = useState(user?.lastName || '');
  const [email, setEmail] = useState(user?.email || '');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState(user?.role || '');

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setRole(user.role);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // If user._id exists, it's an update operation
    const updatedUser = { _id: user?._id, firstName, lastName, email, password, role };
    onAddUser(updatedUser);
    onClose(); // Close modal after submitting
  };

  return (
    isOpen && (
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen p-4 text-center">
          <div className="fixed inset-0 bg-gray-500 opacity-75"></div>
          <div className="relative bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4">{user ? 'Edit User' : 'Add New User'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <input
                  type="text"
                  id="role"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end">
                <button type="button" className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-md">
                  {user ? 'Update User' : 'Add User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default UserModel;
