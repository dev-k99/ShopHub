import React from 'react';
import { CartItem as CartItemType } from '../../types/cart.types';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/currency';
import Button from '../common/Button';
import './CartItem.css';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(product.id, newQuantity);
    }
  };

  return (
    <div className="cart-item">
      <img 
        src={product.image} 
        alt={product.title} 
        className="cart-item-image"
      />
      
      <div className="cart-item-info">
        <h3 className="cart-item-title">{product.title}</h3>
        <p className="cart-item-category">{product.category}</p>
        <p className="cart-item-price">{formatCurrency(product.price)}</p>
      </div>

      <div className="cart-item-actions">
        <div className="quantity-controls">
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity - 1)}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="quantity-display">{quantity}</span>
          <button 
            className="quantity-btn"
            onClick={() => handleQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="cart-item-total">
          <span className="total-label">Total:</span>
          <span className="total-price">
            {formatCurrency(product.price * quantity)}
          </span>
        </div>

        <Button 
          variant="danger" 
          size="small"
          onClick={() => removeFromCart(product.id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;