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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        // Fetch from multiple featured endpoints to get diverse products
        const [recentData, topBoughtData, lowStockData] = await Promise.all([
          apiService.getRecentProducts(),
          apiService.getTopBoughtProducts(),
          apiService.getLowStockFeatured()
        ]);

        // Combine and deduplicate products
        const allProducts = [
          ...(Array.isArray(recentData) ? recentData : []),
          ...(Array.isArray(topBoughtData) ? topBoughtData : []),
          ...(Array.isArray(lowStockData) ? lowStockData : [])
        ];

        // Remove duplicates by ID
        const uniqueProducts = allProducts.filter((product, index, self) =>
          index === self.findIndex((p) => p.id === product.id)
        );

        // Filter for software categories (Headphone, Audio, Smartphone, Smartwatch equivalents)
        const softwareProducts = uniqueProducts.filter(product => {
          const title = product.title?.toLowerCase() || '';
          const description = product.description?.toLowerCase() || '';
          
          // Look for software-related keywords
          return (
            title.includes('software') ||
            title.includes('app') ||
            title.includes('suite') ||
            title.includes('system') ||
            title.includes('management') ||
            title.includes('accounting') ||
            title.includes('crm') ||
            title.includes('security') ||
            title.includes('antivirus') ||
            title.includes('office') ||
            title.includes('business') ||
            description.includes('software') ||
            description.includes('application') ||
            description.includes('digital')
          );
        });

        // Take first 8 products and sort by created date
        const sortedProducts = softwareProducts
          .slice(0, 8)
          .sort((a, b) => new Date(b.createdDate) - new Date(a.createdDate));

        setTrendingProducts(sortedProducts);
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

  const handlePrevious = () => {
    setCurrentIndex(prev => (prev - 1 + Math.max(1, trendingProducts.length - 2)) % Math.max(1, trendingProducts.length - 2));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % Math.max(1, trendingProducts.length - 2));
  };

  const visibleProducts = trendingProducts.slice(currentIndex, currentIndex + 4);

  if (loading) {
    return (
      <div className="trending-section">
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
          {[...Array(4)].map((_, index) => (
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
      <div className="trending-section">
        <div className="section-header">
          <div className="section-title-with-icon">
            <TrendingUpIcon />
            <h2 className="section-title">TRENDING SOFTWARE</h2>
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
      <div className="trending-section">
        <div className="section-header">
          <div className="section-title-with-icon">
            <TrendingUpIcon />
            <h2 className="section-title">TRENDING SOFTWARE</h2>
          </div>
        </div>
        <div className="no-results">
          <p>No trending software products available at the moment.</p>
          <p>Check back soon for the latest Audio Apps, Business Systems, Mobile Solutions & Smart Tools!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="trending-section">
      <div className="section-header">
        <div className="section-title-with-icon">
          <TrendingUpIcon />
          <h2 className="section-title">TRENDING SOFTWARE</h2>
        </div>
        <div className="section-info">
          <p>Trending software: Audio Apps, Business Systems, Mobile Solutions & Smart Tools</p>
        </div>
        {trendingProducts.length > 4 && (
          <div className="section-nav">
            <div className="nav-arrow" onClick={handlePrevious}>
              <ChevronLeftIcon />
            </div>
            <div className="nav-arrow" onClick={handleNext}>
              <ChevronRightIcon />
            </div>
          </div>
        )}
      </div>
      
      <div className="product-grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {trendingProducts.length > 4 && (
        <div className="trending-indicators">
          {[...Array(Math.ceil(trendingProducts.length / 4))].map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === Math.floor(currentIndex / 4) ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index * 4)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TrendingProducts;
