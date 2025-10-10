import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserModel from '../../utility/Models/UserModel';

const Users = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userList, setUserList] = useState([]);
  const [editUser, setEditUser] = useState(null);  // State to store the user being edited

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

  const openModal = (user = null) => {
    setEditUser(user);  // Set the user to be edited
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

  return (
    <div className="bg-white min-h-screen w-full px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center justify-between">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold text-gray-900">Users</h1>
          <p className="mt-2 text-sm text-gray-500">
            A list of all the users in your account, including their first name, last name, email, password, role, and action.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-500 px-3 py-2 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            onClick={() => openModal()}
          >
            Add user
          </button>
        </div>
      </div>

      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="relative min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    First Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Last Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Email
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Password
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Role
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 pl-24">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {userList.map((person) => (
                  <tr key={person._id}>
                    <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0">
                      {person.firstName}
                    </td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{person.lastName}</td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{person.email}</td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{'********'}</td>
                    <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">{person.role}</td>
                    <td className="pr-20 text-right text-sm font-medium whitespace-nowrap sm:pr-0">
                      <button onClick={() => openModal(person)} className="text-indigo-600 hover:text-indigo-500">
                        Edit
                      </button>
                      <span className="mx-2 text-gray-500">|</span>
                      <button onClick={() => deleteUser(person._id)} className="text-red-600 hover:text-red-500">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* UserModel Dialog */}
      <UserModel isOpen={isModalOpen} onClose={closeModal} onAddUser={addUser} user={editUser} />
    </div>
  );
};

export default Users;
