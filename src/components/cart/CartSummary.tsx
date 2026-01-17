import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/currency';
import Button from '../common/Button';
import './CartSummary.css';

const CartSummary: React.FC = () => {
  const { cart, clearCart } = useCart();
  
  const shipping = cart.totalPrice > 100 ? 0 : 10;
  const tax = cart.totalPrice * 0.08; // 8% tax
  const total = cart.totalPrice + shipping + tax;

  const handleCheckout = () => {
    alert('Checkout functionality coming soon!');
  };

  return (
    <div className="cart-summary">
      <h2 className="summary-title">Order Summary</h2>
      
      <div className="summary-row">
        <span>Subtotal ({cart.totalItems} items)</span>
        <span>{formatCurrency(cart.totalPrice)}</span>
      </div>

      <div className="summary-row">
        <span>Shipping</span>
        <span className={shipping === 0 ? 'free-shipping' : ''}>
          {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
        </span>
      </div>

      <div className="summary-row">
        <span>Tax (8%)</span>
        <span>{formatCurrency(tax)}</span>
      </div>

      <div className="summary-divider"></div>

      <div className="summary-row summary-total">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>

      {cart.totalPrice < 100 && (
        <div className="shipping-notice">
          💡 Add {formatCurrency(100 - cart.totalPrice)} more for free shipping!
        </div>
      )}

      <Button 
        fullWidth 
        onClick={handleCheckout}
        disabled={cart.items.length === 0}
      >
        Proceed to Checkout
      </Button>

      <Button 
        fullWidth 
        variant="outline" 
        onClick={clearCart}
        disabled={cart.items.length === 0}
      >
        Clear Cart
      </Button>
    </div>
  );
};

export default CartSummary;