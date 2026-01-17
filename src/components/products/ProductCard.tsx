import React from 'react';
import { Product } from '../../types/product.types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatCurrency } from '../../utils/currency';
import Button from '../common/Button';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inCart = isInCart(product.id);
  const inWishlist = isInWishlist(product.id);
  const quantity = getItemQuantity(product.id);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.title} 
          className="product-image"
        />
        <button 
          className={`wishlist-btn ${inWishlist ? 'active' : ''}`}
          onClick={handleWishlistToggle}
          aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {inWishlist ? '❤️' : '🤍'}
        </button>
        <div className="product-rating">
          ⭐ {product.rating.rate.toFixed(1)}
          <span className="rating-count">({product.rating.count})</span>
        </div>
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-category">{product.category}</p>
        <p className="product-description">
          {product.description.length > 100 
            ? `${product.description.substring(0, 100)}...` 
            : product.description}
        </p>
        
        <div className="product-footer">
          <span className="product-price">{formatCurrency(product.price)}</span>
          
          {inCart ? (
            <div className="in-cart-indicator">
              <span className="cart-check">✓</span>
              In Cart ({quantity})
            </div>
          ) : (
            <Button 
              onClick={() => addToCart(product)}
              size="small"
            >
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;