import React from 'react';
import { Link } from 'react-router-dom';

const VendorPanel = () => {
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    window.location.replace("/");
  };

  return (
    <div className="vendor-panel">
      <h1>Vendor Panel</h1>
      <div className="buttons">
        <Link to="/manage_items"><button>Items</button></Link>&nbsp;&nbsp;
        <Link to="/transactions"><button>Transactions</button></Link>&nbsp;&nbsp;
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default VendorPanel;
