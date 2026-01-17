import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';
import { WishlistProvider } from './context/WishlistContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Wishlist from './pages/Wishlist';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

const App: React.FC = () => {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Layout>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
};

export default App;