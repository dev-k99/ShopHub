import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import './EmptyCart.css';

const EmptyCart: React.FC = () => {
  return (
    <div className="empty-cart">
      <div className="empty-cart-icon">🛒</div>
      <h2>Your cart is empty</h2>
      <p>Looks like you haven't added anything to your cart yet.</p>
      <Link to="/shop">
        <Button size="large">Start Shopping</Button>
      </Link>
    </div>
  );
};

export default EmptyCart;