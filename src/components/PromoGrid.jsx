import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

function PromoGrid() {
  const [topBoughtProducts, setTopBoughtProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopBought = async () => {
      try {
        const data = await apiService.getTopBoughtProducts();
        const products = Array.isArray(data) ? data.slice(0, 3) : [];
        setTopBoughtProducts(products);
      } catch (error) {
        console.error('Failed to fetch top bought products:', error);
        setTopBoughtProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopBought();
  }, []);

  const promoGradients = [
    'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
    'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)',
    'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)'
  ];

  return (
    <div className="promo-section">
      {loading ? (
        // Loading skeleton
        Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="promo-card skeleton">
            <div className="skeleton-box"></div>
          </div>
        ))
      ) : topBoughtProducts.length > 0 ? (
        topBoughtProducts.map((product, index) => (
          <div key={product.id} className="promo-card" style={{ background: promoGradients[index % promoGradients.length] }}>
            <div>
              <div className="promo-title">{product.title || product.name}</div>
              <div className="promo-subtitle">{product.description?.substring(0, 60)}...</div>
              <div className="promo-price">${product.price}</div>
            </div>
          </div>
        ))
      ) : (
        // No products available - show empty state
        <div className="promo-section-empty">
          <p>No top products available</p>
        </div>
      )}
    </div>
  );
}

export default PromoGrid;
