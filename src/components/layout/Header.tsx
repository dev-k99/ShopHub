import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './Header.css';

const Header: React.FC = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          🛒 ShopHub
        </Link>

        <nav className="nav">
          <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/shop" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Shop
          </NavLink>
          <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'nav-link wishlist-link active' : 'nav-link wishlist-link'}>
            <span className="wishlist-icon">💝</span>
            Wishlist
            {wishlist.length > 0 && (
              <span className="wishlist-badge">{wishlist.length}</span>
            )}
          </NavLink>
          <NavLink to="/cart" className={({ isActive }) => isActive ? 'nav-link cart-link active' : 'nav-link cart-link'}>
            <span className="cart-icon">🛒</span>
            Cart
            {cart.totalItems > 0 && (
              <span className="cart-badge">{cart.totalItems}</span>
            )}
          </NavLink>
          <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link admin-link active' : 'nav-link admin-link'}>
            <span className="admin-icon">👨‍💼</span>
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;