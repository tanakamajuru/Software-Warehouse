import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../contexts/CartContext';
import './ProductCard.css';

function ProductCard({ product, categories = {} }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [stockInfo, setStockInfo] = useState({ availableQuantity: 0, isAvailable: true });
  const [checkingStock, setCheckingStock] = useState(false);
  const { addToCart } = useContext(CartContext);

  // Check stock availability
  const checkStockAvailability = async () => {
    if (!product.id) return;
    
    setCheckingStock(true);
    try {
      const response = await fetch(`http://localhost:5000/api/v1/inventory/check-availability/${product.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: 1 })
      });
      
      const data = await response.json();
      if (data.success) {
        setStockInfo({
          availableQuantity: data.data.availableQuantity,
          isAvailable: data.data.isAvailable
        });
      }
    } catch (error) {
      console.error('Error checking stock:', error);
      // Fallback to basic stock check
      setStockInfo({
        availableQuantity: product.quantity || product.stock || product.inventory || 0,
        isAvailable: (product.quantity || product.stock || product.inventory || 0) > 0
      });
    } finally {
      setCheckingStock(false);
    }
  };

  // Check stock on component mount
  useEffect(() => {
    checkStockAvailability();
  }, [product.id]);

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Prevent product click navigation
    
    // Check real-time stock before adding to cart
    if (!isInStock()) {
      console.log('Product out of stock:', product.title);
      return;
    }
    
    // Debug logging
    console.log('ProductCard - Product data:', product);
    console.log('ProductCard - Product price:', product.price);
    console.log('ProductCard - Product priceAfterDiscount:', product.priceAfterDiscount);
    console.log('ProductCard - Stock info:', stockInfo);
    
    // Add item to cart with full details
    const cartItem = {
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: parseFloat(product.priceAfterDiscount) || parseFloat(product.price) || 0,
      originalPrice: parseFloat(product.price) || 0,
      imageCover: product.imageCover,
      categoryId: product.categoryId,
      categoryName: categories[product.categoryId] || 'Uncategorized',
      quantity: 1,
      ratingsAverage: product.ratingsAverage,
      ratingsQuantity: product.ratingsQuantity,
      stock: stockInfo.availableQuantity || product.quantity || product.stock || product.inventory || 0
    };
    
    console.log('ProductCard - Cart item being added:', cartItem);
    addToCart(cartItem);
    console.log('Added to cart:', cartItem);
  };

  const handleProductClick = () => {
    console.log('Product clicked:', product);
    console.log('Product slug:', product.slug);
    if (product.slug) {
      navigate(`/product/${product.slug}`);
    } else {
      console.error('Product slug is missing');
      // Fallback: use product ID if slug is missing
      if (product.id) {
        navigate(`/product/${product.id}`);
      }
    }
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    return isNaN(numPrice) ? '0.00' : numPrice.toFixed(2);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(parseFloat(rating) || 0);
    const hasHalfStar = (parseFloat(rating) || 0) % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`} className="star">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half-star">★</span>);
    }
    
    const emptyStars = 5 - Math.ceil(parseFloat(rating) || 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty-star">★</span>);
    }
    
    return stars;
  };

  const isInStock = () => {
    // Use real-time stock info if available, fallback to basic check
    if (stockInfo.availableQuantity !== undefined) {
      return stockInfo.isAvailable && stockInfo.availableQuantity > 0;
    }
    const quantity = product.quantity || product.stock || product.inventory || 0;
    return quantity > 0;
  };

  const getStockQuantity = () => {
    // Use real-time stock info if available
    if (stockInfo.availableQuantity !== undefined) {
      return stockInfo.availableQuantity;
    }
    return product.quantity || product.stock || product.inventory || 0;
  };

  const getCategoryName = () => {
    // First try to get category from the categories map using categoryId
    if (product.categoryId && categories && typeof categories === 'object' && categories[product.categoryId]) {
      const categoryName = categories[product.categoryId];
      console.log('ProductCard - Found category from map:', categoryName);
      return categoryName;
    }
    
    // Fallback to other possible fields
    const possibleFields = [
      product.categoryName,
      product.category?.name,
      product.category,
      product.categoryName?.name,
      product.category?.categoryName
    ];
    
    const category = possibleFields.find(field => field && typeof field === 'string' && field.trim() !== '');
    
    console.log('ProductCard - Found category from fallback:', category);
    console.log('ProductCard - All category fields:', {
      categoryId: product.categoryId,
      categoryName: product.categoryName,
      categoryName: product.category?.name,
      category: product.category,
      categoryNameName: product.categoryName?.name,
      categoryCategoryName: product.category?.categoryName
    });
    
    return category || 'Uncategorized';
  };

  return (
    <div 
      className="product-card" 
      onClick={handleProductClick} 
      style={{ cursor: 'pointer', position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
          {getCategoryName().charAt(0).toUpperCase() || 'P'}
        </div>
        
        {product.priceAfterDiscount && (
          <div className="discount-badge">
            SALE
          </div>
        )}
        
        {!isInStock() && (
          <div className="out-of-stock-badge">
            {checkingStock ? 'CHECKING...' : 'OUT OF STOCK'}
          </div>
        )}
      </div>
      
      <div className="product-info">
        <div className="product-category">{getCategoryName()}</div>
        <div className="product-name">{product.title}</div>
        
        <div className="product-rating">
          <div className="stars">
            {renderStars(product.ratingsAverage)}
          </div>
          <span className="rating-count">({product.ratingsQuantity || 0})</span>
        </div>
        
        <div className="product-price-section">
          {product.priceAfterDiscount && parseFloat(product.priceAfterDiscount) > 0 ? (
            <>
              <div className="product-price original">${formatPrice(product.price)}</div>
              <div className="product-price discounted">${formatPrice(product.priceAfterDiscount)}</div>
            </>
          ) : (
            <div className="product-price">${formatPrice(product.price)}</div>
          )}
        </div>
        
        <div className="inventory-info">
          <span className={`stock-status ${isInStock() ? 'in-stock' : 'out-of-stock'}`}>
            {checkingStock ? 'CHECKING...' : isInStock() ? 'In Stock' : 'Out of stock'}
          </span>
          {!checkingStock && getStockQuantity() !== undefined && (
            <span className="stock-count">{getStockQuantity()} available</span>
          )}
        </div>
        
        {product.sold && (
          <div className="sold-info">
            <span className="sold-count">{product.sold} sold</span>
          </div>
        )}
        
        {/* ADD TO CART Button - appears on hover at center bottom */}
        {isHovered && (
          <button 
            className="add-to-cart-btn"
            onClick={handleAddToCart}
            disabled={!isInStock() || checkingStock}
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: isInStock() ? '#3498db' : '#ccc',
              color: 'white',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: isInStock() && !checkingStock ? 'pointer' : 'not-allowed',
              zIndex: 10,
              transition: 'all 0.2s ease',
              boxShadow: isInStock() ? '0 2px 8px rgba(52, 152, 219, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)',
              opacity: checkingStock ? 0.7 : 1
            }}
            onMouseEnter={(e) => {
              if (isInStock() && !checkingStock) {
                e.target.style.backgroundColor = '#2980b9';
                e.target.style.transform = 'translateX(-50%) translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(52, 152, 219, 0.4)';
              }
            }}
            onMouseLeave={(e) => {
              if (isInStock() && !checkingStock) {
                e.target.style.backgroundColor = '#3498db';
                e.target.style.transform = 'translateX(-50%) translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(52, 152, 219, 0.3)';
              }
            }}
          >
            {checkingStock ? 'CHECKING...' : !isInStock() ? 'OUT OF STOCK' : 'ADD TO CART'}
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
