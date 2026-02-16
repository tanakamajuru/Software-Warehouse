import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import apiService from '../services/api';

// Icon Components
const FilterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const SearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const GridIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
);

const ListIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="8" y1="6" x2="21" y2="6" />
    <line x1="8" y1="12" x2="21" y2="12" />
    <line x1="8" y1="18" x2="21" y2="18" />
    <line x1="3" y1="6" x2="3.01" y2="6" />
    <line x1="3" y1="12" x2="3.01" y2="12" />
    <line x1="3" y1="18" x2="3.01" y2="18" />
  </svg>
);

function Shop() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('createdDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('grid');
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    fetchInitialData();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, selectedCategory, selectedBrand, priceRange, sortBy, sortOrder, currentPage]);

  const fetchInitialData = async () => {
    try {
      const [categoriesData, brandsData] = await Promise.all([
        apiService.getCategories(),
        apiService.getBrands()
      ]);
      setCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setBrands(Array.isArray(brandsData) ? brandsData : []);
    } catch (error) {
      console.error('Failed to fetch initial data:', error);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = {
        page: currentPage,
        limit: 12,
        search: searchTerm,
        categoryId: selectedCategory,
        brandId: selectedBrand,
        sortBy,
        sortOrder,
        ...(priceRange.min && { minPrice: priceRange.min }),
        ...(priceRange.max && { maxPrice: priceRange.max })
      };

      const response = await apiService.getProducts(params);
      
      if (response.data && Array.isArray(response.data)) {
        setProducts(response.data);
        if (response.pagination) {
          setTotalPages(response.pagination.pages);
          setTotalProducts(response.pagination.total);
        }
      } else if (Array.isArray(response)) {
        setProducts(response);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setError(err.message);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleBrandChange = (brandId) => {
    setSelectedBrand(brandId);
    setCurrentPage(1);
  };

  const handlePriceRangeChange = (type, value) => {
    setPriceRange(prev => ({ ...prev, [type]: value }));
    setCurrentPage(1);
  };

  const handleSortChange = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange({ min: '', max: '' });
    setSortBy('createdDate');
    setSortOrder('desc');
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = !searchTerm || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || product.categoryId === selectedCategory;
    const matchesBrand = !selectedBrand || product.brandId === selectedBrand;
    
    const matchesPrice = 
      (!priceRange.min || product.price >= parseFloat(priceRange.min)) &&
      (!priceRange.max || product.price <= parseFloat(priceRange.max));
    
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
  });

  if (loading && products.length === 0) {
    return (
      <div className="shop-page">
        <div className="shop-header">
          <div className="shop-title skeleton-box" style={{ height: '40px', width: '200px' }}></div>
          <div className="shop-controls skeleton-box" style={{ height: '40px', width: '300px' }}></div>
        </div>
        <div className="shop-content">
          <div className="shop-sidebar">
            <div className="filter-section skeleton-box" style={{ height: '200px' }}></div>
          </div>
          <div className="shop-main">
            <div className="products-grid">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="product-card skeleton">
                  <div className="product-image skeleton-box"></div>
                  <div className="product-info">
                    <div className="product-category skeleton-box"></div>
                    <div className="product-name skeleton-box"></div>
                    <div className="product-price skeleton-box"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="shop-page">
      {/* Header */}
      <div className="shop-header">
        <div className="shop-title">
          <h1>Software Solutions Shop</h1>
          <p>Discover powerful software for Zimbabwean businesses</p>
        </div>
        <div className="shop-controls">
          <div className="search-bar">
            <SearchIcon />
            <input
              type="text"
              placeholder="Search software..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="view-toggle">
            <button
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <GridIcon />
            </button>
            <button
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <ListIcon />
            </button>
          </div>
        </div>
      </div>

      <div className="shop-content">
        {/* Sidebar Filters */}
        <div className="shop-sidebar">
          <div className="filter-section">
            <div className="filter-header">
              <FilterIcon />
              <h3>Filters</h3>
              <button className="clear-filters" onClick={clearFilters}>
                Clear All
              </button>
            </div>

            {/* Categories */}
            <div className="filter-group">
              <h4>Categories</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="category"
                    value=""
                    checked={selectedCategory === ''}
                    onChange={() => handleCategoryChange('')}
                  />
                  <span>All Categories</span>
                </label>
                {categories.map(category => (
                  <label key={category.id} className="filter-option">
                    <input
                      type="radio"
                      name="category"
                      value={category.id}
                      checked={selectedCategory === category.id}
                      onChange={() => handleCategoryChange(category.id)}
                    />
                    <span>{category.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brands */}
            <div className="filter-group">
              <h4>Brands</h4>
              <div className="filter-options">
                <label className="filter-option">
                  <input
                    type="radio"
                    name="brand"
                    value=""
                    checked={selectedBrand === ''}
                    onChange={() => handleBrandChange('')}
                  />
                  <span>All Brands</span>
                </label>
                {brands.map(brand => (
                  <label key={brand.id} className="filter-option">
                    <input
                      type="radio"
                      name="brand"
                      value={brand.id}
                      checked={selectedBrand === brand.id}
                      onChange={() => handleBrandChange(brand.id)}
                    />
                    <span>{brand.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="filter-group">
              <h4>Price Range</h4>
              <div className="price-range">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) => handlePriceRangeChange('min', e.target.value)}
                />
                <span>-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) => handlePriceRangeChange('max', e.target.value)}
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="filter-group">
              <h4>Sort By</h4>
              <div className="sort-options">
                <button
                  className={`sort-btn ${sortBy === 'createdDate' ? 'active' : ''}`}
                  onClick={() => handleSortChange('createdDate')}
                >
                  Newest {sortBy === 'createdDate' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
                <button
                  className={`sort-btn ${sortBy === 'price' ? 'active' : ''}`}
                  onClick={() => handleSortChange('price')}
                >
                  Price {sortBy === 'price' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
                <button
                  className={`sort-btn ${sortBy === 'title' ? 'active' : ''}`}
                  onClick={() => handleSortChange('title')}
                >
                  Name {sortBy === 'title' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
                <button
                  className={`sort-btn ${sortBy === 'ratingsAverage' ? 'active' : ''}`}
                  onClick={() => handleSortChange('ratingsAverage')}
                >
                  Rating {sortBy === 'ratingsAverage' && (sortOrder === 'desc' ? '↓' : '↑')}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="shop-main">
          {/* Results Header */}
          <div className="results-header">
            <p>
              Showing {filteredProducts.length} of {totalProducts} products
            </p>
          </div>

          {/* Products Grid/List */}
          {error ? (
            <div className="error-message">
              Failed to load products: {error}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms</p>
            </div>
          ) : (
            <div className={`products-${viewMode}`}>
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              
              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                const pageNum = index + 1;
                return (
                  <button
                    key={pageNum}
                    className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                className="pagination-btn"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
