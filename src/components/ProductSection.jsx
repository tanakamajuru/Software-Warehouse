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

function ProductSection() {
  const smartphoneProducts = [
    { category: 'SMARTPHONE', name: 'Nova A12 Factory Unlocked 4G/LTE Smartphone' },
    { category: 'SMARTPHONE', name: 'Original S24 Ultra 16GB 512GB Smartphone' },
    { category: 'SMARTPHONE', name: 'Smartphone Nova Mate 50 Pro Snapdragon 888' },
    { category: 'SMARTPHONE', name: 'Vinova 23 Triple Nascetur NFC Donec ROM Celulares' },
    { category: 'SMARTPHONE', name: 'Vinova Dolor Note 10 Battery 120W Fast Charging' }
  ];

  return (
    <div className="product-section">
      <div className="section-header">
        <h2 className="section-title">TOP SMARTPHONE TRENDS</h2>
        <div className="section-nav">
          <div className="nav-arrow"><ChevronLeftIcon /></div>
          <div className="nav-arrow"><ChevronRightIcon /></div>
        </div>
      </div>
      <div className="product-grid">
        {smartphoneProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>
    </div>
  );
}

export default ProductSection;
