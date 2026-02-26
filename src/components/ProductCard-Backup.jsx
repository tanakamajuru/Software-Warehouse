import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../contexts/CartContext';
import ApiService from '../services/api';
import './ProductCard.css';

function ProductCard({ product, categories = {} }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [stockInfo, setStockInfo] = useState({ availableQuantity: 0, isAvailable: true });
  const [checkingStock, setCheckingStock] = useState(false);
  const { addToCart } = useContext(CartContext);

  // Check stock availability
  const checkStockAvailability = async () => {
    // Skip API call since inventory endpoint doesn't exist
    // Use fallback to product data directly
    const stockQuantity = product.quantity || product.stock || product.inventory || 0;
    setStockInfo({
      availableQuantity: stockQuantity,
      isAvailable: stockQuantity > 0
    });
  };

  // Check stock on component mount
  useEffect(() => {
    checkStockAvailability();
  }, [product.id]);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent product click navigation
    
    if (!stockInfo.isAvailable) {
      alert('This product is out of stock');
      return;
    }
    
    const cartItem = {
      id: product.id || product._id,
      name: product.title || product.name,
      price: parseFloat(product.price) || 0,
      image: product.imageCover || product.image,
      quantity: 1,
      maxQuantity: stockInfo.availableQuantity
    };
    
    addToCart(cartItem);
  };

  const handleProductClick = () => {
    const slug = product.slug || product.title?.toLowerCase().replace(/\s+/g, '-');
    navigate(`/product/${slug}`);
  };

  const categoryName = categories[product.categoryId] || categories[product.category] || 'Unknown';
  
  // Format price
  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  const hasDiscount = product.priceAfterDiscount && 
                     parseFloat(product.priceAfterDiscount) < parseFloat(product.price);

  return (
    <div 
      className={`product-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleProductClick}
    >
      <div className="product-image-container">
        <img
          src={product.imageCover || product.image || 'https://via.placeholder.com/300x300'}
          alt={product.title || product.name}
          className="product-image"
          loading="lazy"
        />
        
        {/* Hover Actions */}
        {isHovered && (
          <div className="product-actions">
            <button 
              className="add-to-cart-btn"
              onClick={handleAddToCart}
              disabled={!stockInfo.isAvailable}
            >
              {stockInfo.isAvailable ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <button className="quick-view-btn">
              Quick View
            </button>
          </div>
        )}
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="discount-badge">
            -{Math.round((1 - parseFloat(product.priceAfterDiscount) / parseFloat(product.price)) * 100)}%
          </div>
        )}
      </div>

      <div className="product-info">
        <div className="product-category">{categoryName}</div>
        <h3 className="product-name">{product.title || product.name}</h3>
        
        {/* Rating */}
        <div className="product-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <span key={i} className={`star ${i < Math.floor(product.ratingsAverage || 0) ? 'filled' : ''}`}>
                ★
              </span>
            ))}
          </div>
          {product.ratingsQuantity > 0 && (
            <span className="rating-count">({product.ratingsQuantity})</span>
          )}
        </div>

        <div className="product-price">
          <span className="current-price">
            ${formatPrice(hasDiscount ? product.priceAfterDiscount : product.price)}
          </span>
          {hasDiscount && (
            <span className="original-price">
              ${formatPrice(product.price)}
            </span>
          )}
        </div>

        {!stockInfo.isAvailable && (
          <div className="out-of-stock">Out of Stock</div>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
