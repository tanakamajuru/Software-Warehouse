import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

function ProductCard({ product }) {
  const [inventory, setInventory] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const [inventoryData, discountData] = await Promise.all([
          apiService.getInventory(product.id),
          apiService.getTopDiscounts()
        ]);
        
        setInventory(inventoryData);
        // Find discount for this specific product from top discounts
        const discounts = Array.isArray(discountData) ? discountData : [];
        const productDiscount = discounts.find(d => d.productId === product.id && d.active);
        setDiscount(productDiscount || null);
      } catch (error) {
        console.error('Failed to fetch product details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [product.id]);

  const calculateDiscountedPrice = () => {
    if (!discount) return product.price;
    return (product.price * (1 - discount.discountPercentage / 100)).toFixed(2);
  };

  const isInStock = () => {
    return inventory && inventory.quantity > inventory.reserved;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half-star">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty-star">★</span>);
    }
    
    return stars;
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        {product.imageCover ? (
          <img 
            src={product.imageCover} 
            alt={product.title}
            className="product-image"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="product-image-placeholder" style={{ display: product.imageCover ? 'none' : 'flex' }}>
          Software Icon
        </div>
        
        {discount && (
          <div className="discount-badge">
            -{discount.discountPercentage}%
          </div>
        )}
        
        {!isInStock() && (
          <div className="out-of-stock-badge">
            Out of Stock
          </div>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-category">{product.category?.name || 'Uncategorized'}</div>
        <div className="product-name">{product.title}</div>
        
        <div className="product-rating">
          <div className="stars">
            {renderStars(product.ratingsAverage)}
          </div>
          <span className="rating-count">({product.ratingsQuantity})</span>
        </div>
        
        <div className="product-price-section">
          {discount ? (
            <>
              <div className="product-price original">${product.price}</div>
              <div className="product-price discounted">${calculateDiscountedPrice()}</div>
            </>
          ) : (
            <div className="product-price">${product.price}</div>
          )}
        </div>
        
        {inventory && (
          <div className="inventory-info">
            <span className={`stock-status ${isInStock() ? 'in-stock' : 'out-of-stock'}`}>
              {isInStock() ? 'Instant Download' : 'Out of stock'}
            </span>
            {inventory.sold > 0 && (
              <span className="sold-count">{inventory.sold} licenses sold</span>
            )}
          </div>
        )}
        
        <div className="software-info">
          <span className="license-type">Digital License</span>
          <span className="platform">Windows/Mac/Linux</span>
        </div>
        
        {product.brand && (
          <div className="product-brand">{product.brand.name}</div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
