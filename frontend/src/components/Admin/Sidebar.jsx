import { NavLink } from 'react-router-dom';
import {
  FaTachometerAlt, FaUsers, FaTruck, FaMoneyBill, FaClipboardList, FaCog, FaSignOutAlt
} from 'react-icons/fa';

const menuItems = [
  { label: 'Dashboard', icon: <FaTachometerAlt />, to: '/admin/dashboard' },
  { label: 'Users', icon: <FaUsers />, to: '/admin/users' },
  { label: 'Drivers', icon: <FaTruck />, to: '/admin/drivers' },
  { label: 'Assign Delivery', icon: <FaClipboardList />, to: '/admin/assign' },
  { label: 'Payments', icon: <FaMoneyBill />, to: '/admin/payments' },
  { label: 'Bookings', icon: <FaClipboardList />, to: '/admin/bookings' },
  { label: 'Settings', icon: <FaCog />, to: '/admin/settings' },
];

const Sidebar = ({ visible }) => (
  <aside
    className={`
      fixed left-0 top-0 h-full z-40 flex flex-col
      bg-gradient-to-b from-blue-700 to-blue-900 shadow-lg
      w-64 transition-transform duration-300
      ${visible ? 'translate-x-0' : '-translate-x-full'}
    `}
    style={{ pointerEvents: visible ? 'auto' : 'none' }}
  >
    <div className="p-6 font-bold text-2xl text-white tracking-wider mb-4">
      Admin Panel
    </div>
    <nav className="flex-1">
      <ul className="flex flex-col gap-2">
        {menuItems.map(item => (
          <li key={item.label}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 px-6 py-3 rounded-lg transition-colors duration-200
                ${isActive ? 'bg-white bg-opacity-20 text-white shadow' : 'text-blue-100 hover:bg-blue-800 hover:text-white'}`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
    <div className="p-6 mt-auto">
      <button className="flex items-center gap-2 text-blue-100 hover:text-red-400 transition-colors">
        <FaSignOutAlt className="text-lg" />
        <span>Logout</span>
      </button>
    </div>
  </aside>
);

export default Sidebar;
