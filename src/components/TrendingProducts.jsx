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

const TrendingUpIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

function TrendingProducts() {
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        // Fetch from multiple featured endpoints and categories
        const [recentData, topBoughtData, categoriesResponse] = await Promise.all([
          apiService.getRecentProducts(),
          apiService.getTopBoughtProducts(),
          apiService.getCategories()
        ]);
        
        // Handle different response formats
        const recentArray = Array.isArray(recentData) ? recentData : (recentData.data || []);
        const topBoughtArray = Array.isArray(topBoughtData) ? topBoughtData : (topBoughtData.data || []);
        const categoriesArray = Array.isArray(categoriesResponse) ? categoriesResponse : (categoriesResponse.data || []);
        
        // Create category lookup map
        const categoryMap = {};
        categoriesArray.forEach(category => {
          categoryMap[category.id] = category.name || category.slug || 'Unknown';
        });
        
        console.log('TrendingProducts - Category map:', categoryMap);
        setCategories(categoryMap);
        
        // Combine and deduplicate products
        const allProducts = [...recentArray, ...topBoughtArray];
        const uniqueProducts = allProducts.filter((product, index, self) =>
          index === self.findIndex((p) => p.id === product.id)
        );
        
        console.log('Trending products:', uniqueProducts);
        setTrendingProducts(uniqueProducts);
      } catch (err) {
        console.error('Failed to fetch trending products:', err);
        setError(err.message);
        setTrendingProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingProducts();
  }, []);

  if (loading) {
    return (
      <div className="product-section">
        <div className="section-header">
          <div className="section-title-with-icon">
            <TrendingUpIcon />
            <h2 className="section-title skeleton-box" style={{ height: '32px', width: '200px' }}></h2>
          </div>
          <div className="section-nav">
            <div className="nav-arrow skeleton-box" style={{ width: '40px', height: '40px' }}></div>
            <div className="nav-arrow skeleton-box" style={{ width: '40px', height: '40px' }}></div>
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
        <div className="section-header">
          <div className="section-title-with-icon">
            <TrendingUpIcon />
            <h2 className="section-title">TRENDING PRODUCTS</h2>
          </div>
        </div>
        <div className="error-message">
          Failed to load trending products: {error}
        </div>
      </div>
    );
  }

  if (trendingProducts.length === 0) {
    return (
      <div className="product-section">
        <div className="section-header">
          <div className="section-title-with-icon">
            <TrendingUpIcon />
            <h2 className="section-title">TRENDING PRODUCTS</h2>
          </div>
        </div>
        <div className="no-results">
          <p>No trending products available at the moment.</p>
          <p>Check back soon for the latest Processors, Graphics Cards, Storage, Memory & Peripherals!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-section">
      <div className="section-header">
        <div className="section-title-with-icon">
          <TrendingUpIcon />
          <h2 className="section-title">TRENDING PRODUCTS</h2>
        </div>
        <div className="section-nav">
          <div className="nav-arrow"><ChevronLeftIcon /></div>
          <div className="nav-arrow"><ChevronRightIcon /></div>
        </div>
      </div>
      
      <div className="product-grid">
        {trendingProducts.slice(0, 5).map((product) => (
          <ProductCard key={product.id} product={product} categories={categories} />
        ))}
      </div>
    </div>
  );
}

export default TrendingProducts;
