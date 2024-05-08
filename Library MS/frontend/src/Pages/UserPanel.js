import React from 'react';
import { Link } from 'react-router-dom';

const UserPanel = () => {
  return (
    <div className="user-panel">
      <h1>User Panel</h1>
      <div className="buttons">
        <Link to="/cart"><button>Cart</button></Link>&nbsp;&nbsp;
        <Link to="/guest_list"><button>Guest List</button></Link>&nbsp;&nbsp;
        <Link to="/order_status"><button>Order Status</button></Link>&nbsp;&nbsp;
        <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/"); }}>Logout</button>
      </div>
      <div className="dropdown">
        <select>
          <option value="catering">Catering</option>
          <option value="florist">Florist</option>
          <option value="decoration">Decoration</option>
          <option value="lighting">Lighting</option>
        </select>
      </div>
    </div>
  );
};

export default UserPanel;
