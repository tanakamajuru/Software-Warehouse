function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-main">
            <div className="hero-content">
              <span className="hero-category">Gaming gear</span>
              <h1 className="hero-title">Game controller</h1>
              <p className="hero-subtitle">Controller type: Wireless controller</p>
              <button className="btn btn-primary">Shop Now</button>
            </div>
          </div>

          <div className="hero-secondary">
            <div className="promo-card promo-card-purple">
              <div className="promo-content">
                <span className="promo-category">Sound & Audio</span>
                <h2 className="promo-title">Bose Headphone</h2>
                <p className="promo-subtitle">Wireless Noise Cancelling</p>
                <button className="btn btn-light">Shop Now</button>
              </div>
            </div>

            <div className="promo-card promo-card-dark">
              <div className="promo-content">
                <span className="promo-category">virtual glasses</span>
                <h2 className="promo-title">Apple Vision</h2>
                <p className="promo-subtitle">A new dimension for entertainment.</p>
                <button className="btn btn-light">Shop Now</button>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="product-card">
            <span className="product-badge">New Arrivals</span>
            <h3 className="product-name">BambooBuds</h3>
            <button className="btn btn-secondary">Shop Now</button>
          </div>

          <div className="product-card">
            <span className="product-badge">New Arrivals</span>
            <h3 className="product-name">Homepod pro</h3>
            <button className="btn btn-secondary">Shop Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
