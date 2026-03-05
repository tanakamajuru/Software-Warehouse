import React, { useState, useEffect } from 'react';
import { Settings, User, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import CartContext from '../contexts/CartContext';
import apiService from '../services/api';
import CartDrawer from './CartDrawer';
import { useNavigate, useLocation } from 'react-router-dom';

const formatPrice = (price) => {
  const numPrice = parseFloat(price);
  if (isNaN(numPrice)) return '0.00';
  return numPrice.toFixed(2);
};

// Icon Components
const MenuIcon = ({ color = 'currentColor' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const SearchIcon = ({ color = '#9ca3af' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const HeartIcon = ({ color = 'currentColor' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CartIcon = ({ color = 'currentColor' }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <circle cx="9" cy="21" r="1" />
    <circle cx="20" cy="21" r="1" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

const ShoppingBagIcon = ({ color = 'currentColor' }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

const LightningIcon = ({ color = 'currentColor' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const FireIcon = ({ color = 'currentColor' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill={color}>
    <path d="M12.76 3.76a6 6 0 0 1 8.48 8.48l-8.53 8.54a1 1 0 0 1-1.42 0l-8.53-8.54a6 6 0 0 1 8.48-8.48l.76.75.76-.75z" />
  </svg>
);

const CheckIcon = ({ color = 'currentColor' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const MapPinIcon = ({ color = 'currentColor' }) => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

// Gradient style injected once
const GRADIENT_STYLE = `
  @keyframes BgGradient {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  .header-gradient {
    background: linear-gradient(
      90deg,
      #0d1b4b 0%,
      #1a1060 33.33%,
      #4a0080 66.67%,
      #6b0fa0 100%
    );
    background-size: 400% 400% !important;
    animation: BgGradient 6s linear infinite;
  }
  .shop-page-nav {
    color: #ffffff !important;
    text-shadow: 0 1px 2px rgba(0,0,0,0.3);
  }
  .shop-page-nav:hover {
    color: #e2e8f0 !important;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  }
  .shop-page-nav.nav-link-active {
    color: #ffffff !important;
    font-weight: 600;
    text-shadow: 0 1px 3px rgba(0,0,0,0.5);
  }
  .header-gradient .logo-text {
    color: #ffffff !important;
  }
  .header-gradient .logo-text span {
    color: #ffffff !important;
  }
  .header-gradient .logo-icon {
    color: #ffffff !important;
  }
  .header-gradient.main-nav {
    border-bottom: 1px solid transparent !important;
  }
  .header-gradient.trending-bar {
    border-top: 1px solid transparent !important;
    border-bottom: 1px solid transparent !important;
  }
  .header-gradient.compact-nav {
    border-bottom: 1px solid transparent !important;
  }
`;

// Top Header Component
function TopHeader({ onCartClick, isShopPage }) {
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

  return (
    <div className={`top-header ${isShopPage ? 'header-gradient' : ''}`}>
      <div className="logo">
        <div className="logo-icon" style={{ color: isShopPage ? '#ffffff' : '#000000' }}>S</div>
        <div className="logo-text">
          <span style={{ color: isShopPage ? '#ffffff' : '#0ea5e9' }}>S</span><span>oftware Warehouse</span>
        </div>
      </div>

      <div className="header-center">
        {!isShopPage && (
          <button className="shop-now-btn" style={{ color: isShopPage ? '#ffffff' : '#000000' }}>
            <MenuIcon color={isShopPage ? '#ffffff' : '#000000'} />
            SHOP NOW
          </button>
        )}

        <div className="search-box">
          <input 
            type="text" 
            placeholder="ENTER YOUR KEYWORD" 
            className="search-input"
            style={{ 
              color: isShopPage ? '#ffffff' : '#000000',
              backgroundColor: isShopPage ? 'rgba(255,255,255,0.1)' : '#ffffff',
              borderColor: isShopPage ? 'rgba(255,255,255,0.3)' : '#ccc'
            }}
          />
          <div className="search-icon">
            <SearchIcon color={isShopPage ? '#ffffff' : '#9ca3af'} />
          </div>
        </div>
      </div>

      <div className="header-actions">
        {user && (
          <div
            className="icon-btn"
            onClick={() => navigate('/admin')}
            style={{ 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              // border: `1px solid ${isShopPage ? 'rgba(255,255,255,0.5)' : '#ccc'}`, 
              padding: '5px' 
            }}
            title="Admin Dashboard"
          >
            {/* <Shield size={20} color={isShopPage ? '#ffffff' : '#666'} /> */}
          </div>
        )}

        <div className="icon-btn" onClick={handleAuthClick} style={{ cursor: 'pointer' }} title={user ? 'My Account' : 'Sign In'}>
          <User color={isShopPage ? '#ffffff' : '#374151'} />
        </div>

        <div className="icon-btn">
          <HeartIcon color={isShopPage ? '#ffffff' : '#374151'} />
        </div>

        <div className="icon-btn" onClick={onCartClick} style={{ cursor: 'pointer' }} title="Shopping Cart">
          <CartIcon color={isShopPage ? '#ffffff' : '#374151'} />
          <span className="badge" style={{ color: isShopPage ? '#ffffff' : '#374151', backgroundColor: isShopPage ? 'rgba(255,255,255,0.2)' : '#f3f4f6' }}>{totalItems}</span>
        </div>

        <div className="cart-btn" onClick={onCartClick} style={{ cursor: 'pointer', color: isShopPage ? '#ffffff' : '#000000' }} title="Shopping Cart">
          <ShoppingBagIcon color={isShopPage ? '#ffffff' : '#000000'} />
          {formatPrice(totalPrice)}
        </div>

        <div className="icon-btn">
          <Settings color={isShopPage ? '#ffffff' : '#374151'} />
        </div>
      </div>
    </div>
  );
}

// Trending Bar Component
function TrendingBar({ isShopPage }) {
  const [trendingProducts, setTrendingProducts] = useState([]);

  useEffect(() => {
    const fetchTrendingProducts = async () => {
      try {
        const data = await apiService.getTopBoughtProducts();
        const products = Array.isArray(data) ? data.slice(0, 4) : [];
        setTrendingProducts(products);
      } catch (error) {
        console.error('Failed to fetch trending products:', error);
        setTrendingProducts([]);
      }
    };
    fetchTrendingProducts();
  }, []);

  return (
    <div className={`trending-bar ${isShopPage ? 'header-gradient' : ''}`} style={{ 
      color: isShopPage ? '#ffffff' : '#000000', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      // borderTop: isShopPage ? '1px solid transparent' : '1px solid #e5e7eb',
      // borderBottom: isShopPage ? '1px solid transparent' : '1px solid #e5e7eb'
    }}>
      <div className="trending-label" style={{ color: isShopPage ? '#ffffff' : '#000000' }}>
        <LightningIcon color={isShopPage ? '#ffffff' : '#000000'} />
        SEARCH TRENDING:
      </div>
      <div className="trending-links">
        {trendingProducts.length > 0 ? (
          trendingProducts.map((product) => (
            <a key={product.id} href={`/product/${product.id}`} className="trending-link" style={{ color: isShopPage ? '#ffffff' : '#000000' }}>
              {product.title || product.name}
            </a>
          ))
        ) : (
          <span className="text-gray-400 text-xs" style={{ color: isShopPage ? 'rgba(255,255,255,0.6)' : '#9ca3af' }}>No trending products</span>
        )}
      </div>
    </div>
  );
}

// Main Navigation Component
function MainNav({ isScrolled, isShopPage }) {
  const navigate = useNavigate();

  const navItems = [
    { name: 'HOME', path: '/' },
    { name: 'SHOP', path: '/shop' },
    { name: 'PRODUCT', path: '/products' },
  ];

  return (
    <nav className={`main-nav ${isScrolled ? 'nav-scrolled' : ''} ${isShopPage ? 'header-gradient' : ''}`} style={{ borderBottom: isShopPage ? '1px solid transparent' : '1px solid #f0f0f0' }}>
      <div className="nav-links">
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => navigate(item.path)}
            className={`nav-link ${index === 0 ? 'nav-link-active' : ''} ${isShopPage ? 'shop-page-nav' : ''}`}
            style={{ color: isShopPage ? '#ffffff' : '#000000' }}
          >
            {item.name}
          </button>
        ))}
      </div>

      <div className="nav-right">
        <a href="#" className="nav-right-link" style={{ color: isShopPage ? '#ffffff' : '#000000' }}>
          <FireIcon color={isShopPage ? '#ffffff' : '#000000'} />
          Hot Deals
        </a>
        <a href="#" className="nav-right-link" style={{ color: isShopPage ? '#ffffff' : '#000000' }}>
          <CheckIcon color={isShopPage ? '#ffffff' : '#000000'} />
          Track Your Order
        </a>
        <a href="#" className="nav-right-link" style={{ color: isShopPage ? '#ffffff' : '#000000' }}>
          <MapPinIcon color={isShopPage ? '#ffffff' : '#000000'} />
          Store Locator
        </a>
      </div>
    </nav>
  );
}

// Compact Navigation for Scrolled State
function CompactNav({ onCartClick, isShopPage }) {
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

  return (
    <div className={`compact-nav ${isShopPage ? 'header-gradient' : ''}`} style={{ borderBottom: isShopPage ? '1px solid transparent' : '1px solid #e5e7eb' }}>
      <div className="compact-logo">
        <div className="logo-icon" style={{ color: isShopPage ? '#ffffff' : '#000000' }}>S</div>
        <div className="logo-text">
          <span style={{ color: isShopPage ? '#ffffff' : '#0ea5e9' }}>S</span><span>oftware Warehouse</span>
        </div>
      </div>

      <div className="compact-nav-links">
        <button onClick={() => navigate('/')} className={`nav-link nav-link-active ${isShopPage ? 'shop-page-nav' : ''}`}>HOME</button>
        <button onClick={() => navigate('/shop')} className={`nav-link ${isShopPage ? 'shop-page-nav' : ''}`}>SHOP</button>
        <button onClick={() => navigate('/products')} className={`nav-link ${isShopPage ? 'shop-page-nav' : ''}`}>PRODUCT</button>
      </div>

      <div className="compact-actions">

        {/* Admin Dashboard Button */}
        {user && (
          <div
            className="icon-btn"
            onClick={() => navigate('/admin')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px' }}
            title="Admin Dashboard"
          >
            {/* <Shield size={20} color={isShopPage ? '#ffffff' : '#666'} /> */}
          </div>
        )
        
        
        }

        <div className="icon-btn" onClick={handleAuthClick} style={{ cursor: 'pointer' }} title={user ? 'My Account' : 'Sign In'}>
          <User color={isShopPage ? '#ffffff' : '#374151'} />
        </div>

        <div className="icon-btn">
          <HeartIcon color={isShopPage ? '#ffffff' : '#374151'} />
        </div>

        <div className="icon-btn" onClick={onCartClick} style={{ cursor: 'pointer' }} title="Shopping Cart">
          <CartIcon color={isShopPage ? '#ffffff' : '#374151'} />
          <span className="badge" style={{ color: isShopPage ? '#ffffff' : '#374151', backgroundColor: isShopPage ? 'rgba(255,255,255,0.2)' : '#f3f4f6' }}>{totalItems}</span>
        </div>

        <div className="icon-btn">
          <Settings color={isShopPage ? '#ffffff' : '#374151'} />
        </div>
      </div>
    </div>
  );
}

function Header({ isScrolled }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const location = useLocation();

  // Apply gradient on /shop and any sub-routes like /shop/category
  const isShopPage = location.pathname.startsWith('/shop');

  return (
    <>
      {/* Inject gradient keyframes once */}
      <style>{GRADIENT_STYLE}</style>

      <header className="header">
        <TopHeader onCartClick={() => setIsCartOpen(true)} isShopPage={isShopPage} />
        <TrendingBar isShopPage={isShopPage} />
        <MainNav isScrolled={isScrolled} isShopPage={isShopPage} />
        {isScrolled && <CompactNav onCartClick={() => setIsCartOpen(true)} isShopPage={isShopPage} />}
      </header>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

export default Header;
