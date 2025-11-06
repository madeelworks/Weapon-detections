import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserModel from '../../utility/Models/UserModel';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [editUser, setEditUser] = useState(null); // State to store the user being edited
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [usersPerPage] = useState(7); // Number of users per page

  // Fetch users from the backend when the component loads
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/auth/users', { withCredentials: true });
        setUserList(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = userList.slice(indexOfFirstUser, indexOfLastUser);

  const openModal = (user = null) => {
    setEditUser(user); // Set the user to be edited
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditUser(null); // Reset the edit user state
  };

  // Add or Edit user to the backend and update userList
  const addUser = async (newUser) => {
    try {
      if (newUser._id) {
        // If _id exists, it's an edit operation
        const response = await axios.put(`http://localhost:3001/auth/admin/update-user/${newUser._id}`, newUser, {
          withCredentials: true, // Send cookies with the request
        });
        console.log(response.data);
      } else {
        // If no _id, it's a new user add operation
        const response = await axios.post('http://localhost:3001/auth/admin/add-user', newUser, {
          withCredentials: true,  // Send cookies with the request
        });
        console.log(response.data);
      }
      // After adding or updating, re-fetch users
      const response = await axios.get('http://localhost:3001/auth/users', { withCredentials: true });
      setUserList(response.data);
    } catch (error) {
      console.error('Error adding or editing user:', error.response?.data || error.message);
    }
  };

  // Delete user
  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(`http://localhost:3001/auth/admin/delete-user/${userId}`, {
        withCredentials: true, // Send cookies with the request
      });
      console.log(response.data);
      // After deletion, re-fetch users
      const responseUsers = await axios.get('http://localhost:3001/auth/users', { withCredentials: true });
      setUserList(responseUsers.data);
    } catch (error) {
      console.error('Error deleting user:', error.response?.data || error.message);
    }
  };

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total pages
  const totalPages = Math.ceil(userList.length / usersPerPage);

  return (
    <div className="bg-gray-50 min-h-screen w-full p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Users Management</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage all users in your system
            </p>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition"
            onClick={() => openModal()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add User
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider sm:pl-6">
                  First Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Last Name
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Password
                </th>
                <th scope="col" className="px-3 py-3.5 text-left text-xs font-semibold text-gray-900 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-3 py-3.5 text-right text-xs font-semibold text-gray-900 uppercase tracking-wider sm:pr-6">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-12 text-center text-sm text-gray-500 sm:px-6">
                    No users found. Click "Add User" to create one.
                  </td>
                </tr>
              ) : (
                currentUsers.map((person) => (
                  <tr key={person._id} className="hover:bg-gray-50 transition">
                    <td className="whitespace-nowrap py-4 pl-4 text-sm font-medium text-gray-900 sm:pl-6">
                      {person.firstName}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.lastName}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.email}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className="font-mono text-xs">********</span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        person.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {person.role || 'user'}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => openModal(person)} 
                          className="text-indigo-600 hover:text-indigo-900 font-medium transition"
                        >
                          Edit
                        </button>
                        <span className="text-gray-300">|</span>
                        <button 
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${person.firstName} ${person.lastName}?`)) {
                              deleteUser(person._id);
                            }
                          }} 
                          className="text-red-600 hover:text-red-900 font-medium transition"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1} 
            className={`px-4 py-2 ${currentPage > 1 ? 'hover:text-red-500 underline' : 'text-gray-500'} bg-indigo-600 text-white rounded-l-md`}
          >
            Previous
          </button>
          <button 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === totalPages} 
            className={`px-4 py-2 ${currentPage < totalPages ? 'hover:text-red-500 underline' : 'text-gray-500'} bg-indigo-600 text-white rounded-r-md`}
          >
            Next
          </button>
        </div>
      </div>

      {/* UserModel Dialog */}
      <UserModel isOpen={isModalOpen} onClose={closeModal} onAddUser={addUser} user={editUser} />
    </div>
  );
};

export default Users;
