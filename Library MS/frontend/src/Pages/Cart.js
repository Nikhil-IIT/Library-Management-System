import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('http://localhost:3001/getcartdata');
      if (response.status !== 200) {
        throw new Error('Failed to fetch cart items');
      }
      const data = await response.json();
      setCartItems(data);
      console.log(cartItems);
    } catch (error) {
      console.error('Error fetching cart items:', error.message);
    }
  };
  

  const handleRemoveItem = (itemId) => {

  };

  return (
    <div className="container">
      <h1>Cart</h1>
      <table className="text-dark table table-striped table-bordered">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.c_id}>
              <td><img src={item.c_image} alt={item.c_name} /></td>
              <td>{item.c_name}</td>
              <td>${item.c_price}</td>
              <td>{item.c_quantity}</td>
              <td>
                <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
