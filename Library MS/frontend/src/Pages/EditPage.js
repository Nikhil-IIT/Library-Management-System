import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CSS/Editpage.css';

function EditForm() {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    id:'',
    name: '',
    image: '',
    price: '',
  });

  const { productId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
    getCategory();
  }, []);


  const getData = () => {
    console.log(productId);
    const path = `http://localhost:8001/products/${productId}`;
    axios
      .get(path)
      .then((res) => {
        const productData = res.data;
      
        if (productData) {
          console.log(productData);
          const updatedProduct = {
            id: productData.p_id,
            name: productData.p_name,
            image: productData.p_image,
            price: productData.p_price,
          };
          setProduct(updatedProduct);
          console.log(updatedProduct);
        } else {
          console.error('ERROR: Product data is empty.');
        }
      })
      .catch((error) => {
        console.log("error yaha haa")
        console.error('ERROR:', error.message);
      });
  };
  

  const getCategory = () => {
    const path = 'http://localhost:8001/categories';
    axios
      .get(path)
      .then((res) => {
        setCategories(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error('ERROR:', error.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product.id);
    if (product.id === '0' || product.id === "" || product.id === undefined) {
      const res = await axios.get("http://localhost:8001/nextProductId");
      const nextProductId = res.data.nextProductId;
      console.log("wgrggwg");
      console.log(nextProductId);
      try {
        const formData = new FormData();
        formData.append('id', nextProductId);
        formData.append('name', product.name);
        formData.append('price', product.price);
        formData.append('image', product.image);
        
        for (const [key, value] of formData.entries()) {
          console.log("Key:", value);
        }
        console.log("nick cick ");
        const response = await axios.post(`http://localhost:8001/update/${productId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
    
        console.log('Saving successful:', response.data.message);
        navigate('/admin');
      } catch (error) {
        console.error('Saving failed:', error.message);
      }
    }
    else{
      try {
        const formData = new FormData();
        formData.append('id', product.id);
        formData.append('name', product.name);
        formData.append('stock', product.stock);
        formData.append('description', product.description);
        formData.append('newprice', product.newprice);
        formData.append('oldprice', product.oldprice);
        formData.append('category', product.category);
        formData.append('image', product.image);
        
        for (const [key, value] of formData.entries()) {
          console.log("Key:", value);
        }
        console.log("nick cick ");
        const response = await axios.post(`http://localhost:8001/update/${productId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
    
        console.log('Saving successful:', response.data.message);
        navigate('/admin');
      } catch (error) {
        console.error('Saving failed:', error.message);
      }
    }
  };


  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const response = await axios.post(`http://localhost:8001/update/${productId}`, product);
  //     console.log('Saving successful:', response.data.message);
  //     // initForm();
  //     navigate('/admin');
  //   } catch (error) {
  //     console.error('Saving failed:', error.message);
  //   }
  // };

  return (
    <div className='edit-form'>
      <p></p>
      <h2 style={{textAlign: 'center'}}>Edit Product Details Here!!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input className='e'
            type="text"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </label>
        <br />
        <label>
          Price:
          <input className='b'
            type="number"
            value={product.newprice}
            onChange={(e) => setProduct({ ...product, newprice: e.target.value })}
            required
          />
        </label>
        <br />
        <p></p>
<label>Upload Image:
        <input className='d'
        type="file" 
        accept="image/*"
        onChange={(e) => setProduct({ ...product, image: e.target.files[0] })}
        />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditForm;
