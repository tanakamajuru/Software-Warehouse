import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-about">
        <div className="container">
          <h3 className="footer-about-title">Explore Our E-Commerce Store</h3>
          <p className="footer-about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quam risus lacus risus posuere quis hendrerit vestibulum ut sagittis sit amet tortor. Mauris mauris lectus, ornare vel erat non, imperdiet consectetur leo. Nulla non turpis eget ligula ullamcorper tincidunt eget ac orci.
          </p>
          <p className="footer-about-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis tincidunt mi at sagittis. Cras dui justo, tristique a posuere a, dapibus in quam.
          </p>
        </div>
      </div>

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col">
              <div className="footer-logo">
                <img src="https://ecommax.risingbamboo.com/wp-content/themes/ecommax/dist/images/logo/dark.png" alt="Ecommax" />
              </div>
              <p className="footer-desc">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quam risus lacus risus posuere quis hendrerit vestibulum.
              </p>
              <div className="footer-social">
                <h4 className="footer-social-title">Follow Us:</h4>
                <div className="social-links">
                  <a href="#" className="social-link"><Facebook size={18} /></a>
                  <a href="#" className="social-link"><Twitter size={18} /></a>
                  <a href="#" className="social-link"><Instagram size={18} /></a>
                  <a href="#" className="social-link"><Youtube size={18} /></a>
                </div>
              </div>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">CUSTOMER CARE</h4>
              <ul className="footer-links">
                <li><a href="#faqs">FAQs</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#gift">Gift Card</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">HELP & SUPPORT</h4>
              <ul className="footer-links">
                <li><a href="#shipping">Shipping Info</a></li>
                <li><a href="#returns">Returns</a></li>
                <li><a href="#order">How To Order</a></li>
                <li><a href="#track">How To Track</a></li>
                <li><a href="#size">Size Guide</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">COMPANY INFO</h4>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#blog">Our Blog</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#stores">Store Locations</a></li>
                <li><a href="#testimonial">Testimonial</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">Our Shop</h4>
              <ul className="footer-links">
                <li><a href="#gaming">Gaming Gear</a></li>
                <li><a href="#electronics">Electronics</a></li>
                <li><a href="#appliance">Home Appliance</a></li>
                <li><a href="#audio">Audio</a></li>
                <li><a href="#smartphone">Smartphone</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4 className="footer-title">MY ACCOUNT</h4>
              <ul className="footer-links">
                <li><a href="#login">Login</a></li>
                <li><a href="#register">Register</a></li>
                <li><a href="#wishlist">Wishlist</a></li>
                <li><a href="#track-order">Track Your Orders</a></li>
                <li><a href="#checkout">Checkout</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              Copyright © 2026 <a href="https://risingbamboo.com/">RisingBamboo.</a> All Rights Reserved.
            </p>
            <div className="footer-contact">
              <div className="footer-contact-item">
                <MapPin size={16} />
                <span>15 West 21th Street, Miami FL, USA</span>
              </div>
              <div className="footer-contact-item">
                <Phone size={16} />
                <span>+123-456-789</span>
              </div>
              <div className="footer-contact-item">
                <Mail size={16} />
                <span>info@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
