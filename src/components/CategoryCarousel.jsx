import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiService from '../services/api';

function CategoryCarousel() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiService.getCategories();
        console.log('Raw categories response:', data); // Debug raw response
        
        // Handle different response formats
        let categoriesArray = [];
        if (Array.isArray(data)) {
          categoriesArray = data;
        } else if (data && data.data && Array.isArray(data.data)) {
          categoriesArray = data.data;
        } else if (data && data.success && data.data && Array.isArray(data.data)) {
          categoriesArray = data.data;
        }
        
        console.log('Processed categories array:', categoriesArray); // Debug processed array
        console.log('Number of categories:', categoriesArray.length); // Debug count
        
        // Map API categories to include icons
        const iconMap = {
          'processors': '💻',
          'graphics-cards': '🎮',
          'storage': '💾',
          'memory': '🧠',
          'software': '💿',
          'peripherals': '⌨️'
        };
        
        const mappedCategories = categoriesArray.map(category => ({
          ...category,
          icon: iconMap[category.slug] || '📦'
        }));
        
        console.log('Mapped categories:', mappedCategories); // Debug log
        setCategories(mappedCategories);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err.message);
        // Fallback to hardcoded categories if API fails - include all 6
        setCategories([
          { id: '1', name: 'Processors', slug: 'processors', icon: '💻', image: null },
          { id: '2', name: 'Graphics Cards', slug: 'graphics-cards', icon: '🎮', image: null },
          { id: '3', name: 'Storage', slug: 'storage', icon: '💾', image: null },
          { id: '4', name: 'Memory', slug: 'memory', icon: '🧠', image: null },
          { id: '5', name: 'Software', slug: 'software', icon: '💿', image: null },
          { id: '6', name: 'Peripherals', slug: 'peripherals', icon: '⌨️', image: null },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    navigate(`/shop/category/${category.slug}`);
  };

  if (loading) {
    return (
      <div className="category-section container responsive-section">
        <div className="category-grid grid">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="category-item responsive-card skeleton">
              <div className="category-image skeleton-box"></div>
              <div className="category-icon skeleton-box"></div>
              <div className="category-name skeleton-box"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="category-section container responsive-section">
        <div className="error-message text-center">Failed to load categories: {error}</div>
      </div>
    );
  }

  return (
    <div className="category-section container responsive-section">
      <div className="category-grid grid">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="category-item responsive-card" 
            onClick={() => handleCategoryClick(category)}
            style={{ cursor: 'pointer' }}
          >
            {category.image ? (
              <img 
                src={category.image} 
                alt={category.name}
                className="category-image responsive-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="category-icon" style={{ display: category.image ? 'none' : 'flex' }}>
              {category.icon || category.name.charAt(0).toUpperCase()}
            </div>
            <div className="category-name text-responsive-base">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryCarousel;
