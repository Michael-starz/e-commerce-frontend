import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductPage from './pages/newProductPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import OrderHistory from './pages/OrderHistory';
import UserForm from './components/UserForm';
import { useState } from 'react';
import Navbar from './components/Navbar';

function App() {
  const [showForm, setShowForm] = useState(false);
  return (
    <Router>
      <Navbar setShowForm={setShowForm} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {/* <Route path="/products/:id" element={<ProductPage />} /> */}
        {/* <Route path="/products" element={<ProductGrid />} /> */}
        <Route path="/products" element={<ProductPage />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>
      <UserForm showForm={showForm} setShowForm={setShowForm} />
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}

export default App;