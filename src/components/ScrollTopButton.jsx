import React from 'react';

function ScrollTopButton({ onClick }) {
  return (
    <div className="scroll-top" onClick={onClick}>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </div>
  );
}

export default ScrollTopButton;
