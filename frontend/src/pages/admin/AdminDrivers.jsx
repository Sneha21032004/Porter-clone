// File: src/pages/admin/AdminDrivers.jsx

import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaCheck, FaTimes, FaEye } from 'react-icons/fa';
import AdminLayout from './AdminLayout';

const AdminDrivers = () => {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:3000/api/admin/drivers', {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => setDrivers(res.data));
  }, [token]);

  const updateStatus = async (document_id, status) => {
    try {
      await axios.patch(`http://localhost:3000/api/admin/driver-status/${document_id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDrivers(drivers.map(d => d.document_id === document_id ? { ...d, status } : d));
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const openDetails = (driver) => {
    setSelectedDriver(driver);
    setShowDetails(true);
  };

  const closeDetails = () => {
    setShowDetails(false);
    setSelectedDriver(null);
  };

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-4">Driver Verification</h2>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-gray-500 text-sm">Total Requests</div>
          <div className="text-2xl font-bold">{drivers.length}</div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-gray-500 text-sm">Pending</div>
          <div className="text-2xl font-bold">
            {drivers.filter(d => d.status === 'Pending').length}
          </div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-gray-500 text-sm">Approved</div>
          <div className="text-2xl font-bold">
            {drivers.filter(d => d.status === 'Approved').length}
          </div>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <div className="text-gray-500 text-sm">Rejected</div>
          <div className="text-2xl font-bold">
            {drivers.filter(d => d.status === 'Rejected').length}
          </div>
        </div>
      </div>

      {/* Driver Requests Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow rounded">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Driver Name</th>
              <th className="px-6 py-3 text-left">Contact</th>
              <th className="px-6 py-3 text-center">Vehicle</th>
              <th className="px-6 py-3 text-center">Experience</th>
              <th className="px-6 py-3 text-center">Documents</th>
              <th className="px-6 py-3 text-center">Status</th>
              <th className="px-6 py-3 text-center">Request Date</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map(driver => (
              <tr key={driver.document_id} className="border-t">
                <td className="px-6 py-4">#{driver.document_id}</td>
                <td className="px-6 py-4">{driver.name}</td>
                <td className="px-6 py-4">
                  {driver.phone}<br />
                  <span className="text-xs text-gray-500">{driver.email}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold">{driver.vehicle}</span>
                </td>
                <td className="px-6 py-4 text-center">{driver.experience} years</td>
                <td className="px-6 py-4 text-center space-x-2">
                  <a
                    href={driver.license_url}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                  >License</a>
                  <span>|</span>
                  <a
                    href={driver.id_url}
                    className="text-blue-600 underline"
                    target="_blank"
                    rel="noreferrer"
                  >ID Card</a>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    driver.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : driver.status === 'Approved'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {driver.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">{driver.request_date}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex gap-2 justify-center">
                    {driver.status === 'Pending' && (
                      <>
                        <button
                          className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1"
                          onClick={() => updateStatus(driver.document_id, 'Approved')}
                        >
                          <FaCheck /> Approve
                        </button>
                        <button
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded flex items-center gap-1"
                          onClick={() => updateStatus(driver.document_id, 'Rejected')}
                        >
                          <FaTimes /> Reject
                        </button>
                      </>
                    )}
                    <button
                      className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded flex items-center gap-1"
                      onClick={() => openDetails(driver)}
                    >
                      <FaEye /> Details
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {drivers.length === 0 && (
              <tr>
                <td colSpan={9} className="px-6 py-8 text-center text-gray-400">
                  No driver requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Details Modal */}
      {showDetails && selectedDriver && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
              onClick={closeDetails}
            >
              &times;
            </button>
            <h3 className="text-xl font-bold mb-4">Driver Details</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <div className="text-xs text-gray-500">Name</div>
                <div className="font-semibold">{selectedDriver.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Email</div>
                <div>{selectedDriver.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Phone</div>
                <div>{selectedDriver.phone}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Vehicle</div>
                <div>{selectedDriver.vehicle}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Experience</div>
                <div>{selectedDriver.experience} years</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Status</div>
                <div>{selectedDriver.status}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Request Date</div>
                <div>{selectedDriver.request_date}</div>
              </div>
            </div>
            <div className="mb-2">
              <div className="text-xs text-gray-500 mb-1">Documents</div>
              <div className="flex gap-3">
                <a
                  href={selectedDriver.license_url}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >View License</a>
                <a
                  href={selectedDriver.id_url}
                  className="text-blue-600 underline"
                  target="_blank"
                  rel="noreferrer"
                >View ID Card</a>
              </div>
            </div>
            {/* Optionally: add admin notes, rejection reason, etc. */}
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDrivers;
