import React from 'react';

// Icon Components
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function Footer() {
  return (
    <div className="footer">
      <div className="footer-grid">
        <div>
          <div className="footer-title">Follow Us:</div>
          <div className="social-icons">
            <div className="social-icon">🇿🇼</div>
            <div className="social-icon">📧</div>
            <div className="social-icon">💼</div>
            <div className="social-icon">�</div>
            <div className="social-icon">🌐</div>
          </div>
        </div>
        <div>
          <div className="footer-title">We Accept:</div>
          <div className="payment-methods">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="payment-icon" />
            ))}
          </div>
        </div>
        <div>
          <div className="footer-title">Subscribe to Our Newsletter</div>
          <div className="newsletter-input">
            <input type="email" placeholder="ENTER YOUR ZIMBABWE EMAIL" className="footer-input" />
            <button className="submit-btn">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        {/* <div>
          <div className="footer-info">Copyright © 2024 Zimbabwe Software Solutions.</div>
          <div className="footer-info">All Rights Reserved.</div>
        </div> */}
        <div>
          <div className="footer-info">Store Location:</div>
          <div className="footer-info">Sam Levy Village, Borrowdale, Harare, Zimbabwe</div>
          <div className="footer-info">Call Us +263 242 745 890</div>
          <div className="footer-info">Email: info@zimsoftware.co.zw</div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
