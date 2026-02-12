import { Star, Heart, Eye } from 'lucide-react';

function AudioSection() {
  const products = [
    {
      name: 'Vinova Headphone Sociis Buds T100 Magnis Buds',
      price: '$36.00',
      image: 'https://images.pexels.com/photos/28993059/pexels-photo-28993059.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 100
    },
    {
      name: 'Wage Universal Wired Surround Gaming Headset',
      price: '$350.00',
      image: 'https://images.pexels.com/photos/29422680/pexels-photo-29422680.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 100
    },
    {
      name: 'Gaming Headset with Mic for Xbox One PS4 Switch',
      priceRange: '$200.00 - $230.00',
      image: 'https://images.pexels.com/photos/28993059/pexels-photo-28993059.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 100
    },
    {
      name: 'Wireless Outdoor Sports Flip 6 Portable Speaker',
      priceRange: '$150.00 - $165.00',
      image: 'https://images.pexels.com/photos/29422680/pexels-photo-29422680.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 100
    },
    {
      name: 'True Wireless Stereo Earphone Headphone Wireless',
      price: '$79.00',
      image: 'https://images.pexels.com/photos/35147239/pexels-photo-35147239.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 100
    },
    {
      name: 'Consequat Stanmore Bluetooth Wireless Speaker',
      price: '$470.00',
      image: 'https://images.pexels.com/photos/8858287/pexels-photo-8858287.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      rating: 0,
      stock: 'In Stock'
    }
  ];

  return (
    <section className="audio-section">
      <div className="container">
        <div className="audio-layout">
          <div className="audio-banner">
            <img src="https://ecommax.risingbamboo.com/wp-content/uploads/2024/09/home10-audio.jpg" alt="Audio & Sound" />
          </div>

          <div className="audio-products">
            <div className="section-header">
              <h2 className="section-title">Audio & Sound</h2>
            </div>

            <div className="product-grid-compact">
              {products.map((product, index) => (
                <div key={index} className="product-card-compact">
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
        </div>
      </div>
    </section>
  );
}

export default AudioSection;
