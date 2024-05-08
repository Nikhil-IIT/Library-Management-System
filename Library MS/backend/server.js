const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');


const app = express();
const JWT_SECRET = 'holyshit';


app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});


app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/nextProductId', (req, res) => {
    db.get('SELECT MAX(p_id) AS max_id FROM products', (err, row) => {
      if (err) {
        console.error('Error fetching next product ID:', err);
        return res.status(500).json({ error: 'Internal server error' });
      }
      const nextId = row.max_id ? row.max_id + 1 : 1; 
      res.json({ nextProductId: nextId });
    });
  });
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
  
      if (!row) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
  
      const passwordMatch = await bcrypt.compare(password, row.password);
      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Incorrect password' });
      }
  
      let isAdmin = false;
      if (email === 'admin@gmail.com') {
        isAdmin = true;
      }
  
      const token = jwt.sign({ email, isAdmin }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, token, isAdmin });
    });
  });


  app.get('/products/:productId', async (req, res) => {
    const productId = req.params.productId;
    if (productId === '0') {
      res.status(200).send('Special logic for productId 0');
      return;
    }
  
    try {
      const product = await getProduct(productId);
      console.log(product);
      if (!product) {
        res.status(404).send('Product not found');
        return;
      }
      console.log("product goes");
      res.json(product);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Error fetching product');
    }
  });




  app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
  
    
    db.get("SELECT * FROM users WHERE email = ?", [email], async (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
  
      if (row) {
        return res.status(400).json({ success: false, message: 'Email is already registered' });
      }
  
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], function(err) {
          if (err) {
            return res.status(500).json({ success: false, message: 'Failed to register user' });
          }
  
          const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
          res.status(201).json({ success: true, message: 'User registered successfully', token });
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Failed to register user' });
      }
    });
  });

  app.post('/vendor_login', (req, res) => {
    const { email, password } = req.body;
  
    db.get("SELECT * FROM vendors WHERE v_email = ?", [email], async (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
  
      if (!row) {
        return res.status(401).json({ success: false, message: 'User not found' });
      }
  
      const passwordMatch = await bcrypt.compare(password, row.v_password);
      if (!passwordMatch) {
        return res.status(401).json({ success: false, message: 'Incorrect password' });
      }
  
      let isAdmin = false;
      if (email === 'admin@gmail.com') {
        isAdmin = true;
      }
  
      const token = jwt.sign({ email, isAdmin }, JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, token, isAdmin });
    });
  });


  app.post('/vendor_register', (req, res) => {
    const { username, email, password } = req.body;
  
    
    db.get("SELECT * FROM vendors WHERE v_email = ?", [email], async (err, row) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Internal server error' });
      }
  
      if (row) {
        return res.status(400).json({ success: false, message: 'Email is already registered' });
      }
  
      try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.run('INSERT INTO vendors (v_name, v_email, v_password) VALUES (?, ?, ?)', [username, email, hashedPassword], function(err) {
          if (err) {
            return res.status(500).json({ success: false, message: 'Failed to register user' });
          }
  
          const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });
          res.status(201).json({ success: true, message: 'User registered successfully', token });
        });
      } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, message: 'Failed to register user' });
      }
    });
  });



  function getProducts() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM products', (err, rows) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(rows);
        }
      });
    });
  }
  
app.get('/products', async (req, res) => {
    try {
      console.log("here");
      const products = await getProducts();
      console.log("here");
      res.json(products);
    } 
    catch (err) {
      console.error(err.message);
      res.status(500).send('Error fetching products');
    }
  });


  app.get('/getcartdata', (req, res) => {
    const token = req.headers['auth-token']; 
    console.log("comes here...");
    
    // jwt.verify(token, 'holyshit', (err, decoded) => {
    //   if (err) {
    //     console.error('Error decoding token:', err);
    //     return res.status(401).json({ error: 'Unauthorized' });
    //   }
      
      const u_id ="yash@gmail.com" ;
      
    
      db.all('SELECT * FROM cart WHERE email = ?', [u_id], (err, rows) => {
        if (err) {
          console.error('Error fetching cart data:', err);
          return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('Cart data retrieved');
        res.json(rows);
      });
    });


app.delete('/delete_product/:p_id', async (req, res) => {
        const id = req.params.p_id;
        console.log('Delete product', id);
        try {
          await db.run('DELETE FROM products WHERE p_id = ?', [id]);
          res.json({ message: 'Product deleted successfully' });
        } catch (err) {
          console.error(err.message);
          res.status(500).send('Error deleting user');
        }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
