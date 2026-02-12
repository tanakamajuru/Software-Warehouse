import { Star, Heart, Eye } from 'lucide-react';

function SmartWatchSection() {
  const products = [
    {
      name: 'Aenean Watch New Special Edition Amolet',
      price: '$180.00',
      image: 'https://images.pexels.com/photos/35147278/pexels-photo-35147278.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 486
    },
    {
      name: 'Amoled Music Weather Fashion Smart Watch',
      price: '$144.00',
      image: 'https://images.pexels.com/photos/2779018/pexels-photo-2779018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 99
    },
    {
      name: 'Festina Mademoiselle Watch With Case 38mm',
      price: '$147.00',
      image: 'https://images.pexels.com/photos/35147278/pexels-photo-35147278.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      badge: 'Hot',
      stock: 98
    },
    {
      name: 'Garmin Lily Smart Watch Italian Leather Band',
      priceRange: '$133.00 - $166.00',
      image: 'https://images.pexels.com/photos/2779018/pexels-photo-2779018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 100
    },
    {
      name: 'Luxury Stainless Steel Custom Bands Ultra Woman',
      priceRange: '$106.00 - $140.00',
      image: 'https://images.pexels.com/photos/35147278/pexels-photo-35147278.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 100
    },
    {
      name: 'Mi Band 8 Smart Bracelet Amolet Screen Heart Rate',
      priceRange: '$75.00 - $100.00',
      image: 'https://images.pexels.com/photos/2779018/pexels-photo-2779018.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 100
    }
  ];

  return (
    <section className="smartwatch-section">
      <div className="container">
        <div className="smartwatch-layout">
          <div className="smartwatch-products">
            <div className="section-header">
              <h2 className="section-title">Smartwatch</h2>
            </div>

            <div className="product-grid-compact">
              {products.map((product, index) => (
                <div key={index} className="product-card-compact">
                  {product.badge && (
                    <span className="product-badge-top hot">{product.badge}</span>
                  )}
                  <div className="product-image-compact">
                    <img src={product.image} alt={product.name} />
                    <div className="product-actions-compact">
                      <button className="action-btn-compact">
                        <Heart size={16} />
                      </button>
                      <button className="action-btn-compact">
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="product-info-compact">
                    <div className="product-rating-compact">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="star" />
                      ))}
                      <span className="rating-count">(0)</span>
                    </div>

                    <h3 className="product-title-compact">{product.name}</h3>

                    <div className="product-price-compact">
                      {product.priceRange ? product.priceRange : product.price}
                    </div>

                    <button className="btn-compact">Add to Cart</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="smartwatch-banner">
            <img src="https://ecommax.risingbamboo.com/wp-content/uploads/2024/09/home10-smartwatch.jpg" alt="Smartwatch" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default SmartWatchSection;
