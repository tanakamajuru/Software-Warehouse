import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag, Truck } from 'lucide-react';
import './CartDrawer.css';
import { useCart } from '../contexts/CartContext';

const CartDrawer = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { items, totalItems, subtotal, tax, shipping, totalPrice, removeFromCart, updateQuantity, clearCart } = useCart();

  // Calculate shipping progress
  const freeShippingThreshold = 100;
  const progressPercentage = Math.min((subtotal / freeShippingThreshold) * 100, 100);
  const remainingForFreeShipping = Math.max(freeShippingThreshold - subtotal, 0);

  const handleQuantityChange = (itemId, newQuantity) => {
    // Find the item to check stock
    const item = items.find(item => item.id === itemId);
    if (item && newQuantity > (item.stock || 0)) {
      console.log('Cannot increase quantity - insufficient stock:', {
        requested: newQuantity,
        available: item.stock || 0
      });
      return;
    }
    
    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleClearCart = () => {
    clearCart();
    onClose();
  };

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  const formatPrice = (price) => {
    const numPrice = parseFloat(price);
    if (isNaN(numPrice)) return '0.00';
    return numPrice.toFixed(2);
  };

  return (
    <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
      {isOpen && <div className="cart-drawer-overlay" onClick={onClose}></div>}
      <div className="cart-drawer-content">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-icon-wrap">
            <ShoppingBag size={30} />
            <div className="cart-badge">{totalItems}</div>
          </div>
          <div className="cart-title">Shopping Cart</div>
          <button className="close-btn" onClick={onClose}>
            <X size={16} />
          </button>
        </div>

        {/* Shipping Progress */}
        <div className="shipping-progress">
          <div className="progress-track">
            <div 
              className="progress-fill" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
            <div className="truck-icon">
              <Truck size={22} />
            </div>
          </div>
          <p className="shipping-text">
            {remainingForFreeShipping > 0 ? (
              <>Buy <strong>${formatPrice(remainingForFreeShipping)}</strong> more to get <span className="free-ship">Free Shipping</span></>
            ) : (
              <span className="free-ship">You qualify for Free Shipping!</span>
            )}
          </p>
        </div>

        {/* Cart Items */}
        <div className="cart-items">
          {items.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">
                <ShoppingBag size={48} />
              </div>
              Your cart is empty
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item">
                {item.imageCover ? (
                  <img 
                    src={item.imageCover} 
                    alt={item.title}
                    className="item-img"
                  />
                ) : (
                  <div className="item-img-placeholder">
                    {item.title.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="item-details">
                  <div className="item-name">{item.title}</div>
                  {item.categoryName && (
                    <div className="item-category">{item.categoryName}</div>
                  )}
                  <div className="item-qty-price">
                    {item.quantity} × <span>${formatPrice(item.price)}</span>
                  </div>
                  <div className="item-quantity">
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={12} />
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={item.quantity >= (item.stock || 0)}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </div>
                <button 
                  className="delete-btn"
                  onClick={() => handleRemoveItem(item.id)}
                  title="Remove item"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Subtotal */}
        {items.length > 0 && (
          <>
            <div className="cart-subtotal">
              <span className="subtotal-label">Subtotal:</span>
              <span className="subtotal-amount">${formatPrice(subtotal)}</span>
            </div>

            {/* Detailed Summary */}
            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal ({totalItems} items):</span>
                <span>${formatPrice(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Tax (10%):</span>
                <span>${formatPrice(tax)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping:</span>
                <span>${formatPrice(shipping)}</span>
              </div>
              <div className="summary-row total">
                <span>Total:</span>
                <span>${formatPrice(totalPrice)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="cart-actions">
              {/* <button className="btn-view-cart" onClick={onClose}>
                View Cart
              </button> */}
              <button className="btn-checkout" onClick={handleCheckout}>
                Checkout
              </button>
              <button className="btn-clear" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
