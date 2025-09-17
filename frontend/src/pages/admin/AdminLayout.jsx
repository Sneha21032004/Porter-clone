import React, { useState } from 'react';
import Sidebar from '../../components/Admin/Sidebar';

const AdminLayout = ({ children }) => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  return (
    <div
      className="flex"
      onMouseEnter={() => setSidebarVisible(true)}
      onMouseLeave={() => setSidebarVisible(false)}
    >
      {/* Invisible hover area to trigger sidebar */}
      <div className="fixed left-0 top-0 h-full w-4 z-50" />
      <Sidebar visible={sidebarVisible} />
      <main className={`transition-all duration-300 p-6 min-h-screen bg-gray-100 w-full ${sidebarVisible ? 'ml-64' : ''}`}>
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
