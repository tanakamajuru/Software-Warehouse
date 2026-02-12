function PolicySection() {
  const policies = [
    {
      icon: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/09/policy-icon-1.svg',
      title: 'FREE US DELIVERY',
      desc: 'For US customers (including Alaska and Hawaii) or orders over $200'
    },
    {
      icon: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/09/policy-icon-2.svg',
      title: 'Secure payment',
      desc: 'We accept Visa, American Express, Paypal, Payoneer Mastercard and Discover'
    },
    {
      icon: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/09/policy-icon-3.svg',
      title: '1 year warranty',
      desc: 'All of our products are made with care and covered for one year against manufacturing defects'
    },
    {
      icon: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/09/policy-icon-4.svg',
      title: 'Support 24/7',
      desc: 'Contact us 24 hours a day, 7 days a week Call Us: 0123-456-789'
    }
  ];

  return (
    <section className="policy-section">
      <div className="container">
        <div className="policy-grid">
          {policies.map((policy, index) => (
            <div key={index} className="policy-card">
              <div className="policy-icon">
                <img src={policy.icon} alt={policy.title} />
              </div>
              <div className="policy-content">
                <h3 className="policy-title">{policy.title}</h3>
                <p className="policy-desc">{policy.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PolicySection;
