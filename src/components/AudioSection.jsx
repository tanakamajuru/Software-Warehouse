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

function SoftwareSolutions() {
  const softwareProducts = [
    { category: 'SECURITY', name: 'Antivirus Pro Suite - Zimbabwe Edition', price: '$29.99/year' },
    { category: 'PRODUCTIVITY', name: 'Office Suite Professional - Local Business Edition', price: '$149.99' },
    { category: 'EDUCATION', name: 'E-Learning Platform - Zimbabwe Curriculum', price: '$99.99/year' }
  ];

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
          {softwareProducts.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SoftwareSolutions;
