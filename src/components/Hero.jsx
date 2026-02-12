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
function SideCard({ tag, title, gradient }) {
  return (
    <div className="side-card" style={{ background: gradient }}>
      <div>
        <div className="card-tag">{tag}</div>
        <h2 className="card-title">{title}</h2>
        <a href="#" className="card-link">
          Shop Now
          <ArrowRightIcon />
        </a>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero-section">
      <div className="main-hero">
        <div className="hero-content">
          <div className="hero-tag">GAMING GEAR</div>
          <h1 className="hero-title">GAME CONTROLLER</h1>
          <p className="hero-subtitle">Controller Type: Wireless Controller</p>
          <button className="hero-btn">SHOP NOW</button>
        </div>
        
        <SliderControls />
      </div>
      
      <div className="side-cards">
        <SideCard 
          tag="NEW ARRIVALS"
          title="BAMBOOBUDS"
          gradient="linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)"
        />
        <SideCard 
          tag="NEW ARRIVALS"
          title="HOMEPOD PRO"
          gradient="linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
        />
      </div>
    </section>
  );
}

export default Hero;
