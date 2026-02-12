import { ShoppingCart, Search, Heart, ChevronDown, Menu, Phone, Mail } from 'lucide-react';

function Header() {
  return (
    <header className="header">
      <div className="top-bar">
        <div className="container">
          <div className="top-bar-content">
            <div className="contact-info">
              <a href="mailto:example@domain.com" className="contact-item">
                <Mail size={16} />
                <span>example@domain.com</span>
              </a>
              <a href="tel:+123456789" className="contact-item">
                <Phone size={16} />
                <span>+(123)-456-789</span>
              </a>
            </div>
            <div className="top-links">
              <a href="#deals">Hot Deals</a>
              <a href="#track">Track Your Order</a>
              <a href="#store">Store Locator</a>
            </div>
          </div>
        </div>
      </div>

      <div className="main-header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src="https://ecommax.risingbamboo.com/wp-content/themes/ecommax/dist/images/logo/dark.png" alt="Ecommax" />
            </div>

            <div className="search-bar">
              <input type="text" placeholder="Enter Your Keywords" />
              <button className="search-btn">
                <Search size={20} />
              </button>
            </div>

            <div className="header-actions">
              <button className="icon-btn">
                <Heart size={22} />
                <span className="badge">0</span>
              </button>
              <button className="icon-btn cart-btn">
                <ShoppingCart size={22} />
                <span className="badge">0</span>
                <span className="cart-text">$0.00</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <nav className="main-nav">
        <div className="container">
          <button className="shop-btn">
            <Menu size={20} />
            <span>Shop Now</span>
          </button>
          <ul className="nav-menu">
            <li><a href="#home">Home Appliance <ChevronDown size={16} /></a></li>
            <li><a href="#gaming">Gaming Gears <ChevronDown size={16} /></a></li>
            <li><a href="#computers">Computers & Laptop <ChevronDown size={16} /></a></li>
            <li><a href="#smartphone">SmartPhone & Tablet <ChevronDown size={16} /></a></li>
            <li><a href="#audio">Audio Gears <ChevronDown size={16} /></a></li>
            <li><a href="#cameras">Cameras <ChevronDown size={16} /></a></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
