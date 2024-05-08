import React from 'react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.replace("/");
  };

  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="buttons">
        <Link to="/manage_users"><button>Manage Users</button></Link>&nbsp;&nbsp;
        <Link to="/manage_vendors"><button>Manage Vendors</button></Link>&nbsp;&nbsp;
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default AdminPanel;
