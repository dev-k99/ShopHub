import React, { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { productsApi } from '../api/products';
import { Product } from '../types/product.types';
import { formatCurrency, formatNumber } from '../utils/currency';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './AdminDashboard.css';

interface SalesData {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  wishlistItems: number;
  avgOrderValue: number;
  topCategories: { category: string; count: number }[];
}

const AdminDashboard: React.FC = () => {
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [salesData, setSalesData] = useState<SalesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, [cart, wishlist]);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      const productsData = await productsApi.getAll();
      setProducts(productsData);

      // Calculate sales data
      const totalRevenue = cart.totalPrice;
      const totalOrders = Math.floor(Math.random() * 150) + 50; // Mock data
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Calculate category distribution
      const categoryMap = new Map<string, number>();
      productsData.forEach(product => {
        const count = categoryMap.get(product.category) || 0;
        categoryMap.set(product.category, count + 1);
      });

      const topCategories = Array.from(categoryMap.entries())
        .map(([category, count]) => ({ category, count }))
        .sort((a, b) => b.count - a.count);

      setSalesData({
        totalRevenue,
        totalOrders,
        totalProducts: productsData.length,
        wishlistItems: wishlist.length,
        avgOrderValue,
        topCategories,
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Overview of your e-commerce store</p>
      </div>

      {/* Key Metrics */}
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#dbeafe' }}>
            💰
          </div>
          <div className="metric-info">
            <p className="metric-label">Total Revenue</p>
            <h3 className="metric-value">{formatCurrency(salesData?.totalRevenue || 0)}</h3>
            <span className="metric-change positive">+12.5% from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#fef3c7' }}>
            📦
          </div>
          <div className="metric-info">
            <p className="metric-label">Total Orders</p>
            <h3 className="metric-value">{formatNumber(salesData?.totalOrders || 0)}</h3>
            <span className="metric-change positive">+8.2% from last month</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#dcfce7' }}>
            🛍️
          </div>
          <div className="metric-info">
            <p className="metric-label">Products</p>
            <h3 className="metric-value">{formatNumber(salesData?.totalProducts || 0)}</h3>
            <span className="metric-change neutral">Active listings</span>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon" style={{ background: '#fce7f3' }}>
            💝
          </div>
          <div className="metric-info">
            <p className="metric-label">Wishlist Items</p>
            <h3 className="metric-value">{formatNumber(salesData?.wishlistItems || 0)}</h3>
            <span className="metric-change neutral">Saved by customers</span>
          </div>
        </div>
      </div>

      {/* Additional Stats */}
      <div className="stats-grid">
        <div className="stats-card">
          <h3>Category Distribution</h3>
          <div className="category-list">
            {salesData?.topCategories.map((cat) => (
              <div key={cat.category} className="category-item">
                <div className="category-info">
                  <span className="category-name">{cat.category}</span>
                  <span className="category-count">{cat.count} products</span>
                </div>
                <div className="category-bar">
                  <div 
                    className="category-fill" 
                    style={{ 
                      width: `${(cat.count / (salesData?.totalProducts || 1)) * 100}%` 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="stats-card">
          <h3>Recent Activity</h3>
          <div className="activity-list">
            <div className="activity-item">
              <div className="activity-icon">🛒</div>
              <div className="activity-info">
                <p className="activity-title">New order received</p>
                <span className="activity-time">2 minutes ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">⭐</div>
              <div className="activity-info">
                <p className="activity-title">New product review</p>
                <span className="activity-time">15 minutes ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">👤</div>
              <div className="activity-info">
                <p className="activity-title">New customer registration</p>
                <span className="activity-time">1 hour ago</span>
              </div>
            </div>
            <div className="activity-item">
              <div className="activity-icon">📦</div>
              <div className="activity-info">
                <p className="activity-title">Order shipped</p>
                <span className="activity-time">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Products Table */}
      <div className="products-table-container">
        <div className="table-header">
          <h3>Top Products</h3>
          <span className="product-count">{products.length} total products</span>
        </div>
        <div className="products-table">
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Reviews</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 10).map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-cell">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="product-thumb"
                      />
                      <span className="product-name">{product.title}</span>
                    </div>
                  </td>
                  <td>
                    <span className="category-badge">{product.category}</span>
                  </td>
                  <td className="price-cell">{formatCurrency(product.price)}</td>
                  <td>
                    <div className="rating-cell">
                      <span>⭐ {product.rating.rate.toFixed(1)}</span>
                    </div>
                  </td>
                  <td>{formatNumber(product.rating.count)}</td>
                  <td>
                    <span className="status-badge active">Active</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;