import { useEffect, useState } from 'react';
import AdminLayout from './AdminLayout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await axios.get('/api/admin/dashboard-metrics', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Failed to fetch metrics', err);
      } finally {
        setLoading(false);
      }
    };

    const fetchMonthlyStats = async () => {
      try {
        const res = await axios.get('/api/admin/monthly-stats', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMonthlyStats(res.data);
      } catch (err) {
        console.error('Failed to fetch monthly stats', err);
      }
    };

    fetchMetrics();
    fetchMonthlyStats();
  }, [token]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!stats) return <div className="p-4">No stats available</div>;

  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded shadow p-5 text-center">
          <div className="text-gray-500 text-sm">Total Users</div>
          <div className="text-2xl font-bold">{stats.users}</div>
        </div>
        <div className="bg-white rounded shadow p-5 text-center">
          <div className="text-gray-500 text-sm">Total Drivers</div>
          <div className="text-2xl font-bold">{stats.drivers}</div>
        </div>
        <div className="bg-white rounded shadow p-5 text-center">
          <div className="text-gray-500 text-sm">Pending Verifications</div>
          <div className="text-2xl font-bold">{stats.pendingVerifications}</div>
        </div>
        <div className="bg-white rounded shadow p-5 text-center">
          <div className="text-gray-500 text-sm">Total Revenue</div>
          <div className="text-2xl font-bold">₹{parseFloat(stats.revenue).toFixed(2)}</div>
        </div>
      </div>

      {/* Monthly Revenue & Bookings Chart */}
      <div className="bg-white p-6 rounded shadow mb-8">
        <h3 className="text-lg font-semibold mb-4">Monthly Revenue & Bookings</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyStats} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#8884d8" name="Revenue ₹" />
            <Bar dataKey="bookings" fill="#82ca9d" name="Bookings" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          onClick={() => navigate('/admin/drivers')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded shadow"
        >
          View Drivers
        </button>
        <button
          onClick={() => navigate('/admin/assign')}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded shadow"
        >
          Assign Deliveries
        </button>
        <button
          onClick={() => navigate('/admin/payments')}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded shadow"
        >
          View Payments
        </button>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
