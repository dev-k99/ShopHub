import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p>&copy; {new Date().getFullYear()} ShopHub. Built with React & TypeScript.</p>
        <p className="footer-subtitle">Premium Shopping Experience</p>
      </div>
    </footer>
  );
};

export default Footer;