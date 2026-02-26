import React, { useState, useEffect } from 'react';

// Icon Components
const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="footer">
      {/* PC Layout - Preserve Original */}
      {!isMobile ? (
        <>
          <div className="footer-grid">
            <div>
              <div className="footer-title">Follow Us:</div>
              <div className="social-icons">
                {/* Facebook */}
                <div className="social-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" 
                    alt="Facebook" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* X (Twitter) */}
                <div className="social-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg" 
                    alt="X (Twitter)" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* YouTube */}
                <div className="social-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/2/20/YouTube_2024.svg" 
                    alt="YouTube" 
                    className="h-8 w-auto"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="footer-title">We Accept:</div>
              <div className="payment-methods flex gap-3 items-center">
                {/* Ecocash */}
                <div className="payment-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/54/EcoCash.png" 
                    alt="Ecocash" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* Innbucks */}
                <div className="payment-icon">
                  <img 
                    src="https://wallet.innbucks.co.zw/images/logo-black.png" 
                    alt="Telecash" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* OneMoney */}
                <div className="payment-icon">
                  <img 
                    src="https://www.onemoney.co.zw/_next/image?url=%2F_next%2Fstatic%2Fmedia%2F2.b494b634.png&w=3840&q=75" 
                    alt="OneMoney" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* VISA */}
                <div className="payment-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Visa_Inc._logo_%282005%E2%80%932014%29.png" 
                    alt="VISA" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* Mastercard */}
                <div className="payment-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" 
                    alt="Mastercard" 
                    className="h-8 w-auto"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="footer-title">Subscribe to Our Newsletter</div>
              <div className="newsletter-input">
                <input type="email" placeholder="ENTER YOUR EMAIL ADDRESS" className="footer-input" />
                <button className="submit-btn">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div>
              <div className="footer-info">Copyright © 2024 Zimbabwe SOFTWARE & HARDWARE SOLUTIONS.</div>
              <div className="footer-info">All Rights Reserved.</div>
            </div>
            <div>
              <div className="footer-info">Store Location:</div>
              <div className="footer-info">Sam Levy Village, Borrowdale, Harare, Zimbabwe</div>
              <div className="footer-info">Call Us +263 242 745 890</div>
              <div className="footer-info">Email: info@softwarewarehouse.co.zw</div>
            </div>
          </div>
        </>
      ) : (
        /* Mobile Layout - New Responsive Design */
        <>
          <div className="footer-grid responsive-footer-grid">
            <div className="footer-section">
              <h3 className="footer-title text-responsive-lg">Follow Us</h3>
              <div className="social-icons">
                {/* Facebook */}
                <div className="social-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg" 
                    alt="Facebook" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* X (Twitter) */}
                <div className="social-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg" 
                    alt="X (Twitter)" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* YouTube */}
                <div className="social-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/2/20/YouTube_2024.svg" 
                    alt="YouTube" 
                    className="h-8 w-auto"
                  />
                </div>
              </div>
            </div>

            
            <div className="footer-section">
              <h3 className="footer-title text-responsive-lg">We Accept</h3>
              <div className="payment-methods flex gap-3 items-center">
                {/* Ecocash */}
                <div className="payment-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/52/Ecocash_logo.png" 
                    alt="Ecocash" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* Telecash */}
                <div className="payment-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fd/TeleCash_logo.png" 
                    alt="Telecash" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* OneMoney */}
                <div className="payment-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/0/0b/OneMoney_Logo.png" 
                    alt="OneMoney" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* VISA */}
                <div className="payment-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" 
                    alt="VISA" 
                    className="h-8 w-auto"
                  />
                </div>

                {/* Mastercard */}
                <div className="payment-icon">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png" 
                    alt="Mastercard" 
                    className="h-8 w-auto"
                  />
                </div>
              </div>
            </div>
            <div className="footer-section">
              <h3 className="footer-title text-responsive-lg">Newsletter</h3>
              <div className="newsletter-input">
                <input type="email" placeholder="ENTER YOUR EMAIL" className="footer-input responsive-input" />
                <button className="submit-btn responsive-btn">Subscribe</button>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-info-section">
              <div className="footer-info text-responsive-sm">© 2024 Zimbabwe SOFTWARE & HARDWARE SOLUTIONS</div>
              <div className="footer-info text-responsive-sm">All Rights Reserved</div>
            </div>
            <div className="footer-info-section">
              <div className="footer-info text-responsive-sm">Sam Levy Village, Borrowdale, Harare, Zimbabwe</div>
              <div className="footer-info text-responsive-sm">+263 242 745 890</div>
              <div className="footer-info text-responsive-sm">info@softwarewarehouse.co.zw</div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 

export default Footer;
