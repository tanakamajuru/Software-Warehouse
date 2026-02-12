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
import './App.css';

function App() {
  return (
    <div className="app">
      <Header />
      <Hero />
      <CategoryCarousel />
      <PolicySection />
      <PromoGrid />
      <ProductSection />
      <AudioSection />
      <TestimonialSection />
      <SmartWatchSection />
      <BlogSection />
      <Footer />
    </div>
  );
}

export default App;
