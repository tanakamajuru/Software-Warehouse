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

function SoftwareSolutions() {
  const [softwareProducts, setSoftwareProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSoftwareProducts = async () => {
      try {
        const data = await apiService.getProducts({ limit: 10 });
        const productsArray = Array.isArray(data) ? data : (data.data || []);
        
        // Filter for software products
        const software = productsArray.filter(product => 
          product.categoryName === 'Software'
        ).slice(0, 3);
        
        setSoftwareProducts(software);
      } catch (err) {
        console.error('Failed to fetch software products:', err);
        setError(err.message);
        // Fallback to mock data
        setSoftwareProducts([
          { id: '1', title: 'Antivirus Pro Suite', categoryName: 'Software', price: '29.99', imageCover: null },
          { id: '2', title: 'Office Suite Professional', categoryName: 'Software', price: '149.99', imageCover: null },
          { id: '3', title: 'E-Learning Platform', categoryName: 'Software', price: '99.99', imageCover: null }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchSoftwareProducts();
  }, []);

  if (loading) {
    return (
      <div className="software-banner">
        <div className="banner-products">
          <div className="section-header">
            <h2 className="section-title">SOFTWARE SOLUTIONS</h2>
            <div className="section-nav">
              <div className="nav-arrow"><ChevronLeftIcon /></div>
              <div className="nav-arrow"><ChevronRightIcon /></div>
            </div>
          </div>
          <div className="software-product-grid">
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
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="software-banner">
        <div className="banner-products">
          <div className="section-header">
            <h2 className="section-title">SOFTWARE SOLUTIONS</h2>
          </div>
          <div className="error-message">Failed to load software products: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="software-banner">
      <div className="banner-image" />
      <div className="banner-products">
        <div className="section-header">
          <h2 className="section-title">SOFTWARE SOLUTIONS</h2>
          <div className="section-nav">
            <div className="nav-arrow"><ChevronLeftIcon /></div>
            <div className="nav-arrow"><ChevronRightIcon /></div>
          </div>
        </div>
        <div className="software-product-grid">
          {softwareProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SoftwareSolutions;
