import './App.css';
import Home from './Pages/Home';
import LoginSignup from './Pages/LoginSignup';
import UserPanel from './Pages/UserPanel';
import AdminPanel from './Pages/AdminPanel';
import VendorPanel from './Pages/VendorPanel';
import EditItems from './Pages/EditItems';
import Edit from './Pages/EditPage'; 
import Cart from './Pages/Cart';
import VendorLogin from './Pages/VendorLogin';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginSignup />} />
          <Route path="/user_panel" element={<UserPanel />} />
          <Route path="/admin_panel" element={<AdminPanel />} />
          <Route path="/vendor_panel" element={<VendorPanel />} />
          <Route path="/manage_items" element={<EditItems />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/vendor_login" element={<VendorLogin />} />
          <Route path="/edit/:productId" element={<Edit/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;