import React from 'react';

function NewsletterPopup({ show, onClose }) {
  if (!show) return null;

  return (
    <>
      <div className="popup-overlay" onClick={onClose} />
      <div className="newsletter-popup">
        <button className="popup-close" onClick={onClose}>×</button>
        <div className="popup-image" />
        <div className="popup-content">
          <div className="popup-tag">Sign up Newsletter</div>
          <div className="popup-title">GET 10% DISCOUNT</div>
          <div className="popup-subtitle">
            Sign up for newsletter to receive special offers and exclusive news about products
          </div>
          <div className="newsletter-input">
            <input type="email" placeholder="ENTER YOUR EMAIL" className="input" />
            <button className="subscribe-btn">Subscribe</button>
          </div>
          <label className="checkbox-label">
            <input type="checkbox" onChange={onClose} />
            Don't show this popup again
          </label>
        </div>
      </div>
    </>
  );
}

export default NewsletterPopup;
