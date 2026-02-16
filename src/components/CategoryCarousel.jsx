import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

function CategoryCarousel() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await apiService.getCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to fetch categories:', err);
        setError(err.message);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="category-section">
        <div className="category-grid">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="category-item skeleton">
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
      <div className="category-section">
        <div className="error-message">Failed to load categories: {error}</div>
      </div>
    );
  }

  // Fallback categories for Zimbabwe software market
  const fallbackCategories = [
    { id: '1', name: 'Accounting Software', image: null },
    { id: '2', name: 'Business Management', image: null },
    { id: '3', name: 'Educational Software', image: null },
    { id: '4', name: 'Security Software', image: null },
    { id: '5', name: 'Cloud Solutions', image: null },
    { id: '6', name: 'Mobile Apps', image: null },
    { id: '7', name: 'Website Builders', image: null },
    { id: '8', name: 'CRM Systems', image: null },
  ];

  const displayCategories = categories.length > 0 ? categories : fallbackCategories;

  return (
    <div className="category-section">
      <div className="category-grid">
        {displayCategories.map((category) => (
          <div key={category.id} className="category-item">
            {category.image ? (
              <img 
                src={category.image} 
                alt={category.name}
                className="category-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="category-icon" style={{ display: category.image ? 'none' : 'flex' }}>
              {category.name.charAt(0).toUpperCase()}
            </div>
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryCarousel;
