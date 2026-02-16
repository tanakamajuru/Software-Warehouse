import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

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

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// Slider Controls Component
function SliderControls() {
  return (
    <div className="slider-controls">
      <div className="slider-arrow">
        <ChevronLeftIcon />
      </div>
      <div className="slider-dots">
        <div className="slider-dot" />
        <div className="slider-dot" />
        <div className="slider-dot slider-dot-active" />
      </div>
      <div className="slider-arrow">
        <ChevronRightIcon />
      </div>
      <div className="divider" />
      <div className="slider-pause">
        <PauseIcon />
      </div>
    </div>
  );
}

// Side Card Component
function SideCard({ tag, title, product, gradient }) {
  return (
    <div className="side-card" style={{ background: gradient }}>
      <div>
        <div className="card-tag">{tag}</div>
        <h2 className="card-title">{title}</h2>
        {product && (
          <div className="card-price">${product.price}</div>
        )}
        <a href="#" className="card-link">
          Shop Now
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
}

function Hero() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await apiService.getBanners();
        setBanners(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch banners:', error);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const mainBanner = Array.isArray(banners) ? banners.find(b => b.position === 0) : null;
  const sideBanners = Array.isArray(banners) ? banners.filter(b => b.position > 0 && b.position <= 2) : [];

  return (
    <section className="hero-section">
      <div className="main-hero">
        {loading ? (
          <div className="hero-content skeleton">
            <div className="hero-tag skeleton-box"></div>
            <h1 className="hero-title skeleton-box"></h1>
            <p className="hero-subtitle skeleton-box"></p>
            <button className="hero-btn skeleton-box"></button>
          </div>
        ) : mainBanner?.product ? (
          <div className="hero-content">
            <div className="hero-tag">FEATURED PRODUCT</div>
            <h1 className="hero-title">{mainBanner.product.title}</h1>
            <p className="hero-subtitle">{mainBanner.product.description?.substring(0, 100)}...</p>
            <button className="hero-btn">SHOP NOW</button>
          </div>
        ) : (
          <div className="hero-content">
            <div className="hero-tag">ZIMBABWE SOFTWARE</div>
            <h1 className="hero-title">Digital Solutions for Zimbabwean Businesses</h1>
            <p className="hero-subtitle">Empowering local businesses with cutting-edge software solutions</p>
            <button className="hero-btn">EXPLORE SOLUTIONS</button>
          </div>
        )}
        
        <SliderControls />
      </div>
      
      <div className="side-cards">
        {loading ? (
          <>
            <div className="side-card skeleton">
              <div className="skeleton-box"></div>
            </div>
            <div className="side-card skeleton">
              <div className="skeleton-box"></div>
            </div>
          </>
        ) : sideBanners.length > 0 ? (
          sideBanners.map((banner) => (
            <SideCard 
              key={banner.id}
              tag="NEW ARRIVALS"
              title={banner.product.title}
              product={banner.product}
              gradient="linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
            />
          ))
        ) : (
          <>
            <SideCard 
              tag="POPULAR"
              title="Accounting Suite"
              product={{ price: "299" }}
              gradient="linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
            />
            <SideCard 
              tag="NEW"
              title="Business CRM"
              product={{ price: "199" }}
              gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
            />
          </>
        )}
      </div>
    </section>
  );
}

export default Hero;
