import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

// Add Poppins font
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, totalItems, subtotal, tax, shipping, totalPrice, clearCart } = useCart();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    country: 'Vietnam',
    streetAddress: '',
    apartment: '',
    postcode: '',
    city: '',
    phone: '',
    email: '',
    createAccount: false,
    shipToDifferent: false,
    orderNotes: '',
    shippingMethod: 'flat',
    paymentMethod: 'bank',
    termsAccepted: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      alert('Please accept terms and conditions');
      return;
    }
    
    // Process order
    console.log('Order placed:', { formData, items, total: totalPrice });
    alert('Order placed successfully!');
    clearCart();
    navigate('/');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button 
            onClick={() => navigate('/shop')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Header />
      
      {/* HERO BANNER */}
      <div className="hero-banner">
        <div className="hero-content">
          <h1>Checkout</h1>
          <div className="breadcrumb">
            <span>Home</span>
            <span className="sep">›</span>
            <span>Checkout</span>
          </div>
        </div>
      </div>

      {/* PAGE CONTENT */}
      <div className="page-content">
        {/* Notice Bars */}
        <div className="notice-bars">
          <div className="notice-bar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
              <circle cx="12" cy="7" r="4"/>
            </svg>
            Returning customer? <a href="#">CLICK HERE TO LOGIN</a>
          </div>
          <div className="notice-bar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            Have a coupon? <a href="#">CLICK HERE TO ENTER YOUR CODE</a>
          </div>
        </div>

        {/* Checkout Grid */}
        <div className="checkout-grid">
          {/* BILLING DETAILS */}
          <div className="billing-section">
            <h2>Billing Details</h2>

            <div className="form-group">
              <Label htmlFor="firstName">First name <span>*</span></Label>
              <Input 
                id="firstName"
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <Label htmlFor="lastName">Last name <span>*</span></Label>
              <Input 
                id="lastName"
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <Label htmlFor="company">Company name (optional)</Label>
              <Input 
                id="company"
                type="text" 
                name="company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <Label htmlFor="country">Country / Region <span>*</span></Label>
              <Select 
                name="country"
                value={formData.country}
                onValueChange={(value) => setFormData(prev => ({ ...prev, country: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Vietnam">Vietnam</SelectItem>
                  <SelectItem value="United States">United States</SelectItem>
                  <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                  <SelectItem value="Australia">Australia</SelectItem>
                  <SelectItem value="Canada">Canada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="form-group">
              <Label htmlFor="streetAddress">Street address <span>*</span></Label>
              <Input 
                id="streetAddress"
                type="text" 
                name="streetAddress"
                value={formData.streetAddress}
                onChange={handleInputChange}
                placeholder="House number and street name"
                required
              />
            </div>

            <div className="form-group">
              <Label htmlFor="apartment">Apartment, suite, unit, etc. (optional)</Label>
              <Input 
                id="apartment"
                type="text" 
                name="apartment"
                value={formData.apartment}
                onChange={handleInputChange}
                placeholder="Apartment, suite, unit, etc. (optional)"
              />
            </div>

            <div className="form-group">
              <Label htmlFor="postcode">Postcode / ZIP (optional)</Label>
              <Input 
                id="postcode"
                type="text" 
                name="postcode"
                value={formData.postcode}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <Label htmlFor="city">Town / City <span>*</span></Label>
              <Input 
                id="city"
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <Label htmlFor="phone">Phone <span>*</span></Label>
              <Input 
                id="phone"
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <Label htmlFor="email">Email address <span>*</span></Label>
              <Input 
                id="email"
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <div className="checkbox-row">
                <Checkbox 
                  id="createAccount"
                  name="createAccount"
                  checked={formData.createAccount}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, createAccount: checked }))}
                />
                <Label htmlFor="createAccount">Create an account?</Label>
              </div>
            </div>

            <div className="form-group">
              <div className="checkbox-row">
                <Checkbox 
                  id="shipToDifferent"
                  name="shipToDifferent"
                  checked={formData.shipToDifferent}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, shipToDifferent: checked }))}
                />
                <Label htmlFor="shipToDifferent">Ship to a different address?</Label>
              </div>
            </div>

            <div className="form-group">
              <Label htmlFor="orderNotes">Order notes (optional)</Label>
              <Textarea 
                id="orderNotes"
                name="orderNotes"
                value={formData.orderNotes}
                onChange={handleInputChange}
                placeholder="Notes about your order, e.g. special notes for delivery."
              />
            </div>
          </div>

          {/* ORDER SUMMARY */}
          <div className="order-summary">
            <h2>Your Order</h2>
            <table className="order-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => (
                  <tr key={item.id}>
                    <td>{item.title} <span className="product-qty">× {item.quantity}</span></td>
                    <td>${(parseFloat(item.price) * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
                <tr className="order-row-subtotal">
                  <td>Subtotal</td>
                  <td>${subtotal.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>

            <div className="shipping-section">
              <p>Shipping</p>
              <label className="shipping-option">
                <input 
                  type="radio" 
                  name="shippingMethod"
                  value="flat"
                  checked={formData.shippingMethod === 'flat'}
                  onChange={handleInputChange}
                /> Flat rate: ${shipping.toFixed(2)}
              </label>
              <label className="shipping-option">
                <input 
                  type="radio" 
                  name="shippingMethod"
                  value="pickup"
                  checked={formData.shippingMethod === 'pickup'}
                  onChange={handleInputChange}
                /> Local pickup: $30.00
              </label>
            </div>

            <div className="total-row">
              <span className="total-label">Total</span>
              <span className="total-amount">${totalPrice.toFixed(2)}</span>
            </div>

            {/* Payment Methods */}
            <div className="payment-methods">
              <div className="payment-option">
                <div className="payment-option-header">
                  <input 
                    type="radio" 
                    name="paymentMethod"
                    value="bank"
                    checked={formData.paymentMethod === 'bank'}
                    onChange={handleInputChange}
                  /> Direct bank transfer
                </div>
                <div className="payment-option-body">
                  Make your payment directly into our bank account. Please use your Order ID as payment reference. Your order will not be shipped until funds have cleared in our account.
                </div>
              </div>
              <div className="payment-option">
                <div className="payment-option-header">
                  <input 
                    type="radio" 
                    name="paymentMethod"
                    value="check"
                    checked={formData.paymentMethod === 'check'}
                    onChange={handleInputChange}
                  /> Check payments
                </div>
              </div>
              <div className="payment-option">
                <div className="payment-option-header">
                  <input 
                    type="radio" 
                    name="paymentMethod"
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleInputChange}
                  /> Cash on delivery
                </div>
              </div>
            </div>

            <p className="privacy-note">
              Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a href="#">privacy policy</a>.
            </p>

            <div className="terms-check">
              <Checkbox 
                id="termsAccepted"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, termsAccepted: checked }))}
              />
              <Label htmlFor="termsAccepted">I have read and agree to website <a href="#">terms and conditions</a> *</Label>
            </div>

            <Button className="btn-place-order" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </div>
        </div>
      </div>

      <style jsx>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Poppins', sans-serif; font-size: 13px; color: #333; background: #fff; }
        a { text-decoration: none; color: inherit; }

        /* ========== HERO BANNER ========== */
        .hero-banner {
          background: #f0f0f0;
          min-height: 130px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .hero-content {
          position: relative;
          z-index: 1;
          text-align: center;
        }
        .hero-content h1 {
          font-size: 22px;
          font-weight: 700;
          letter-spacing: 2px;
          color: #222;
          text-transform: uppercase;
          margin-bottom: 6px;
        }
        .breadcrumb {
          font-size: 12px;
          color: #777;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .breadcrumb span { color: #555; }
        .breadcrumb .sep { color: #aaa; }

        /* ========== PAGE CONTENT ========== */
        .page-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        /* ========== NOTICE BARS ========== */
        .notice-bars {
          display: flex;
          gap: 20px;
          margin-bottom: 40px;
        }
        .notice-bar {
          flex: 1;
          background: #f8f8f8;
          border: 1px solid #e5e5e5;
          padding: 15px 20px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 12px;
          color: #666;
        }
        .notice-bar a { color: #3b9fe8; }
        .notice-bar a:hover { text-decoration: underline; }

        /* ========== CHECKOUT GRID ========== */
        .checkout-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 60px;
        }

        /* ========== BILLING SECTION ========== */
        .billing-section h2 {
          font-size: 18px;
          font-weight: 600;
          color: #222;
          margin-bottom: 25px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e5e5;
        }

        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          font-size: 13px;
          font-weight: 500;
          color: #333;
          margin-bottom: 8px;
        }
        .form-group label span { color: #e74c3c; }
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 13px;
          font-family: 'Poppins', sans-serif;
          transition: border-color 0.3s;
        }
        .form-group input:focus,
        .form-group select:focus {
          outline: none;
          border-color: #3b9fe8;
        }
        .street-inputs {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .form-group textarea {
          width: 100%;
          padding: 12px 15px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 13px;
          font-family: 'Poppins', sans-serif;
          resize: vertical;
          min-height: 100px;
        }
        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        .checkbox-row input[type="checkbox"] {
          width: auto;
          margin: 0;
        }
        .checkbox-row label {
          margin: 0;
          font-weight: 400;
        }

        /* ========== ORDER SUMMARY ========== */
        .order-summary {
          background: #f8f8f8;
          padding: 30px;
          border-radius: 8px;
        }
        .order-summary h3 {
          font-size: 18px;
          font-weight: 600;
          color: #222;
          margin-bottom: 25px;
          padding-bottom: 10px;
          border-bottom: 1px solid #e5e5e5;
        }
        .order-table {
          margin-bottom: 25px;
        }
        .order-table table {
          width: 100%;
          border-collapse: collapse;
        }
        .order-table td {
          padding: 12px 0;
          border-bottom: 1px solid #e5e5e5;
          font-size: 13px;
        }
        .order-table td:first-child {
          color: #666;
        }
        .order-table td:last-child {
          text-align: right;
          font-weight: 500;
        }
        .cart-subtotal {
          margin-bottom: 20px;
        }
        .cart-subtotal table {
          width: 100%;
          border-collapse: collapse;
        }
        .cart-subtotal td {
          padding: 10px 0;
          font-size: 13px;
        }
        .cart-subtotal td:first-child {
          color: #666;
        }
        .cart-subtotal td:last-child {
          text-align: right;
          font-weight: 500;
        }
        .cart-subtotal tr:last-child td {
          padding-top: 15px;
          border-top: 1px solid #e5e5e5;
          font-weight: 600;
          color: #222;
        }
        .shipping-methods {
          margin-bottom: 25px;
        }
        .shipping-methods h4 {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 15px;
        }
        .shipping-option {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          padding: 12px;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .shipping-option:hover {
          border-color: #3b9fe8;
        }
        .shipping-option input[type="radio"] {
          width: auto;
          margin: 0;
        }
        .payment-methods {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .payment-option-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .payment-methods h4 {
          font-size: 14px;
          font-weight: 600;
          color: #222;
          margin-bottom: 15px;
        }
        .payment-option {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
          padding: 12px;
          background: #fff;
          border: 1px solid #e5e5e5;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.3s;
        }
        .payment-option:hover {
          border-color: #3b9fe8;
        }
        .payment-option input[type="radio"] {
          width: auto;
          margin: 0;
        }
        .privacy-note {
          font-size: 11px;
          color: #888;
          line-height: 1.5;
          margin-bottom: 20px;
        }
        .privacy-note a {
          color: #3b9fe8;
        }
        .terms-check {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 25px;
        }
        .terms-check input[type="checkbox"] {
          width: auto;
          margin: 0;
          margin-top: 2px;
        }
        .terms-check label {
          margin: 0;
          font-size: 12px;
          line-height: 1.4;
        }
        .terms-check a {
          color: #3b9fe8;
        }
        .btn-place-order {
          display: block;
          width: 100%;
          background: #3b9fe8;
          color: #fff;
          border: none;
          padding: 15px;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: background 0.3s;
          border-radius: 4px;
        }
        .btn-place-order:hover {
          background: #2a8fd8;
        }

        /* ========== RESPONSIVE ========== */
        @media (max-width: 1024px) {
          .checkout-grid { grid-template-columns: 1fr; gap: 40px; }
          .order-summary { max-width: 600px; margin: 0 auto; }
        }
        @media (max-width: 768px) {
          .notice-bars { flex-direction: column; }
          .page-content { padding: 20px 15px; }
          .checkout-grid { gap: 30px; }
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default CheckoutPage;
