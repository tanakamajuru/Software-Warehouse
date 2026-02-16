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

function BusinessSoftware() {
  const businessProducts = [
    { category: 'ERP', name: 'Business Management Suite - Enterprise Edition', price: '$999.99' },
    { category: 'CRM', name: 'Customer Relationship Management - Professional', price: '$299.99' },
    { category: 'HR', name: 'Human Resources Management System', price: '$199.99' }
  ];

  return (
    <div className="product-section">
      <div className="section-header">
        <h2 className="section-title">BUSINESS SOFTWARE</h2>
        <div className="section-nav">
          <div className="nav-arrow"><ChevronLeftIcon /></div>
          <div className="nav-arrow"><ChevronRightIcon /></div>
        </div>
      </div>
      <div className="product-grid-with-image">
        {businessProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
        <div className="large-product-image">
          <div style={{fontSize: '48px', fontWeight: 800, color: '#1e40af'}}>BUSINESS SOLUTIONS</div>
        </div>
      </div>
    </div>
  );
}

export default BusinessSoftware;
