function CategoryCarousel() {
  const categories = [
    { icon: '📱', name: 'Tablet' },
    { icon: '📱', name: 'Smartphone' },
    { icon: '🎮', name: 'Game Console' },
    { icon: '📷', name: 'Camera' },
    { icon: '⌚', name: 'Smartwatch' },
    { icon: '🚁', name: 'Drone & Flycam' },
    { icon: '🎧', name: 'Audio' },
    { icon: '💻', name: 'Computer' },
  ];

  return (
    <div className="category-section">
      <div className="category-grid">
        {categories.map((category, index) => (
          <div key={index} className="category-item">
            <div className="category-icon">{category.icon}</div>
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryCarousel;
