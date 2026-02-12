function PromoGrid() {
  return (
    <section className="promo-grid">
      <div className="container">
        <div className="promo-grid-layout">
          <div className="promo-banner promo-banner-macbook">
            <div className="promo-banner-content">
              <h3 className="promo-banner-title">Macbook Pro 16</h3>
              <p className="promo-banner-subtitle">2K Fullview Touch Display</p>
            </div>
          </div>

          <div className="promo-banner promo-banner-speaker">
            <div className="promo-banner-content">
              <h3 className="promo-banner-title">Smart speaker</h3>
              <p className="promo-banner-subtitle">Dual-Speaker True sound</p>
            </div>
          </div>

          <div className="promo-banner promo-banner-bamboo">
            <div className="promo-banner-content">
              <h3 className="promo-banner-title">Bamboo Speaker</h3>
              <p className="promo-banner-subtitle">Sound that Speaks for itself</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PromoGrid;
