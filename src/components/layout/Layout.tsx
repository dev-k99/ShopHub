import React, { type ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import Toast from '../common/Toast';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">{children}</main>
      <Footer />
      <Toast />
    </div>
  );
};

export default Layout;