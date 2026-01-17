import React from 'react';
import { Product } from '../../types/product.types';
import ProductCard from './ProductCard';
import './ProductGrid.css';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  if (products.length === 0) {
    return (
      <div className="no-products">
        <div className="no-products-icon">🔍</div>
        <h3>No products found</h3>
        <p>Try adjusting your filters or search query</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;