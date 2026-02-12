import { Star, Heart, Eye } from 'lucide-react';

function ProductSection() {
  const products = [
    {
      name: 'Nova A12 Factory Unlocked 4G/LTE Smartphone',
      price: '$286.00',
      priceRange: '$286.00 - $288.00',
      image: 'https://images.pexels.com/photos/34030071/pexels-photo-34030071.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      badge: 'New',
      stock: 96
    },
    {
      name: 'Original S24 Ultra 16GB 512GB Smartphone',
      price: '$156.00',
      image: 'https://images.pexels.com/photos/35147262/pexels-photo-35147262.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 91
    },
    {
      name: 'Smartphone Nova Mate 50 Pro Snapdragon 888',
      price: '$164.00',
      image: 'https://images.pexels.com/photos/35147149/pexels-photo-35147149.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 97
    },
    {
      name: 'Vinova 23 Triple Nascetur NFC Donec ROM Celulares',
      price: '$196.00',
      image: 'https://images.pexels.com/photos/34030071/pexels-photo-34030071.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 99
    },
    {
      name: 'Vinova Dolor Note 10 Battery 120W Fast Charging',
      price: '$350.00',
      image: 'https://images.pexels.com/photos/35147262/pexels-photo-35147262.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      badge: 'Hot',
      stock: 99
    },
    {
      name: 'Vinova Donec Fold 2 Smartphone Folding Screen',
      priceRange: '$350.00 - $500.00',
      image: 'https://images.pexels.com/photos/35147149/pexels-photo-35147149.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 100
    }
  ];

  return (
    <section className="product-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Top smartphone trends</h2>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <div key={index} className="product-card-wrapper">
              {product.badge && (
                <span className={`product-badge-top ${product.badge.toLowerCase()}`}>
                  {product.badge}
                </span>
              )}
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-actions">
                  <button className="action-btn">
                    <Heart size={18} />
                  </button>
                  <button className="action-btn">
                    <Eye size={18} />
                  </button>
                </div>
              </div>

              <div className="product-info">
                <div className="product-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="star" />
                  ))}
                  <span className="rating-count">(0)</span>
                </div>

                <h3 className="product-title">{product.name}</h3>

                <div className="product-price">
                  {product.priceRange ? product.priceRange : product.price}
                </div>

                <div className="product-meta">
                  <span className="stock-info">{product.stock} Products in stock</span>
                </div>

                <button className="btn btn-add-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductSection;
