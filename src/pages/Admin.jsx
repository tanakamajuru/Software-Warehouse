import React, { useState } from 'react';
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ProductsPage from './admin/products/ProductsPage';
import CategoriesPage from './admin/categories/CategoriesPage';
import BrandsPage from './admin/brands/BrandsPage';
import InventoryPage from './admin/inventory/InventoryPage';
import BannersPage from './admin/banners/BannersPage';
import DiscountsPage from './admin/discounts/DiscountsPage';
import UsersPage from './admin/users/UsersPage';
import { FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiService from '../services/api';

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    price: '',
    priceAfterDiscount: '',
    categoryId: '',
    brandId: '',
    imageCover: null,
    images: []
  });

  const [stats, setStats] = useState({
    totalProducts: 0,
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    pendingOrders: 0,
    lowStock: 0,
    newCustomers: 0,
    supportTickets: 0
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  // Fetch data from API
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData, brandsData, bannersData] = await Promise.all([
          apiService.getProducts(),
          apiService.getCategories(),
          apiService.getBrands(),
          apiService.getBanners()
        ]);

        const productArray = Array.isArray(productsData) ? productsData : (productsData?.data || []);
        const categoryArray = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data || []);
        const brandArray = Array.isArray(brandsData) ? brandsData : (brandsData?.data || []);
        const bannerArray = Array.isArray(bannersData) ? bannersData : (bannersData?.data || []);

        setProducts(productArray);
        setCategories(categoryArray);
        setBrands(brandArray);
        setBanners(bannerArray);

        setStats({
          totalProducts: productArray.length,
          totalRevenue: productArray.reduce((sum, p) => sum + (p.revenue || 0), 0),
          totalOrders: productArray.reduce((sum, p) => sum + (p.sales || 0), 0),
          totalCustomers: 0,
          pendingOrders: productArray.filter(p => p.status === 'pending').length,
          lowStock: productArray.filter(p => (p.stock || 0) < 20).length,
          newCustomers: 0,
          supportTickets: 0
        });
      } catch (error) {
        console.error('Failed to fetch admin data:', error);
        showNotification('Failed to load data from server', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      // Auto-generate slug from title
      if (field === 'title') {
        updated.slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').trim();
      }
      return updated;
    });
  };

  const handleFileChange = (field, files) => {
    if (field === 'imageCover') {
      setFormData(prev => ({ ...prev, imageCover: files[0] || null }));
    } else if (field === 'images') {
      setFormData(prev => ({ ...prev, images: Array.from(files) }));
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      description: '',
      price: '',
      priceAfterDiscount: '',
      categoryId: '',
      brandId: '',
      imageCover: null,
      images: []
    });
    setSelectedProduct(null);
  };

  // Build FormData for multipart/form-data API calls
  const buildFormData = () => {
    const data = new FormData();
    if (formData.title) data.append('title', formData.title);
    if (formData.slug) data.append('slug', formData.slug);
    if (formData.description) data.append('description', formData.description);
    if (formData.price) data.append('price', parseFloat(formData.price));
    if (formData.priceAfterDiscount) data.append('priceAfterDiscount', parseFloat(formData.priceAfterDiscount));
    if (formData.categoryId) data.append('categoryId', formData.categoryId);
    if (formData.brandId) data.append('brandId', formData.brandId);
    if (formData.imageCover) data.append('imageCover', formData.imageCover);
    if (formData.images?.length) {
      formData.images.forEach(img => data.append('images', img));
    }
    return data;
  };

  // ─── CRUD Handlers ────────────────────────────────────────────────────────

  const handleAddProduct = async () => {
    try {
      const data = buildFormData();
      const created = await apiService.createProduct(data);
      const newProduct = created?.data || created;
      setProducts(prev => [...prev, newProduct]);
      setShowAddModal(false);
      resetForm();
      showNotification('Product created successfully!');
    } catch (error) {
      console.error('Failed to create product:', error);
      showNotification('Failed to create product: ' + error.message, 'error');
    }
  };

  const handleEditProduct = async () => {
    try {
      const data = buildFormData();
      const updated = await apiService.updateProduct(selectedProduct._id || selectedProduct.id, data);
      const updatedProduct = updated?.data || updated;
      setProducts(prev =>
        prev.map(p => (p._id || p.id) === (selectedProduct._id || selectedProduct.id) ? updatedProduct : p)
      );
      setShowEditModal(false);
      resetForm();
      showNotification('Product updated successfully!');
    } catch (error) {
      console.error('Failed to update product:', error);
      showNotification('Failed to update product: ' + error.message, 'error');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await apiService.deleteProduct(productId);
      setProducts(prev => prev.filter(p => (p._id || p.id) !== productId));
      showNotification('Product deleted successfully!');
    } catch (error) {
      console.error('Failed to delete product:', error);
      showNotification('Failed to delete product: ' + error.message, 'error');
    }
  };

  const handleUpdateStock = async (productId, quantity) => {
    try {
      await apiService.updateInventory(productId, { quantity });
      showNotification('Stock updated successfully!');
    } catch (error) {
      console.error('Failed to update stock:', error);
      showNotification('Failed to update stock: ' + error.message, 'error');
    }
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      title: product.title || product.name || '',
      slug: product.slug || '',
      description: product.description || '',
      price: product.price?.toString() || '',
      priceAfterDiscount: product.priceAfterDiscount?.toString() || '',
      categoryId: product.categoryId || product.category?._id || '',
      brandId: product.brandId || product.brand?._id || '',
      imageCover: null,
      images: []
    });
    setShowEditModal(true);
  };

  // ─── Sidebar Menu ──────────────────────────────────────────────────────────

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const menuItems = [
    { title: 'Dashboard', icon: FileText, id: 'dashboard', section: 'main' },
    {
      title: 'Products', icon: FileText, id: 'products', section: 'catalog',
      children: [
        { title: 'All Products', id: 'products' },
        { title: 'Categories', id: 'categories' },
        { title: 'Inventory', id: 'inventory' },
        { title: 'Low Stock', id: 'lowstock' }
      ]
    },
    {
      title: 'Orders', icon: FileText, id: 'orders', section: 'sales',
      children: [
        { title: 'All Orders', id: 'orders' },
        { title: 'Pending', id: 'pending' },
        { title: 'Completed', id: 'completed' },
        { title: 'Returns', id: 'returns' }
      ]
    },
    {
      title: 'Customers', icon: FileText, id: 'customers', section: 'users',
      children: [
        { title: 'All Customers', id: 'customers' },
        { title: 'New Customers', id: 'newcustomers' },
        { title: 'Customer Groups', id: 'groups' }
      ]
    },
    {
      title: 'Marketing', icon: FileText, id: 'marketing', section: 'marketing',
      children: [
        { title: 'Campaigns', id: 'campaigns' },
        { title: 'Discounts', id: 'discounts' },
        { title: 'Banners', id: 'banners' },
        { title: 'Analytics', id: 'analytics' }
      ]
    },
    {
      title: 'Content', icon: FileText, id: 'content', section: 'content',
      children: [
        { title: 'Pages', id: 'pages' },
        { title: 'Blog', id: 'blog' },
        { title: 'Media', id: 'media' },
        { title: 'FAQ', id: 'faq' }
      ]
    },
    {
      title: 'Support', icon: FileText, id: 'support', section: 'support',
      children: [
        { title: 'Tickets', id: 'tickets' },
        { title: 'Live Chat', id: 'chat' },
        { title: 'Knowledge Base', id: 'knowledge' }
      ]
    },
    {
      title: 'Settings', icon: FileText, id: 'settings', section: 'system',
      children: [
        { title: 'General', id: 'general' },
        { title: 'Payment', id: 'payment' },
        { title: 'Shipping', id: 'shipping' },
        { title: 'Email', id: 'email' },
        { title: 'Security', id: 'security' }
      ]
    }
  ];

  const filteredProducts = products.filter(product => {
    const name = product.title || product.name || '';
    const cat = product.category?.name || product.categoryId || '';
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  // ─── Product Modal ─────────────────────────────────────────────────────────

  const ProductModal = ({ isOpen, onClose, title, onSubmit, isEdit }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <FileText className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Slug */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => handleInputChange('slug', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($) *</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Price After Discount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price After Discount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.priceAfterDiscount}
                  onChange={(e) => handleInputChange('priceAfterDiscount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => handleInputChange('categoryId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id || cat.id} value={cat._id || cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Brand</label>
                <select
                  value={formData.brandId}
                  onChange={(e) => handleInputChange('brandId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Brand</option>
                  {brands.map(brand => (
                    <option key={brand._id || brand.id} value={brand._id || brand.id}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Cover Image */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cover Image {isEdit ? '(leave empty to keep existing)' : ''}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange('imageCover', e.target.files)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Additional Images */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Images {isEdit ? '(leave empty to keep existing)' : ''}
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handleFileChange('images', e.target.files)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
              >
                <FileText className="w-4 h-4 mr-2" />
                {isEdit ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // ─── Loading ───────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // ─── Render ────────────────────────────────────────────────────────────────

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'products':
        return <ProductsPage />;
      case 'categories':
        return <CategoriesPage />;
      case 'brands':
        return <BrandsPage />;
      case 'inventory':
      case 'lowstock':
        return <InventoryPage />;
      case 'banners':
        return <BannersPage />;
      case 'discounts':
        return <DiscountsPage />;
      case 'customers':
      case 'users':
        return <UsersPage />;
      default:
        return (
          <div className="bg-white shadow rounded-lg p-8 text-center">
            <FileText className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
            </h3>
            <p className="text-gray-500">This section is under development.</p>
          </div>
        );
    }
  };

  return (
    <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
      {renderPage()}
    </AdminLayout>
  );
};

export default Admin;

