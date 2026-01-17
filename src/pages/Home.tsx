import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand-gradient">ShopHub</span>
          </h1>
          <p className="hero-subtitle">
            Your premium destination for quality products at unbeatable prices
          </p>
          <div className="hero-cta">
            <Link to="/shop">
              <Button size="large">Explore Products</Button>
            </Link>
            <Link to="/cart">
              <Button variant="outline" size="large">View Cart</Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <div className="feature-icon">🚚</div>
          <h3>Free Shipping</h3>
          <p>On orders over $100</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💎</div>
          <h3>Premium Quality</h3>
          <p>Curated products</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🔒</div>
          <h3>Secure Payment</h3>
          <p>100% protected</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Fast Delivery</h3>
          <p>Express shipping available</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start Shopping?</h2>
        <p>Browse our curated collection of premium products</p>
        <Link to="/shop">
          <Button size="large">Shop Now</Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;