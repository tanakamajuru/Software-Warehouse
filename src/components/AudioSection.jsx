import React from 'react';

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

// Product Card Component
function ProductCard({ product }) {
  return (
    <div className="product-card">
      <div className="product-image" />
      <div className="product-category">{product.category}</div>
      <div className="product-name">{product.name}</div>
      <div className="product-rating">⭐⭐⭐⭐⭐ (0)</div>
      {product.price && <div className="product-price">{product.price}</div>}
    </div>
  );
}

function AudioSection() {
  const audioProducts = [
    { category: 'AUDIO', name: 'Vinova Headphone Sociis Buds T100...', price: '$36.00' },
    { category: 'AUDIO', name: 'Wage Universal Wired Surround Gaming...', price: '$350.00' },
    { category: 'AUDIO', name: 'Gaming Headset with Mic for Xbox One PS4...', price: '$200.00 – $230.00' }
  ];

  return (
    <div className="audio-banner">
      <div className="banner-image" />
      <div className="banner-products">
        <div className="section-header">
          <h2 className="section-title">AUDIO & SOUND</h2>
          <div className="section-nav">
            <div className="nav-arrow"><ChevronLeftIcon /></div>
            <div className="nav-arrow"><ChevronRightIcon /></div>
          </div>
        </div>
        <div className="audio-product-grid">
          {audioProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AudioSection;
