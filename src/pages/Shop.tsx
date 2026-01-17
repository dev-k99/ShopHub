import React, { useEffect, useState } from 'react';
import { productsApi } from '../api/products';
import { Product } from '../types/product.types';
import ProductGrid from '../components/products/ProductGrid';
import LoadingSpinner from '../components/common/LoadingSpinner';
import './Shop.css';

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('name');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterAndSortProducts();
  }, [products, selectedCategory, searchQuery, sortBy]);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [productsData, categoriesData] = await Promise.all([
        productsApi.getAll(),
        productsApi.getCategories(),
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const filterAndSortProducts = () => {
    let filtered = [...products];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
      case 'name':
      default:
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    setFilteredProducts(filtered);
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button onClick={loadData}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="shop">
      <div className="shop-header">
        <h1>Shop Our Collection</h1>
        <p>Discover {products.length} amazing products</p>
      </div>

      <div className="shop-filters">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort">Sort By</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="name">Name (A-Z)</option>
            <option value="price-asc">Price (Low to High)</option>
            <option value="price-desc">Price (High to Low)</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      <div className="results-count">
        Showing {filteredProducts.length} of {products.length} products
      </div>

      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default Shop;