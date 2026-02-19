import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Package, 
  Plus, 
  Edit2, 
  Trash2, 
  Search, 
  Filter, 
  Download,
  Upload,
  Eye,
  Save,
  X,
  AlertCircle,
  CheckCircle,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Home,
  Settings,
  FileText,
  BarChart3,
  Mail,
  Tag,
  Store,
  LogOut,
  Menu,
  ChevronDown,
  ChevronRight,
  UserPlus,
  CreditCard,
  Truck,
  Headphones,
  MessageSquare,
  User
} from 'lucide-react';

const Admin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    image: '',
    features: [],
    specifications: {},
    isActive: true
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

  // Check if user is admin (temporarily disabled for testing)
  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
    // Temporarily remove role check for testing
    // if (!user || user.role !== 'admin') {
    //   navigate('/');
    // }
  }, [user, navigate]);

  // Mock data for demonstration
  useEffect(() => {
    const mockProducts = [
      {
        id: 1,
        name: 'Microsoft Office 365',
        description: 'Complete office suite with cloud storage',
        price: 99.99,
        category: 'Productivity',
        stock: 100,
        image: '/api/placeholder/200/150',
        features: ['Word', 'Excel', 'PowerPoint', 'OneDrive', 'Teams'],
        specifications: { license: 'Perpetual', users: '1', platform: 'Windows/Mac' },
        isActive: true,
        sales: 245,
        revenue: 24497.55
      },
      {
        id: 2,
        name: 'Adobe Creative Cloud',
        description: 'Professional creative software suite',
        price: 599.99,
        category: 'Design',
        stock: 50,
        image: '/api/placeholder/200/150',
        features: ['Photoshop', 'Illustrator', 'Premiere Pro', 'After Effects'],
        specifications: { license: 'Subscription', users: '1', platform: 'All' },
        isActive: true,
        sales: 89,
        revenue: 53399.11
      },
      {
        id: 3,
        name: 'Windows 11 Pro',
        description: 'Latest Windows operating system',
        price: 199.99,
        category: 'Operating System',
        stock: 200,
        image: '/api/placeholder/200/150',
        features: ['Enhanced Security', 'Virtual Desktops', 'Microsoft Store'],
        specifications: { license: 'OEM', users: '1', platform: 'Windows' },
        isActive: true,
        sales: 156,
        revenue: 31198.44
      }
    ];

    setProducts(mockProducts);
    setStats({
      totalProducts: mockProducts.length,
      totalRevenue: mockProducts.reduce((sum, p) => sum + p.revenue, 0),
      totalOrders: mockProducts.reduce((sum, p) => sum + p.sales, 0),
      totalCustomers: 490,
      pendingOrders: 23,
      lowStock: mockProducts.filter(p => p.stock < 20).length,
      newCustomers: 47,
      supportTickets: 12
    });
    setLoading(false);
  }, []);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const menuItems = [
    {
      title: 'Dashboard',
      icon: Home,
      id: 'dashboard',
      section: 'main'
    },
    {
      title: 'Products',
      icon: Package,
      id: 'products',
      section: 'catalog',
      children: [
        { title: 'All Products', id: 'products' },
        { title: 'Categories', id: 'categories' },
        { title: 'Inventory', id: 'inventory' },
        { title: 'Low Stock', id: 'lowstock' }
      ]
    },
    {
      title: 'Orders',
      icon: ShoppingCart,
      id: 'orders',
      section: 'sales',
      children: [
        { title: 'All Orders', id: 'orders' },
        { title: 'Pending', id: 'pending' },
        { title: 'Completed', id: 'completed' },
        { title: 'Returns', id: 'returns' }
      ]
    },
    {
      title: 'Customers',
      icon: Users,
      id: 'customers',
      section: 'users',
      children: [
        { title: 'All Customers', id: 'customers' },
        { title: 'New Customers', id: 'newcustomers' },
        { title: 'Customer Groups', id: 'groups' }
      ]
    },
    {
      title: 'Marketing',
      icon: Tag,
      id: 'marketing',
      section: 'marketing',
      children: [
        { title: 'Campaigns', id: 'campaigns' },
        { title: 'Coupons', id: 'coupons' },
        { title: 'SEO', id: 'seo' },
        { title: 'Analytics', id: 'analytics' }
      ]
    },
    {
      title: 'Content',
      icon: FileText,
      id: 'content',
      section: 'content',
      children: [
        { title: 'Pages', id: 'pages' },
        { title: 'Blog', id: 'blog' },
        { title: 'Media', id: 'media' },
        { title: 'FAQ', id: 'faq' }
      ]
    },
    {
      title: 'Support',
      icon: Headphones,
      id: 'support',
      section: 'support',
      children: [
        { title: 'Tickets', id: 'tickets' },
        { title: 'Live Chat', id: 'chat' },
        { title: 'Knowledge Base', id: 'knowledge' }
      ]
    },
    {
      title: 'Settings',
      icon: Settings,
      id: 'settings',
      section: 'system',
      children: [
        { title: 'General', id: 'general' },
        { title: 'Payment', id: 'payment' },
        { title: 'Shipping', id: 'shipping' },
        { title: 'Email', id: 'email' },
        { title: 'Security', id: 'security' }
      ]
    }
  ];

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      sales: 0,
      revenue: 0
    };
    setProducts([...products, newProduct]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditProduct = () => {
    const updatedProducts = products.map(product =>
      product.id === selectedProduct.id
        ? { ...product, ...formData, price: parseFloat(formData.price), stock: parseInt(formData.stock) }
        : product
    );
    setProducts(updatedProducts);
    setShowEditModal(false);
    resetForm();
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== productId));
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      stock: '',
      image: '',
      features: [],
      specifications: {},
      isActive: true
    });
    setSelectedProduct(null);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      stock: product.stock.toString(),
      image: product.image,
      features: product.features,
      specifications: product.specifications,
      isActive: product.isActive
    });
    setShowEditModal(true);
  };

  const ProductModal = ({ isOpen, onClose, title, onSubmit, isEdit }) => (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Category</option>
                  <option value="Productivity">Productivity</option>
                  <option value="Design">Design</option>
                  <option value="Operating System">Operating System</option>
                  <option value="Security">Security</option>
                  <option value="Development">Development</option>
                  <option value="Gaming">Gaming</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/api/placeholder/200/150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Features (comma-separated)</label>
              <input
                type="text"
                value={formData.features.join(', ')}
                onChange={(e) => setFormData({ ...formData, features: e.target.value.split(',').map(f => f.trim()) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Feature 1, Feature 2, Feature 3"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                Active (visible to customers)
              </label>
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
                <Save className="w-4 h-4 mr-2" />
                {isEdit ? 'Update Product' : 'Add Product'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white transition-all duration-300 ease-in-out`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className={`flex items-center ${!sidebarOpen && 'justify-center'}`}>
            <Store className="w-8 h-8 text-blue-400" />
            {sidebarOpen && <span className="ml-2 text-xl font-bold">Admin</span>}
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="text-gray-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <nav className="mt-8">
          {menuItems.map((item) => (
            <div key={item.section}>
              <button
                onClick={() => {
                  if (item.children) {
                    toggleSection(item.section);
                  } else {
                    setActiveTab(item.id);
                  }
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-800 transition-colors ${
                  activeTab === item.id ? 'bg-blue-600 text-white' : 'text-gray-300'
                }`}
              >
                <div className="flex items-center">
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && <span className="ml-3">{item.title}</span>}
                </div>
                {sidebarOpen && item.children && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedSections[item.section] ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {sidebarOpen && item.children && expandedSections[item.section] && (
                <div className="bg-gray-800">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setActiveTab(child.id)}
                      className={`w-full flex items-center px-4 py-2 pl-12 text-sm hover:bg-gray-700 transition-colors ${
                        activeTab === child.id ? 'bg-blue-600 text-white' : 'text-gray-400'
                      }`}
                    >
                      {child.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-gray-800 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">Admin User</p>
                <button
                  onClick={() => {
                    // logout logic here
                    navigate('/');
                  }}
                  className="text-xs text-gray-400 hover:text-white flex items-center"
                >
                  <LogOut className="w-3 h-3 mr-1" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden">
        {/* Top Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {menuItems.find(item => item.id === activeTab)?.title || 'Dashboard'}
                </h1>
                <p className="text-gray-600">Manage your software store</p>
              </div>
              <div className="flex space-x-4">
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
                <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto h-screen">
          {activeTab === 'dashboard' && (
            <div>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                      <Package className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Products</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                      <DollarSign className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">${stats.totalRevenue.toFixed(2)}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                      <ShoppingCart className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalOrders}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-orange-100 rounded-lg p-3">
                      <Users className="h-6 w-6 text-orange-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Customers</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.totalCustomers}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                      <AlertCircle className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending Orders</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.pendingOrders}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-100 rounded-lg p-3">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Low Stock</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.lowStock}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-indigo-100 rounded-lg p-3">
                      <UserPlus className="h-6 w-6 text-indigo-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">New Customers</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.newCustomers}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-pink-100 rounded-lg p-3">
                      <MessageSquare className="h-6 w-6 text-pink-600" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Support Tickets</p>
                      <p className="text-2xl font-bold text-gray-900">{stats.supportTickets}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="ml-3 text-sm text-gray-600">New order #1234 received</span>
                      <span className="ml-auto text-xs text-gray-500">2 minutes ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="ml-3 text-sm text-gray-600">Product "Windows 11 Pro" updated</span>
                      <span className="ml-auto text-xs text-gray-500">15 minutes ago</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="ml-3 text-sm text-gray-600">Low stock alert for "Adobe Creative Cloud"</span>
                      <span className="ml-auto text-xs text-gray-500">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'products' && (
            <div>
              {/* Products Table - Keep existing implementation */}
              <div className="bg-white shadow rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-medium text-gray-900">Products</h2>
                    <div className="flex space-x-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <input
                          type="text"
                          placeholder="Search products..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Product
                      </button>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Stock
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Sales
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-lg object-cover"
                                  src={product.image}
                                  alt={product.name}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                <div className="text-sm text-gray-500">{product.description.substring(0, 50)}...</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {product.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${product.price.toFixed(2)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.stock}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              product.isActive
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {product.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {product.sales}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => openEditModal(product)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(product.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder for other tabs */}
          {activeTab !== 'dashboard' && activeTab !== 'products' && (
            <div className="bg-white shadow rounded-lg p-8 text-center">
              <div className="text-gray-400 mb-4">
                <FileText className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {menuItems.find(item => item.id === activeTab)?.title || 'Section'}
              </h3>
              <p className="text-gray-600">This section is under development.</p>
              <p className="text-sm text-gray-500 mt-2">Check back soon for updates!</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <ProductModal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          resetForm();
        }}
        title="Add New Product"
        onSubmit={handleAddProduct}
        isEdit={false}
      />

      <ProductModal
        isOpen={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          resetForm();
        }}
        title="Edit Product"
        onSubmit={handleEditProduct}
        isEdit={true}
      />
    </div>
  );
};

export default Admin;
