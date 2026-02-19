import React from 'react';
import { Settings, User, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import CartContext from '../contexts/CartContext';
import CartDrawer from './CartDrawer';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price) => {
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return '0.00';
  return numPrice.toFixed(2);
};

// Icon Components
const MenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const HeartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CartIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const ShoppingBagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const LightningIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const FireIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Top Header Component
function TopHeader({ onCartClick }) {
  const { user, logout } = useAuth();
  const { totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate('/');
    } else {
      navigate('/auth/login');
    }
  };

  const handleCartClick = () => {
    onCartClick();
  };

  return (
    <div className="top-header">
      <div className="logo">
        <div className="logo-icon">S</div>
        <div className="logo-text"><span style={{color: '#0ea5e9'}}>S</span>oftware Warehouse</div>
      </div>
      
      <div className="header-center">
        <button className="shop-now-btn">
          <MenuIcon />
          SHOP NOW
        </button>
        
        <div className="search-box">
          <input type="text" placeholder="ENTER YOUR KEYWORD" className="search-input" />
          <div className="search-icon">
            <SearchIcon />
          </div>
        </div>
      </div>
      
      <div className="header-actions">
        {/* Admin Access - Only show for admin users */}
        {user && (
          <>
            <div 
              className="icon-btn" 
              onClick={() => navigate('/admin')} 
              style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #ccc', padding: '5px'}} 
              title="Admin Dashboard"
            >
              <Shield size={20} color="#666" />
            </div>

          </>
        )}
        
        {/* User Account */}
        <div className="icon-btn" onClick={handleAuthClick} style={{cursor: 'pointer'}} title={user ? "My Account" : "Sign In"}>
          <User />
        </div>
        
        <div className="icon-btn">
          <HeartIcon />
        </div>
        
        <div className="icon-btn" onClick={handleCartClick} style={{cursor: 'pointer'}} title="Shopping Cart">
          <CartIcon />
          <span className="badge">{totalItems}</span>
        </div>
        
        <div className="cart-btn" onClick={handleCartClick} style={{cursor: 'pointer'}} title="Shopping Cart">
          <ShoppingBagIcon />
          {formatPrice(totalPrice)}
        </div>
        
        <div className="icon-btn">
          <Settings />
        </div>
      </div>
    </div>
  );
}

// Trending Bar Component
function TrendingBar() {
  const trends = ['Audio Apps', 'Business Systems', 'Mobile Solutions', 'Smart Tools'];
  
  return (
    <div className="trending-bar">
      <div className="trending-label">
        <LightningIcon />
        SEARCH TRENDING:
      </div>
      <div className="trending-links">
        {trends.map((trend, index) => (
          <a key={index} href="#" className="trending-link">{trend}</a>
        ))}
      </div>
    </div>
  );
}

// Main Navigation Component
function MainNav({ isScrolled }) {
  const navigate = useNavigate();
  const { totalItems, totalPrice } = useCart();
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
    onCartClick();
  };

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop' },
    { name: 'PRODUCT', path: '/products' }
  ];
  
  return (
    <nav className={`main-nav ${isScrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-links">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`nav-link ${index === 0 ? 'nav-link-active' : ''}`}
          >
            {item.name}
          </button>
        ))}
      </div>
      
      <div className="nav-right">
        <a href="#" className="nav-right-link">
          <FireIcon />
          Hot Deals
        </a>
        <a href="#" className="nav-right-link">
          <CheckIcon />
          Track Your Order
        </a>
        <a href="#" className="nav-right-link">
          <MapPinIcon />
          Store Locator
        </a>
      </div>
    </nav>
  );
}

function Header({ isScrolled }) {
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const handleCartClick = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <>
      <header className="header">
        <TopHeader onCartClick={handleCartClick} />
        <TrendingBar />
        <MainNav isScrolled={isScrolled} onCartClick={handleCartClick} />
        {isScrolled && <CompactNav onCartClick={handleCartClick} />}
      </header>
      <CartDrawer isOpen={isCartOpen} onClose={handleCartClose} />
    </>
  );
}

// Compact Navigation for Scrolled State
function CompactNav({ onCartClick }) {
  const { user, logout } = useAuth();
  const { totalItems, totalPrice } = useCart();
  const navigate = useNavigate();

  const handleAuthClick = () => {
    if (user) {
      logout();
      navigate('/');
    } else {
      navigate('/auth/login');
    }
  };

  const handleCartClick = () => {
    onCartClick();
  };

  return (
    <div className="compact-nav">
      <div className="compact-logo">
        <div className="logo-icon">S</div>
        <div className="logo-text"><span style={{color: '#0ea5e9'}}>S</span>oftware Warehouse</div>
      </div>
      
      <div className="compact-nav-links">
        <button onClick={() => navigate('/')} className="nav-link nav-link-active">HOME</button>
        <button onClick={() => navigate('/shop')} className="nav-link">SHOP</button>
        <button onClick={() => navigate('/products')} className="nav-link">PRODUCT</button>
      </div>
      
      <div className="compact-actions">
        {/* Admin Access - Only show for admin users */}
        {user && (
          <div 
            className="icon-btn" 
            onClick={() => navigate('/admin')} 
            style={{cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'}} 
            title="Admin Dashboard"
          >
            <Shield size={20} color="#666" />
          </div>
        )}
        
        {/* User Account */}
        <div className="icon-btn" onClick={handleAuthClick} style={{cursor: 'pointer'}} title={user ? "My Account" : "Sign In"}>
          <User />
        </div>
        
        <div className="icon-btn">
          <HeartIcon />
        </div>
        
        <div className="icon-btn" onClick={handleCartClick} style={{cursor: 'pointer'}} title="Shopping Cart">
          <CartIcon />
          <span className="badge">{totalItems}</span>
        </div>
        
        <div className="icon-btn">
          <Settings />
        </div>
      </div>
    </div>
  );
}

export default Header;
