import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryCarousel from './components/CategoryCarousel';
import PolicySection from './components/PolicySection';
import PromoGrid from './components/PromoGrid';
import ProductSection from './components/ProductSection';
import AudioSection from './components/AudioSection';
import TestimonialSection from './components/TestimonialSection';
import SmartWatchSection from './components/SmartWatchSection';
import BlogSection from './components/BlogSection';
import Footer from './components/Footer';
import NewsletterPopup from './components/NewsletterPopup';
import ScrollTopButton from './components/ScrollTopButton';
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
    <div className="app">
      <NewsletterPopup show={showPopup} onClose={() => setShowPopup(false)} />
      <Header isScrolled={isNavScrolled} />
      <Hero />
      <CategoryCarousel />
      <PolicySection />
      <PromoGrid />
      <ProductSection />
      <AudioSection />
      <SmartWatchSection />
      <BlogSection />
      <TestimonialSection />
      <Footer />
      <ScrollTopButton onClick={scrollToTop} />
    </div>
  );
}

export default App;
