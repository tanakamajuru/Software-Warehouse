function CategoryCarousel() {
  const categories = [
    { name: 'Smartwatch', img: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/cat-5.png' },
    { name: 'Drone & Flycam', img: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/cat-6.png' },
    { name: 'Audio', img: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/cat7.png' },
    { name: 'Computer', img: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/cat-8.png' },
    { name: 'Earbuds', img: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/08/earpod.png' },
    { name: 'Bluetooth Speaker', img: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/08/bluetooth-speaker.png' },
    { name: 'Tablet', img: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/cat-1.png' },
    { name: 'Smartphone', img: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/cat-2.png' },
    { name: 'Game Console', img: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/cat-3.png' },
    { name: 'Camera', img: 'https://ecommax.risingbamboo.com/wp-content/uploads/2024/05/cat-4.png' },
  ];

  return (
    <section className="category-carousel">
      <div className="container">
        <div className="carousel-track">
          {categories.map((cat, index) => (
            <div key={index} className="category-item">
              <div className="category-icon">
                <img src={cat.img} alt={cat.name} />
              </div>
              <h4 className="category-name">{cat.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryCarousel;
