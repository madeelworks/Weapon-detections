import { useState } from 'react';

export const Addusers = ({ isDialogOpen, closeDialog }) => {
  // Initialize state for the form fields and users list
  const [users, setUsers] = useState([
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    { name: 'Courtney Henry', title: 'Designer', email: 'courtney.henry@example.com', role: 'Admin' },
    { name: 'Tom Cook', title: 'Director of Product', email: 'tom.cook@example.com', role: 'Member' },
    { name: 'Whitney Francis', title: 'Copywriter', email: 'whitney.francis@example.com', role: 'Admin' },
    { name: 'Leonard Krasner', title: 'Senior Designer', email: 'leonard.krasner@example.com', role: 'Owner' },
    { name: 'Floyd Miles', title: 'Principal Designer', email: 'floyd.miles@example.com', role: 'Member' },
  ]);

  const [newUser, setNewUser] = useState({
    name: '',
    title: '',
    email: '',
    role: 'Member',
  });

  const [showForm, setShowForm] = useState(false); // Toggle to show form or user list

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission to add a new user
  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setNewUser({ name: '', title: '', email: '', role: 'Member' }); // Reset the form
    setShowForm(false); // Hide the form after adding the user
  };

  // Handle delete user
  const handleDelete = (email) => {
    setUsers(users.filter((user) => user.email !== email));
  };

  // Handle edit user (You can modify this function to implement editing logic)
  const handleEdit = (email) => {
    const userToEdit = users.find((user) => user.email === email);
    if (userToEdit) {
      setNewUser(userToEdit);
      setShowForm(true); // Show the form to edit user
    }
  };

  return (
    <>
      {isDialogOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white py-8 rounded-sm shadow-lg w-[900px] h-[900px]"> {/* Increased width and height */}
            <h2 className="text-xl font-bold mb-4">User Management</h2>

            {/* Toggle between user list and add user form */}
            {!showForm ? (
              <div>
                {/* User List */}
                <h3 className="text-lg font-semibold mb-4">Existing Users</h3>
                {/* Add User Button */}
                <button
                  onClick={() => setShowForm(true)} // Show the form
                  className="bg-blue-500 text-white py-4 rounded-md w-40 ml-64"
                >
                  Add New User
                </button>
                <div className="overflow-x-auto mb-4">
                  <table className="min-w-full divide-y divide-gray-300">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Name</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Title</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Role</th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {users.map((user, index) => (
                        <tr key={index}>
                          <td className="px-4 py-2 text-sm">{user.name}</td>
                          <td className="px-4 py-2 text-sm">{user.email}</td>
                          <td className="px-4 py-2 text-sm">{user.title}</td>
                          <td className="px-4 py-2 text-sm">{user.role}</td>
                          <td className="px-4 py-2 text-sm flex space-x-2">
                            <button
                              onClick={() => handleEdit(user.email)}
                              className="bg-yellow-500 text-white py-1 px-2 rounded-md"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(user.email)}
                              className="bg-red-500 text-white py-1 px-2 rounded-md"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              // Add User Form
              <div>
                <h3 className="text-lg font-semibold mb-4">Add New User</h3>
                <form onSubmit={handleSubmit} className="mb-6">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                      type="text"
                      name="name"
                      value={newUser.name}
                      onChange={handleChange}
                      placeholder="Enter Username"
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={newUser.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      name="title"
                      value={newUser.title}
                      onChange={handleChange}
                      placeholder="Enter Title"
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <select
                      name="role"
                      value={newUser.role}
                      onChange={handleChange}
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    >
                      <option value="Member">Member</option>
                      <option value="Admin">Admin</option>
                      <option value="Owner">Owner</option>
                    </select>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)} // Go back to user list view
                      className="px-4 py-2 bg-gray-500 text-white rounded-md mr-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-500 text-white rounded-md m-auto"
                    >
                      Add User
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Close Dialog */}
            <div className="mt-auto text-right">
              <button
                onClick={closeDialog}
                className="bg-red-500 text-white mr-5 w-20 rounded-md py-2 "
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
