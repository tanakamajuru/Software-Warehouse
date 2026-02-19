import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import apiService from '../services/api';

// Icon Components
const ChevronLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

function ProductSection({ categoryId, brandId, title = "FEATURED PRODUCTS" }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsAndCategories = async () => {
      try {
        let params = { limit: 10 };
        if (categoryId) params.categoryId = categoryId;
        if (brandId) params.brandId = brandId;
        
        // Fetch both products and categories
        const [productsResponse, categoriesResponse] = await Promise.all([
          apiService.getProducts(params),
          apiService.getCategories()
        ]);
        
        // Handle paginated response
        const productsArray = Array.isArray(productsResponse) ? productsResponse : (productsResponse.data || []);
        const categoriesArray = Array.isArray(categoriesResponse) ? categoriesResponse : (categoriesResponse.data || []);
        
        // Create category lookup map
        const categoryMap = {};
        categoriesArray.forEach(category => {
          categoryMap[category.id] = category.name || category.slug || 'Unknown';
        });
        
        console.log('ProductSection - Category map:', categoryMap);
        setCategories(categoryMap);
        setProducts(productsArray.slice(0, 5)); // Take first 5 products
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsAndCategories();
  }, [categoryId, brandId]);

  if (loading) {
    return (
      <div className="product-section">
        <div className="section-header">
          <h2 className="section-title">{title}</h2>
          <div className="section-nav">
            <div className="nav-arrow"><ChevronLeftIcon /></div>
            <div className="nav-arrow"><ChevronRightIcon /></div>
          </div>
        </div>
        <div className="product-grid">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="product-card skeleton">
              <div className="product-image skeleton-box"></div>
              <div className="product-info">
                <div className="product-category skeleton-box"></div>
                <div className="product-name skeleton-box"></div>
                <div className="product-rating skeleton-box"></div>
                <div className="product-price skeleton-box"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-section">
        <div className="error-message">Failed to load products: {error}</div>
      </div>
    );
  }

  return (
    <div className="product-section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <div className="section-nav">
          <div className="nav-arrow"><ChevronLeftIcon /></div>
          <div className="nav-arrow"><ChevronRightIcon /></div>
        </div>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} categories={categories} />
        ))}
      </div>
    </div>
  );
}

export default ProductSection;
