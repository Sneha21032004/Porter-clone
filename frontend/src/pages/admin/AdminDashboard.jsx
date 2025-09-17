import AdminLayout from './AdminLayout';

const AdminDashboard = () => (
  <AdminLayout>
    <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
    {/* Stats Cards */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded shadow p-4 text-center">
        <div className="text-gray-500 text-sm">Total Users</div>
        <div className="text-2xl font-bold">2,847</div>
      </div>
      <div className="bg-white rounded shadow p-4 text-center">
        <div className="text-gray-500 text-sm">Active Drivers</div>
        <div className="text-2xl font-bold">486</div>
      </div>
      <div className="bg-white rounded shadow p-4 text-center">
        <div className="text-gray-500 text-sm">Total Bookings</div>
        <div className="text-2xl font-bold">12,459</div>
      </div>
      <div className="bg-white rounded shadow p-4 text-center">
        <div className="text-gray-500 text-sm">Revenue</div>
        <div className="text-2xl font-bold">€58,420</div>
      </div>
    </div>
    {/* Recent Activity */}
    <div className="bg-white rounded shadow p-4 mb-6">
      <h3 className="font-semibold text-lg mb-2">Recent Activity</h3>
      <ul className="space-y-2">
        <li className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-blue-500"></span>
          New driver registration by Marco Rossi <span className="ml-auto text-gray-400">2 min ago</span>
        </li>
        <li className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          Booking completed by Sofia Bianchi <span className="ml-auto text-gray-400">5 min ago</span>
        </li>
        <li className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          Payment processed by Luca Ferrari <span className="ml-auto text-gray-400">8 min ago</span>
        </li>
        <li className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
          User verification pending by Giulia Romano <span className="ml-auto text-gray-400">12 min ago</span>
        </li>
        <li className="flex items-center gap-2 text-sm">
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
          New booking created by Alessandro Costa <span className="ml-auto text-gray-400">15 min ago</span>
        </li>
      </ul>
    </div>
    {/* Quick Actions */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded shadow">
        Verify Drivers
      </button>
      <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded shadow">
        Manage Users
      </button>
      <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded shadow">
        Payment Reports
      </button>
    </div>
  </AdminLayout>
);

export default AdminDashboard;
