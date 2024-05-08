import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function Items() {
  const [items, setItems] = useState([]);


  useEffect(() => {
    getItems();
  }, []);


  useEffect(() => {
    console.log(items); 
  }, [items]);

  const changeURL = (value) => {
    window.location.href = `/edit/${value}`;
  };

  const removeItem = (p_id) => {
    const path = `http://localhost:3001/delete_product/${p_id}`;
    axios
      .delete(path)
      .then(() => {
        getItems();
      })
      .catch((error) => {
        getItems();
        console.error('ERROR:', error.message);
      });
  };
  
    const getItems = async () => {
      try {
        const response = await axios.get('http://localhost:3001/products');
        console.log('Fetched Products:', response.data);
        setItems(response.data);
        console.log(items);
      } catch (err) {
        console.error(err.message);
      }
    };

    console.log('Items:', items);
    
  return (
    <div className="container">
        <p></p>
      <button onClick={() => changeURL(0)} className="btn btn-success">
        Add Product
      </button>
      <br />
      <hr />
      <table className="text-dark table table-striped table-bordered"> 
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Product Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.p_id}</td>
              <td>{item.p_name}</td>
              <td>{item.p_image}</td>
              <td>{item.p_price}</td>
              <td>
                <div className="d-flex">
                  <button onClick={() => changeURL(item.p_id)} className="btn btn-primary">Edit</button>
                  &nbsp;
                  <button onClick={() => removeItem(item.p_id)} className="btn btn-danger">Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Items;
