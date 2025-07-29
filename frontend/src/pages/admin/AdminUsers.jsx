// File: src/pages/admin/AdminUsers.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from './AdminLayout';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:3000/api/admin/users', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setUsers(res.data));
  }, [token]);

  const toggleLogin = async (id) => {
    try {
      await axios.patch(`http://localhost:3000/api/admin/disable-user/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(users.map(u =>
        u.id === id ? { ...u, is_login_disabled: !u.is_login_disabled } : u
      ));
    } catch (err) {
      alert('Failed to update user status.');
    }
  };

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.usertype.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-4">User Management</h2>
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-gray-500 text-sm">Total Users</div>
          <div className="text-2xl font-bold">{users.length}</div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-gray-500 text-sm">Active Users</div>
          <div className="text-2xl font-bold">
            {users.filter(u => !u.is_login_disabled).length}
          </div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-gray-500 text-sm">Drivers</div>
          <div className="text-2xl font-bold">
            {users.filter(u => u.usertype === 'driver').length}
          </div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-gray-500 text-sm">Disabled</div>
          <div className="text-2xl font-bold">
            {users.filter(u => u.is_login_disabled).length}
          </div>
        </div>
      </div>
      {/* Search Bar */}
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search by name, email, or role"
          className="border rounded px-3 py-2 w-64"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-center">Role</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id} className="border-t">
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.phoneno}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    user.usertype === 'admin'
                      ? 'bg-purple-100 text-purple-700'
                      : user.usertype === 'driver'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {user.usertype.charAt(0).toUpperCase() + user.usertype.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    user.is_login_disabled
                      ? 'bg-red-100 text-red-700'
                      : 'bg-green-100 text-green-700'
                  }`}>
                    {user.is_login_disabled ? 'Disabled' : 'Active'}
                  </span>
                </td>
                <td className="px-6 py-4 text-center space-x-2">
                  <button
                    onClick={() => toggleLogin(user.id)}
                    className={`px-3 py-1 rounded text-white transition ${
                      user.is_login_disabled
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-red-600 hover:bg-red-700'
                    }`}
                  >
                    {user.is_login_disabled ? 'Unblock' : 'Block'}
                  </button>
                  <button
                    className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-gray-700"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminUsers;
