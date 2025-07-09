import React, { useEffect, useState } from 'react';

const AdminPage = () => {
  const [drivers, setDrivers] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("drivers");
  const [driverFilter, setDriverFilter] = useState("All");

  const token = localStorage.getItem('token');

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
      alert(result.message || result.error || 'Action completed.');
      fetchDrivers();
    } catch (err) {
      alert('Network error or server unavailable.');
      console.error(err);
    }
  };

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
      alert(result.message || result.error || 'User status updated.');
      fetchUsers();
    } catch (err) {
      alert('Network error or server unavailable.');
      console.error(`❌ Error updating user status:`, err);
    }
  };

  useEffect(() => {
    fetchDrivers();
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-blue-800">🛡️ Admin Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white shadow-md p-4 rounded">
          <p className="text-gray-500 text-sm">Total Drivers</p>
          <h3 className="text-2xl font-bold">{drivers.length}</h3>
        </div>
        <div className="bg-white shadow-md p-4 rounded">
          <p className="text-gray-500 text-sm">Verified Drivers</p>
          <h3 className="text-2xl font-bold">{drivers.filter(d => d.status === "Approved").length}</h3>
        </div>
        <div className="bg-white shadow-md p-4 rounded">
          <p className="text-gray-500 text-sm">Pending Verifications</p>
          <h3 className="text-2xl font-bold">{drivers.filter(d => d.status === "Pending").length}</h3>
        </div>
        <div className="bg-white shadow-md p-4 rounded">
          <p className="text-gray-500 text-sm">Active Users</p>
          <h3 className="text-2xl font-bold">{users.filter(u => !u.is_login_disabled).length}</h3>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        <button onClick={() => setActiveTab("drivers")} className={`px-4 py-2 rounded ${activeTab === "drivers" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
          Driver Verifications
        </button>
        <button onClick={() => setActiveTab("users")} className={`px-4 py-2 rounded ${activeTab === "users" ? "bg-blue-600 text-white" : "bg-gray-200"}`}>
          All Users
        </button>
      </div>

      {/* Driver Verifications */}
      {activeTab === "drivers" && (
        <>
          {/* Filter Buttons */}
          <div className="mb-4 flex gap-2">
            {["All", "Pending", "Approved", "Rejected"].map(status => (
              <button
                key={status}
                onClick={() => setDriverFilter(status)}
                className={`px-3 py-1 rounded border ${
                  driverFilter === status
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="grid gap-4">
            {drivers
              .filter(doc => driverFilter === "All" || doc.status === driverFilter)
              .map(doc => (
                <div key={doc.document_id} className="bg-white rounded shadow p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{doc.name} <span className="text-gray-500 text-sm"> (Driver ID: {doc.user_id})</span></h3>
                    <p className="text-sm text-gray-600">License: <a className="text-blue-600 underline" href={doc.license_url} target="_blank">View</a></p>
                    <p className="text-sm text-gray-600">Aadhaar: <a className="text-blue-600 underline" href={doc.aadhar_url} target="_blank">View</a></p>
                  </div>
                  <div className="flex gap-2">
                    {doc.status === "Pending" ? (
                      <>
                        <button onClick={() => handleDriverAction(doc.document_id, "Approved")} className="bg-green-500 text-white px-3 py-1 rounded">Approve</button>
                        <button onClick={() => handleDriverAction(doc.document_id, "Rejected")} className="bg-red-500 text-white px-3 py-1 rounded">Reject</button>
                      </>
                    ) : (
                      <span className={`px-3 py-1 rounded text-sm ${doc.status === "Approved" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {doc.status}
                      </span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </>
      )}

      {/* All Users */}
      {activeTab === "users" && (
        <div className="grid gap-4">
          {users.map(user => (
            <div key={user.id} className="bg-white rounded shadow p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{user.name} <span className="text-gray-500 text-sm"> (ID: {user.id})</span></h3>
                <p className="text-sm text-gray-600">{user.email} · {user.phoneno}</p>
                <p className="text-sm text-gray-600">Role: {user.usertype}</p>
              </div>
              <div className="flex gap-2 items-center">
                <span className={`px-2 py-1 rounded text-xs ${user.is_login_disabled ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {user.is_login_disabled ? "Blocked" : "Active"}
                </span>
                <button
                  onClick={() => handleUserAction(user.id, !user.is_login_disabled)}
                  className={`${user.is_login_disabled ? "bg-green-500" : "bg-red-500"} text-white px-3 py-1 rounded`}
                >
                  {user.is_login_disabled ? "Unblock" : "Block"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminPage;
