import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Clock, 
  Mail, 
  Monitor, 
  Cpu, 
  HardDrive, 
  Keyboard, 
  Mouse,
  Headphones,
  Smartphone,
  Laptop,
  Package,
  Star,
  TrendingUp,
  Search,
  Filter,
  Grid,
  List
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ProductCard from '../components/ProductCard';

const ShopPage = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [priceRange, setPriceRange] = useState(317);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [categories, setCategories] = useState({});
  const [products, setProducts] = useState([]);
  const [recentProducts, setRecentProducts] = useState([]);
  const [topBoughtProducts, setTopBoughtProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productsLoading, setProductsLoading] = useState(true);
  const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 20, pages: 0 });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products, categories, and featured products
        const [productsResponse, categoriesResponse, recentData, topBoughtData] = await Promise.all([
          fetch(`http://localhost:5000/api/v1/products?page=${currentPage}&limit=20`),
          fetch('http://localhost:5000/api/v1/categories'),
          fetch('http://localhost:5000/api/v1/featured/recent'),
          fetch('http://localhost:5000/api/v1/featured/top-bought')
        ]);

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();
        const recentDataJson = await recentData.json();
        const topBoughtDataJson = await topBoughtData.json();

        // Handle products
        const productsArray = productsData.data?.data || [];
        console.log('ShopPage - Raw products data:', productsData);
        console.log('ShopPage - Products array:', productsArray);
        console.log('ShopPage - First product price:', productsArray[0]?.price);
        console.log('ShopPage - First product priceAfterDiscount:', productsArray[0]?.priceAfterDiscount);
        
        setProducts(productsArray);
        setPagination(productsData.data?.pagination || { total: 0, page: 1, limit: 20, pages: 0 });

        // Create category lookup map
        const categoriesArray = Array.isArray(categoriesData) ? categoriesData : (categoriesData.data || []);
        const categoryMap = {};
        categoriesArray.forEach(category => {
          categoryMap[category.id] = category.name || category.slug || 'Unknown';
        });
        
        console.log('ShopPage - Category map:', categoryMap);
        setCategories(categoryMap);

        // Handle featured products
        const recentArray = Array.isArray(recentDataJson) ? recentDataJson : (recentDataJson.data || []);
        const topBoughtArray = Array.isArray(topBoughtDataJson) ? topBoughtDataJson : (topBoughtDataJson.data || []);
        
        setRecentProducts(recentArray.slice(0, 3));
        setTopBoughtProducts(topBoughtArray.slice(0, 3));
      } catch (err) {
        console.error('Failed to fetch data:', err);
      } finally {
        setLoading(false);
        setProductsLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  // Handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
    setProductsLoading(true);
  };

  const handleLoadMore = () => {
    if (currentPage < pagination.pages) {
      handlePageChange(currentPage + 1);
    }
  };

  // Update sideCategories to match API categories
  const sideCategories = Object.entries(categories).map(([id, name]) => ({
    name: name,
    count: 0 // We don't have count data from API, so default to 0
  }));


  const brands = [
    { name: "Aandatto", count: 44 },
    { name: "Apple", count: 4 },
    { name: "Aurnull", count: 6 },
    { name: "Bose", count: 11 },
    { name: "Canflex", count: 3 },
    { name: "Honeg", count: 2 },
    { name: "Lapcat", count: 2 },
    { name: "Qipot", count: 1 },
  ];

  const sizes = ["1 TB", "500 GB", "256 GB", "38 mm", "42 mm", "45 mm", "44 mm"];

  const colors = [
    "#e74c3c","#2c3e50","#7f8c8d","#c0392b","#3498db","#1abc9c","#f39c12","#8e44ad",
    "#2980b9","#27ae60","#e67e22","#16a085","#d35400","#f1c40f","#95a5a6","#e91e63",
    "#ff5722","#4caf50","#03a9f4","#9c27b0","#ff9800","#00bcd4","#8bc34a","#ffc107",
  ];

  const allTags = [
    "All Product","Apple","Audio (15)","Bathing","Bluetooth","Camera","Charger","Devel","Electronics (2)","Headphone (5)","Ion (5)","Note (2)","Microwave (26)","Minn","Model (12)","Halfquadble","Samsung","Smart (29)","Smartphone (13)","Smartwatch (19)","Tablet","Vacuum","Wireless (14)",
  ];

  const Stars = ({ count = 0 }) => (
    <div style={{ display: "flex", gap: 1 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} style={{ color: i <= count ? "#f59e0b" : "#d1d5db", fontSize: 10 }}>★</span>
      ))}
    </div>
  );

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: 14, color: "#333", background: "#fff" }}>
      <Header />
      
      {/* Hero Section */}
      <div style={{ background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)", padding: "40px 20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, backgroundImage: "radial-gradient(circle at 20% 50%, #27ae60 0%, transparent 50%), radial-gradient(circle at 80% 50%, #3498db 0%, transparent 50%)" }} />
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: "0 0 8px", color: "#1a1a2e" }}>SHOP</h1>
        <p style={{ color: "#888", fontSize: 13 }}>Home &gt; Shop</p>
      </div>

      {/* Category Icons */}
      <div style={{ padding: "20px", background: "#fff", display: "flex", alignItems: "center", gap: 12, overflowX: "auto" }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#ccc" }}>‹</button>
        {loading ? (
          // Loading skeleton
          Array.from({ length: 6 }).map((_, index) => (
            <div key={index} style={{ minWidth: 100, border: "1px solid #e9ecef", borderRadius: 8, padding: "16px 12px", textAlign: "center", flexShrink: 0 }}>
              <div style={{ width: 28, height: 28, background: "#f0f0f0", borderRadius: "50%", margin: "0 auto 6px" }} />
              <div style={{ width: "80%", height: 12, background: "#f0f0f0", margin: "0 auto 4px", borderRadius: 2 }} />
              <div style={{ width: "60%", height: 10, background: "#f0f0f0", margin: "0 auto", borderRadius: 2 }} />
            </div>
          ))
        ) : (
          Object.entries(categories).map(([id, name]) => (
            <div key={id || name} style={{ minWidth: 100, border: "1px solid #e9ecef", borderRadius: 8, padding: "16px 12px", textAlign: "center", cursor: "pointer", transition: "all 0.2s", flexShrink: 0 }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#27ae60"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(39,174,96,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#e9ecef"; e.currentTarget.style.boxShadow = "none"; }}
              onClick={() => navigate(`/shop/category/${id}`)}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{name}</div>
              <div style={{ fontWeight: 600, fontSize: 12, color: "#1a1a2e" }}>{name}</div>
              <div style={{ fontSize: 11, color: "#888" }}>0 Products</div>
            </div>
          ))
        )}
        <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#ccc" }}>›</button>
      </div>

      {/* Main Content */}
      <div style={{ display: "flex", padding: "20px", gap: 20, maxWidth: 1200, margin: "0 auto" }}>
        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 16 }}>
            <span style={{ fontSize: 12 }}>⚙️</span>
            <strong style={{ fontSize: 13, color: "#1a1a2e" }}>FILTER BY</strong>
          </div>

          {/* Categories */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #eee" }}>
              <strong style={{ fontSize: 12 }}>Categories</strong>
              <span style={{ cursor: "pointer", color: "#888", fontSize: 12 }}>▲</span>
            </div>
            {sideCategories.map(cat => (
              <label key={cat.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, cursor: "pointer", fontSize: 12 }}>
                <input type="checkbox" style={{ accentColor: "#27ae60" }} />
                <span>{cat.name} ({cat.count})</span>
              </label>
            ))}
          </div>

          {/* Price */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #eee" }}>
              <strong style={{ fontSize: 12 }}>Price</strong>
              <span style={{ cursor: "pointer", color: "#888", fontSize: 12 }}>▲</span>
            </div>
            <input type="range" min={0} max={500} value={priceRange} onChange={e => setPriceRange(e.target.value)}
              style={{ width: "100%", accentColor: "#27ae60" }} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#888", marginBottom: 10 }}>
              <span>Range: $0 - ${priceRange}</span>
            </div>
            <button style={{ background: "#1a1a2e", color: "#fff", border: "none", padding: "6px 14px", borderRadius: 4, cursor: "pointer", fontSize: 11 }}>FILTER</button>
          </div>

          {/* Brands */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #eee" }}>
              <strong style={{ fontSize: 12 }}>Brands</strong>
              <span style={{ cursor: "pointer", color: "#888", fontSize: 12 }}>▲</span>
            </div>
            {brands.map(b => (
              <label key={b.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, cursor: "pointer", fontSize: 12 }}>
                <input type="checkbox" style={{ accentColor: "#27ae60" }} />
                <span>{b.name} ({b.count})</span>
              </label>
            ))}
          </div>

          {/* Size */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #eee" }}>
              <strong style={{ fontSize: 12 }}>Size</strong>
              <span style={{ cursor: "pointer", color: "#888", fontSize: 12 }}>▲</span>
            </div>
            {sizes.map(s => (
              <label key={s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, cursor: "pointer", fontSize: 12 }}>
                <input type="checkbox" style={{ accentColor: "#27ae60" }} />
                <span>{s}</span>
              </label>
            ))}
          </div>

          {/* Colors */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, paddingBottom: 8, borderBottom: "1px solid #eee" }}>
              <strong style={{ fontSize: 12 }}>Colors</strong>
              <span style={{ cursor: "pointer", color: "#888", fontSize: 12 }}>▲</span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
              {colors.map((c, i) => (
                <div key={i} style={{ width: 16, height: 16, borderRadius: "50%", background: c, cursor: "pointer", border: "1px solid rgba(0,0,0,0.1)" }} />
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div style={{ flex: 1 }}>
          {/* Toolbar */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, padding: "10px 0", borderBottom: "1px solid #eee" }}>
            <div style={{ display: "flex", gap: 6 }}>
              {["⊞","⊟","≡"].map((icon, i) => (
                <button key={i} onClick={() => setViewMode(i === 0 ? "grid" : i === 1 ? "grid2" : "list")}
                  style={{ background: i === 0 && viewMode === "grid" ? "#27ae60" : "#f8f9fa", border: "1px solid #ddd", padding: "4px 8px", cursor: "pointer", borderRadius: 3, color: i === 0 && viewMode === "grid" ? "#fff" : "#555" }}>
                  {icon}
                </button>
              ))}
            </div>
            <span style={{ fontSize: 12, color: "#888" }}>Showing {products.length} of {pagination.total} results</span>
            <select style={{ border: "1px solid #ddd", padding: "4px 8px", borderRadius: 3, fontSize: 12, color: "#555" }}>
              <option>Default sorting</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest First</option>
            </select>
          </div>

          {/* Grid */}
          {productsLoading ? (
            // Loading skeleton for products
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} style={{ border: "1px solid #e9ecef", borderRadius: 8, overflow: "hidden", background: "#fff" }}>
                  <div style={{ background: "#f0f0f0", height: 180 }} />
                  <div style={{ padding: "12px" }}>
                    <div style={{ width: "80%", height: 12, background: "#f0f0f0", marginBottom: 8, borderRadius: 2 }} />
                    <div style={{ width: "60%", height: 10, background: "#f0f0f0", marginBottom: 8, borderRadius: 2 }} />
                    <div style={{ width: "40%", height: 14, background: "#f0f0f0", borderRadius: 2 }} />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {products.map(p => (
                <ProductCard 
                  key={p.id} 
                  product={p} 
                  categories={categories}
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div style={{ textAlign: "center", marginTop: 30, padding: "20px 0" }}>
            <p style={{ color: "#888", fontSize: 12, marginBottom: 12 }}>Showing {products.length} of {pagination.total} products</p>
            <div style={{ display: "flex", gap: 2, justifyContent: "center", marginBottom: 12 }}>
              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(p => (
                <div 
                  key={p} 
                  style={{ 
                    width: p === currentPage ? 24 : 8, 
                    height: 4, 
                    background: p === currentPage ? "#27ae60" : "#ddd", 
                    borderRadius: 2, 
                    cursor: "pointer" 
                  }}
                  onClick={() => handlePageChange(p)}
                />
              ))}
            </div>
            <button 
              style={{ 
                background: currentPage >= pagination.pages ? "#f5f5f5" : "#fff", 
                border: "2px solid #1a1a2e", 
                color: currentPage >= pagination.pages ? "#ccc" : "#1a1a2e", 
                padding: "10px 30px", 
                borderRadius: 4, 
                cursor: currentPage >= pagination.pages ? "not-allowed" : "pointer", 
                fontWeight: 600, 
                fontSize: 12, 
                transition: "all 0.2s",
                opacity: currentPage >= pagination.pages ? 0.6 : 1
              }}
              onMouseEnter={e => { 
                if (currentPage < pagination.pages) {
                  e.currentTarget.style.background = "#1a1a2e"; 
                  e.currentTarget.style.color = "#fff"; 
                }
              }}
              onMouseLeave={e => { 
                e.currentTarget.style.background = currentPage >= pagination.pages ? "#f5f5f5" : "#fff"; 
                e.currentTarget.style.color = currentPage >= pagination.pages ? "#ccc" : "#1a1a2e"; 
              }}
              onClick={handleLoadMore}
              disabled={currentPage >= pagination.pages}
            >
              {currentPage >= pagination.pages ? "NO MORE PRODUCTS" : "LOAD MORE ITEMS"}
            </button>
          </div>
        </div>
      </div>

      {/* Recent Products Section */}
      {recentProducts.length > 0 && (
        <div style={{ padding: "40px 20px", background: "#fff" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <Clock style={{ width: 20, height: 20, color: "#27ae60" }} />
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Recently Added Products</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
              {recentProducts.slice(0, 5).map(p => (
                <div key={p.id} style={{ border: "1px solid #e9ecef", borderRadius: 8, overflow: "hidden", cursor: "pointer", transition: "all 0.2s", background: "#fff" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                  onClick={() => navigate(`/product/${p.slug}`)}>
                  <div style={{ position: "relative", background: "#f8f9fa", height: 120, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <img src={p.imageCover} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none" }} />
                    <div style={{ position: "absolute", top: 6, right: 6, background: "#27ae60", color: "#fff", fontSize: 8, padding: "2px 4px", borderRadius: 3, fontWeight: 600 }}>NEW</div>
                  </div>
                  <div style={{ padding: "8px" }}>
                    <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>{categories[p.categoryId]?.toUpperCase() || 'UNCATEGORIZED'}</div>
                    <div style={{ fontSize: 11, fontWeight: 500, marginBottom: 4, color: "#1a1a2e", lineHeight: 1.3, height: 28, overflow: "hidden" }}>{p.title}</div>
                    <div style={{ color: "#1a1a2e", fontWeight: 700, fontSize: 12 }}>${p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Top Bought Products Section */}
      {topBoughtProducts.length > 0 && (
        <div style={{ padding: "40px 20px", background: "#f8f9fa" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
              <TrendingUp style={{ width: 20, height: 20, color: "#27ae60" }} />
              <h2 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Top Bought Products</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
              {topBoughtProducts.slice(0, 5).map(p => (
                <div key={p.id} style={{ border: "1px solid #e9ecef", borderRadius: 8, overflow: "hidden", cursor: "pointer", transition: "all 0.2s", background: "#fff" }}
                  onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                  onClick={() => navigate(`/product/${p.slug}`)}>
                  <div style={{ position: "relative", background: "#f8f9fa", height: 120, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
                    <img src={p.imageCover} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.style.display = "none" }} />
                    <div style={{ position: "absolute", top: 6, right: 6, background: "#e74c3c", color: "#fff", fontSize: 8, padding: "2px 4px", borderRadius: 3, fontWeight: 600 }}>HOT</div>
                    {p.sold && (
                      <div style={{ position: "absolute", bottom: 6, left: 6, background: "#1a1a2e", color: "#27ae60", fontSize: 8, padding: "2px 4px", borderRadius: 3, fontWeight: 600 }}>{p.sold} sold</div>
                    )}
                  </div>
                  <div style={{ padding: "8px" }}>
                    <div style={{ fontSize: 10, color: "#888", marginBottom: 2 }}>{categories[p.categoryId]?.toUpperCase() || 'UNCATEGORIZED'}</div>
                    <div style={{ fontSize: 11, fontWeight: 500, marginBottom: 4, color: "#1a1a2e", lineHeight: 1.3, height: 28, overflow: "hidden" }}>{p.title}</div>
                    <div style={{ color: "#1a1a2e", fontWeight: 700, fontSize: 12 }}>${p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tags Section */}
      <div style={{ background: "#f8f9fa", padding: "20px", borderTop: "1px solid #eee" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <strong style={{ fontSize: 12, color: "#1a1a2e", marginRight: 8 }}>ALL TAGS :</strong>
            {allTags.map(tag => (
              <span key={tag} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 3, padding: "3px 8px", fontSize: 11, color: "#666", cursor: "pointer", transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = "#27ae60"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#27ae60"; }}
                onMouseLeave={e => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#666"; e.currentTarget.style.borderColor = "#ddd"; }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ShopPage;
