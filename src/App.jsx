import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryCarousel from './components/CategoryCarousel';
import PolicySection from './components/PolicySection';
import PromoGrid from './components/PromoGrid';
import TrendingProducts from './components/TrendingProducts';
import ProductSection from './components/ProductSection';
import SoftwareSolutions from './components/AudioSection';
import TestimonialSection from './components/TestimonialSection';
import BusinessSoftware from './components/SmartWatchSection';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import NewsletterPopup from './components/NewsletterPopup';
import ScrollTopButton from './components/ScrollTopButton';
import AuthPage from './components/auth/AuthPage';
import Admin from './pages/Admin';
import ShopPage from './pages/ShopPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import './App.css';

function App() {
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsNavScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    
    // Show popup after 2 seconds
    const timer = setTimeout(() => setShowPopup(true), 2000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="app">
          <Routes>
            <Route path="/auth/*" element={<AuthPage />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/product/:slug" element={<ProductPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/*" element={
              <>
                <NewsletterPopup show={showPopup} onClose={() => setShowPopup(false)} />
                <Header isScrolled={isNavScrolled} />
                <Hero />
                <CategoryCarousel />
                <PolicySection />
                <PromoGrid />
                <TrendingProducts />
                <ProductSection />
                <SoftwareSolutions />
                <BusinessSoftware />
                <BlogSection />
                <TestimonialSection />
                <Footer />
                <ScrollTopButton onClick={scrollToTop} />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  </AuthProvider>
  );
}

export default App;
