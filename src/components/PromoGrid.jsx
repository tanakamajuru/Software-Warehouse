function PromoGrid() {
  const promos = [
    { title: 'MACBOOK PRO 16', subtitle: '2K Fullview Touch Display', gradient: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)' },
    { title: 'SMART SPEAKER', subtitle: 'Dual-Speaker True sound', gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' },
    { title: 'BAMBOO SPEAKER', subtitle: 'Sound that Speaks for itself', gradient: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)' }
  ];

  return (
    <div className="promo-section">
      {promos.map((promo, index) => (
        <div key={index} className="promo-card" style={{ background: promo.gradient }}>
          <div>
            <div className="promo-title">{promo.title}</div>
            <div className="promo-subtitle">{promo.subtitle}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PromoGrid;
