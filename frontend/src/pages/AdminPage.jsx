import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [users, setUsers] = useState([]);
  const token = localStorage.getItem('token');

  // Fetch all driver documents (with driver info)
  const fetchDrivers = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/admin/drivers', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setDrivers(data);
    } catch (err) {
      console.error('❌ Error fetching drivers:', err);
    }
  };

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('❌ Error fetching users:', err);
    }
  };

  // Approve or Reject a driver document
  const handleDriverAction = async (documentId, status) => {
  try {
    const res = await fetch(`http://localhost:3000/api/admin/driver-status/${documentId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ status })
    });
    const result = await res.json();
    if (result.message) {
      alert(result.message);
    } else if (result.error) {
      alert(result.error);
    } else {
      alert('Action completed.');
    }
    fetchDrivers();
  } catch (err) {
    alert('Network error or server unavailable.');
    console.error(err);
  }
};


  // Block or Unblock a user
  const handleUserAction = async (userId, disable) => {
    try {
      const res = await fetch(`http://localhost:3000/api/admin/disable-user/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ disable })
      });
      const result = await res.json();
      if (result.message) {
        alert(result.message);
      } else if (result.error) {
        alert(result.error);
      } else {
        alert('User status updated.');
      }
      fetchUsers();
    } catch (err) {
      alert('Network error or server unavailable.');
      console.error(`❌ Error updating user status:`, err);
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">🛡️ Admin Dashboard</h1>

      {/* Driver Verifications Section */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold mb-4">📄 Driver Verifications</h2>
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Driver ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">License</th>
              <th className="p-2">Aadhaar</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map(doc => (
              <tr key={doc.document_id}>
                <td className="p-2">{doc.user_id}</td>
                <td className="p-2">{doc.name}</td>
                <td className="p-2">
                  <a href={doc.license_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
                </td>
                <td className="p-2">
                  <a href={doc.aadhar_url} target="_blank" rel="noreferrer" className="text-blue-600 underline">View</a>
                </td>
                <td className="p-2">{doc.status}</td>
                <td className="p-2 space-x-2">
                  {doc.status === 'Pending' && (
                    <>
                      <button
                        onClick={() => handleDriverAction(doc.document_id, 'Approved')}
                        className="bg-green-500 text-white px-2 py-1 rounded"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDriverAction(doc.document_id, 'Rejected')}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* All Users Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">👥 All Users</h2>
        <table className="w-full text-left border">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Email</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Role</th>
              <th className="p-2">Status</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td className="p-2">{user.id}</td>
                <td className="p-2">{user.name}</td>
                <td className="p-2">{user.email}</td>
                <td className="p-2">{user.phoneno}</td>
                <td className="p-2">{user.usertype}</td>
                <td className="p-2">{user.is_login_disabled ? 'Blocked' : 'Active'}</td>
                <td className="p-2 space-x-2">
                  {user.is_login_disabled ? (
                    <button
                      onClick={() => handleUserAction(user.id, false)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Unblock
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUserAction(user.id, true)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Block
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default AdminPage;
