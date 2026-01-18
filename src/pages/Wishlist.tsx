import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/currency';
import Button from '../components/common/Button';
import './Wishlist.css';
import { Product } from '../types/product.types';

const Wishlist: React.FC = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addToCart(product);
  };

  const handleAddAllToCart = () => {
    wishlist.forEach(product => {
      if (!isInCart(product.id)) {
        addToCart(product);
      }
    });
  };

  if (wishlist.length === 0) {
    return (
      <div className="empty-wishlist">
        <div className="empty-wishlist-icon">💝</div>
        <h2>Your wishlist is empty</h2>
        <p>Save items you love for later</p>
        <Link to="/shop">
          <Button size="large">Explore Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div>
          <h1>My Wishlist</h1>
          <p>{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved</p>
        </div>
        <div className="wishlist-actions">
          <Button variant="outline" onClick={handleAddAllToCart}>
            Add All to Cart
          </Button>
          <Button variant="danger" onClick={clearWishlist}>
            Clear Wishlist
          </Button>
        </div>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((product) => (
          <div key={product.id} className="wishlist-item">
            <div className="wishlist-item-image">
              <img src={product.image} alt={product.title} />
            </div>
            
            <div className="wishlist-item-info">
              <h3>{product.title}</h3>
              <p className="wishlist-category">{product.category}</p>
              <div className="wishlist-rating">
                ⭐ {product.rating.rate.toFixed(1)} ({product.rating.count} reviews)
              </div>
              <p className="wishlist-price">{formatCurrency(product.price)}</p>
            </div>

            <div className="wishlist-item-actions">
              {isInCart(product.id) ? (
                <div className="in-cart-badge">✓ In Cart</div>
              ) : (
                <Button 
                  fullWidth 
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </Button>
              )}
              <Button 
                fullWidth 
                variant="outline"
                onClick={() => removeFromWishlist(product.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;