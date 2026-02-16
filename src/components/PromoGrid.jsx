function PromoGrid() {
  const promos = [
    { title: 'Business Suite Pro', subtitle: 'Complete management solution for SMEs', gradient: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)' },
    { title: 'School Management', subtitle: 'Digital solutions for Zimbabwean schools', gradient: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)' },
    { title: 'Accounting Plus', subtitle: 'ZIMRA-compliant accounting software', gradient: 'linear-gradient(135deg, #dbeafe 0%, #e0f2fe 100%)' }
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
