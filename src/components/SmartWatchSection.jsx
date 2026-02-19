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

function BusinessSoftware() {
  const [businessProducts, setBusinessProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBusinessProducts = async () => {
      try {
        const data = await apiService.getProducts({ limit: 10 });
        const productsArray = Array.isArray(data) ? data : (data.data || []);
        
        // Filter for high-value products that could be business-related
        const business = productsArray.filter(product => 
          parseFloat(product.price) > 100 || 
          product.categoryName === 'Software' ||
          product.title.toLowerCase().includes('business') ||
          product.title.toLowerCase().includes('professional')
        ).slice(0, 3);
        
        setBusinessProducts(business);
      } catch (err) {
        console.error('Failed to fetch business products:', err);
        setError(err.message);
        // Fallback to mock data
        setBusinessProducts([
          { id: '1', title: 'Business Management Suite', categoryName: 'Software', price: '999.99', imageCover: null },
          { id: '2', title: 'Customer Relationship Management', categoryName: 'Software', price: '299.99', imageCover: null },
          { id: '3', title: 'Human Resources Management', categoryName: 'Software', price: '199.99', imageCover: null }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinessProducts();
  }, []);

  if (loading) {
    return (
      <div className="product-section">
        <div className="section-header">
          <h2 className="section-title">BUSINESS SOLUTIONS</h2>
          <div className="section-nav">
            <div className="nav-arrow"><ChevronLeftIcon /></div>
            <div className="nav-arrow"><ChevronRightIcon /></div>
          </div>
        </div>
        <div className="product-grid-with-image">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="product-card skeleton">
              <div className="product-image skeleton-box"></div>
              <div className="product-info">
                <div className="product-category skeleton-box"></div>
                <div className="product-name skeleton-box"></div>
                <div className="product-price skeleton-box"></div>
              </div>
            </div>
          ))}
          <div className="large-product-image">
            <div style={{fontSize: '48px', fontWeight: 800, color: '#1e40af'}}>BUSINESS SOLUTIONS</div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-section">
        <div className="section-header">
          <h2 className="section-title">BUSINESS SOLUTIONS</h2>
        </div>
        <div className="error-message">Failed to load business products: {error}</div>
      </div>
    );
  }

  return (
    <div className="product-section">
      <div className="section-header">
        <h2 className="section-title">BUSINESS SOLUTIONS</h2>
        <div className="section-nav">
          <div className="nav-arrow"><ChevronLeftIcon /></div>
          <div className="nav-arrow"><ChevronRightIcon /></div>
        </div>
      </div>
      <div className="product-grid-with-image">
        {businessProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
        <div className="large-product-image">
          <div style={{fontSize: '48px', fontWeight: 800, color: '#1e40af'}}>BUSINESS SOLUTIONS</div>
        </div>
      </div>
    </div>
  );
}

export default BusinessSoftware;
