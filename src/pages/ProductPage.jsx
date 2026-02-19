import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Package, Clock, Star, Zap, ArrowLeft, ShoppingCart, Heart, Share2 } from 'lucide-react';
import apiService from '../services/api';
import { useCart } from '../contexts/CartContext';

const ProductPage = () => {
  const navigate = useNavigate();
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [categories, setCategories] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stockInfo, setStockInfo] = useState({ availableQuantity: 0, isAvailable: true });
  const [checkingStock, setCheckingStock] = useState(false);
  const { addToCart } = useCart();

  // Check stock availability
  const checkStockAvailability = async (productId) => {
    if (!productId) return;
    
    setCheckingStock(true);
    try {
      const response = await fetch(`http://localhost:5000/api/v1/inventory/check-availability/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity: 1 })
      });
      
      const data = await response.json();
      if (data.success) {
        setStockInfo({
          availableQuantity: data.data.availableQuantity,
          isAvailable: data.data.isAvailable
        });
      }
    } catch (error) {
      console.error('Error checking stock:', error);
      // Fallback to basic stock check
      if (product) {
        setStockInfo({
          availableQuantity: product.quantity || product.stock || product.inventory || 0,
          isAvailable: (product.quantity || product.stock || product.inventory || 0) > 0
        });
      }
    } finally {
      setCheckingStock(false);
    }
  };

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        setLoading(true);
        
        // Fetch both products and categories
        const [productsResponse, categoriesResponse] = await Promise.all([
          apiService.getProducts(),
          apiService.getCategories()
        ]);
        
        const productsArray = Array.isArray(productsResponse) ? productsResponse : (productsResponse.data || []);
        const categoriesArray = Array.isArray(categoriesResponse) ? categoriesResponse : (categoriesResponse.data || []);
        
        // Create category lookup map
        const categoryMap = {};
        categoriesArray.forEach(category => {
          categoryMap[category.id] = category.name || category.slug || 'Unknown';
        });
        
        console.log('Category map:', categoryMap);
        setCategories(categoryMap);
        
        console.log('URL slug:', slug);
        console.log('Products array:', productsArray);
        
        // Find product by slug or ID
        const foundProduct = productsArray.find(p => 
          p.slug === slug || p.id === slug
        );
        
        console.log('Found product:', foundProduct);
        
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Check stock availability for the product
          checkStockAvailability(foundProduct.id);
          
          // Get the category name using categoryId lookup
          const currentProductCategory = categoryMap[foundProduct.categoryId] || 'Uncategorized';
          console.log('Current product category:', currentProductCategory);
          
          // Fetch related products from the same category (exclude current product)
          const related = productsArray.filter(p => {
            const relatedProductCategory = categoryMap[p.categoryId] || 'Uncategorized';
            console.log(`Product ${p.title} category:`, relatedProductCategory);
            return relatedProductCategory === currentProductCategory && 
                   p.id !== foundProduct.id;
          }).slice(0, 4); // Limit to 4 related products
          
          console.log('Related products:', related);
          setRelatedProducts(related);
          
          if (foundProduct.images && foundProduct.images.length > 0) {
            setSelectedImage(0);
          }
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProductAndCategories();
    }
  }, [slug]);

  const handleAddToCart = () => {
    // Check real-time stock before adding to cart
    if (!isInStock() || checkingStock) {
      console.log('Cannot add to cart - product out of stock or checking stock:', product.title);
      return;
    }

    // Check if requested quantity is available
    if (quantity > getStockQuantity()) {
      console.log('Cannot add to cart - insufficient stock:', {
        requested: quantity,
        available: getStockQuantity()
      });
      return;
    }
    
    // Add item to cart with full details
    const cartItem = {
      id: product.id,
      title: product.title,
      slug: product.slug,
      price: parseFloat(product.priceAfterDiscount) || parseFloat(product.price) || 0,
      originalPrice: parseFloat(product.price) || 0,
      imageCover: product.imageCover,
      categoryId: product.categoryId,
      categoryName: getCategoryName(product),
      quantity: quantity,
      ratingsAverage: product.ratingsAverage,
      ratingsQuantity: product.ratingsQuantity,
      stock: getStockQuantity()
    };
    
    console.log('ProductPage - Adding to cart:', cartItem);
    addToCart(cartItem);
    console.log('ProductPage - Added to cart successfully:', cartItem);
  };

  const handleBuyNow = () => {
    // Check real-time stock before buy now
    if (!isInStock() || checkingStock) {
      console.log('Cannot buy now - product out of stock or checking stock:', product.title);
      return;
    }

    // Add to cart first, then navigate to checkout
    handleAddToCart();
    // TODO: Navigate to checkout page when implemented
    console.log('Buy now:', product.title, 'Quantity:', quantity);
  };

  const getCategoryName = (product) => {
    console.log('Getting category for product:', product);
    
    // First try to get category from the categories map using categoryId
    if (product.categoryId && categories[product.categoryId]) {
      const categoryName = categories[product.categoryId];
      console.log('Found category from map:', categoryName);
      return categoryName;
    }
    
    // Fallback to other possible fields
    const possibleFields = [
      product.categoryName,
      product.category?.name,
      product.category,
      product.categoryName?.name,
      product.category?.categoryName
    ];
    
    const category = possibleFields.find(field => field && typeof field === 'string' && field.trim() !== '');
    
    console.log('Found category from fallback:', category);
    console.log('All category fields:', {
      categoryId: product.categoryId,
      categoryName: product.categoryName,
      categoryName: product.category?.name,
      category: product.category,
      categoryNameName: product.categoryName?.name,
      categoryCategoryName: product.category?.categoryName
    });
    
    return category || 'Uncategorized';
  };

  const isInStock = () => {
    // Use real-time stock info if available, fallback to basic check
    if (stockInfo.availableQuantity !== undefined) {
      return stockInfo.isAvailable && stockInfo.availableQuantity > 0;
    }
    return product && (product.quantity || product.stock || product.inventory || 0) > 0;
  };

  const getStockQuantity = () => {
    // Use real-time stock info if available
    if (stockInfo.availableQuantity !== undefined) {
      return stockInfo.availableQuantity;
    }
    return product ? (product.quantity || product.stock || product.inventory || 0) : 0;
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(parseFloat(rating) || 0);
    const hasHalfStar = (parseFloat(rating) || 0) % 1 >= 0.5;
    const stars = [];
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<Star key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    const emptyStars = 5 - Math.ceil(parseFloat(rating) || 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
    }
    
    return stars;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-6xl w-full">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-200 rounded-lg h-96"></div>
              <div className="space-y-4">
                <div className="bg-gray-200 h-8 rounded"></div>
                <div className="bg-gray-200 h-4 rounded w-3/4"></div>
                <div className="bg-gray-200 h-4 rounded w-1/2"></div>
                <div className="bg-gray-200 h-12 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
              <Package className="h-10 w-10 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">{error || 'The product you\'re looking for could not be found.'}</p>
            <button
              onClick={() => navigate('/shop')}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
            >
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </button>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Heart className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-600 hover:text-gray-900">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={product.imageCover || 'https://via.placeholder.com/600x400'}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
            </div>
            {product.images && product.images.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`border-2 rounded overflow-hidden ${selectedImage === index ? 'border-green-500' : 'border-gray-200'}`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category */}
            <div className="text-sm text-green-600 font-medium">
              {getCategoryName(product)}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {renderStars(product.ratingsAverage)}
              </div>
              <span className="text-sm text-gray-600">
                ({product.ratingsQuantity || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline space-x-2">
              {product.priceAfterDiscount ? (
                <>
                  <span className="text-3xl font-bold text-gray-900">${product.priceAfterDiscount}</span>
                  <span className="text-lg text-gray-500 line-through">${product.price}</span>
                  <span className="bg-red-100 text-red-800 text-sm font-medium px-2 py-1 rounded">
                    Save ${parseFloat(product.price - product.priceAfterDiscount).toFixed(2)}
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
              )}
            </div>

            {/* Description */}
            <div className="prose prose-sm text-gray-600">
              <p>{product.description || 'No description available for this product.'}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              {checkingStock ? (
                <>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-yellow-600 font-medium">Checking Stock...</span>
                </>
              ) : isInStock() ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 font-medium">In Stock</span>
                  <span className="text-gray-500">({getStockQuantity()} available)</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={checkingStock || !isInStock()}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const newQty = Math.max(1, parseInt(e.target.value) || 1);
                      // Don't allow quantity to exceed stock
                      if (!checkingStock && isInStock()) {
                        setQuantity(Math.min(newQty, getStockQuantity()));
                      } else {
                        setQuantity(newQty);
                      }
                    }}
                    className="w-16 text-center border-0 focus:ring-0"
                    min="1"
                    max={getStockQuantity()}
                    disabled={checkingStock || !isInStock()}
                  />
                  <button
                    onClick={() => {
                      if (!checkingStock && isInStock()) {
                        setQuantity(Math.min(quantity + 1, getStockQuantity()));
                      }
                    }}
                    disabled={checkingStock || !isInStock() || quantity >= getStockQuantity()}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    +
                  </button>
                </div>
                {!checkingStock && isInStock() && quantity >= getStockQuantity() && (
                  <span className="text-xs text-orange-600">Max quantity reached</span>
                )}
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={handleAddToCart}
                  disabled={checkingStock || !isInStock()}
                  className={`flex-1 flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors ${
                    checkingStock
                      ? 'text-gray-600 bg-gray-200 cursor-not-allowed'
                      : isInStock()
                      ? 'text-white bg-green-600 hover:bg-green-700'
                      : 'text-gray-400 bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {checkingStock ? 'Checking...' : !isInStock() ? 'Out of Stock' : 'Add to Cart'}
                </button>
                <button
                  onClick={handleBuyNow}
                  disabled={checkingStock || !isInStock()}
                  className={`flex-1 flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium transition-colors ${
                    checkingStock
                      ? 'text-gray-600 bg-gray-200 cursor-not-allowed'
                      : isInStock()
                      ? 'text-white bg-blue-600 hover:bg-blue-700'
                      : 'text-gray-400 bg-gray-300 cursor-not-allowed'
                  }`}
                >
                  {checkingStock ? 'Checking...' : !isInStock() ? 'Out of Stock' : 'Buy Now'}
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-700">
                  <Star className="w-5 h-5 text-yellow-500 mr-3" />
                  <span>Premium software quality</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Package className="w-5 h-5 text-green-500 mr-3" />
                  <span>Instant digital delivery</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Zap className="w-5 h-5 text-purple-500 mr-3" />
                  <span>24/7 customer support</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <Clock className="w-5 h-5 text-blue-500 mr-3" />
                  <span>Lifetime updates</span>
                </div>
              </div>
            </div>

            {/* Sold Count */}
            {product.sold && (
              <div className="text-sm text-gray-500">
                {product.sold} sold
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div 
                key={relatedProduct.id}
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(`/product/${relatedProduct.slug}`)}
              >
                {/* Product Image */}
                <div className="aspect-w-1 aspect-h-1 w-full h-48 bg-gray-200">
                  <img
                    src={relatedProduct.imageCover || 'https://via.placeholder.com/300x200'}
                    alt={relatedProduct.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200';
                    }}
                  />
                </div>
                
                {/* Product Info */}
                <div className="p-4">
                  {/* Category */}
                  <div className="text-xs text-green-600 font-medium mb-1">
                    {getCategoryName(relatedProduct)}
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                    {relatedProduct.title}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {renderStars(relatedProduct.ratingsAverage)}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">
                      ({relatedProduct.ratingsQuantity || 0})
                    </span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-baseline">
                    {relatedProduct.priceAfterDiscount ? (
                      <>
                        <span className="text-lg font-bold text-gray-900">
                          ${relatedProduct.priceAfterDiscount}
                        </span>
                        <span className="text-sm text-gray-500 line-through ml-2">
                          ${relatedProduct.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">
                        ${relatedProduct.price}
                      </span>
                    )}
                  </div>
                  
                  {/* Stock Status */}
                  <div className="mt-2">
                    {(relatedProduct.quantity || relatedProduct.stock || relatedProduct.inventory || 0) > 0 ? (
                      <span className="text-xs text-green-600 font-medium">In Stock</span>
                    ) : (
                      <span className="text-xs text-red-600 font-medium">Out of Stock</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
