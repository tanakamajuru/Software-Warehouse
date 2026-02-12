import React from 'react';

// Icon Components
const TruckIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const CreditCardIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const HeadphonesIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
);

function PolicySection() {
  const features = [
    {
      icon: <TruckIcon />,
      title: 'FREE US DELIVERY',
      text: 'For US customers (including Alaska and Hawaii) or orders over $200'
    },
    {
      icon: <CreditCardIcon />,
      title: 'SECURE PAYMENT',
      text: 'We accept Visa, American Express, Paypal, Payoneer Mastercard and Discover'
    },
    {
      icon: <ShieldIcon />,
      title: '1 YEAR WARRANTY',
      text: 'All of our products are made with care and covered for one year against manufacturing defects'
    },
    {
      icon: <HeadphonesIcon />,
      title: 'SUPPORT 24/7',
      text: 'Contact us 24 hours a day, 7 days a week\nCall Us: 0123-456-789'
    }
  ];

  return (
    <div className="features-section">
      {features.map((feature, index) => (
        <div key={index} className="feature-item">
          <div className="feature-icon">{feature.icon}</div>
          <div className="feature-title">{feature.title}</div>
          <div className="feature-text">{feature.text}</div>
        </div>
      ))}
    </div>
  );
}

export default PolicySection;
