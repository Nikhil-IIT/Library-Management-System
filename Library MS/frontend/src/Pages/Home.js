import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MyNavbar from '../Components/Navbar/Navbar';


function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('/')
      .then(response => {
        setMessage(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <MyNavbar />
    </div>
  );
}

export default App;