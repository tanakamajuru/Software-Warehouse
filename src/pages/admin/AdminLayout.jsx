import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Search,
  Download,
  Upload,
  Save,
  X,
  AlertCircle,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Users,
  Home,
  Settings,
  FileText,
  BarChart3,
  Tag,
  Store,
  LogOut,
  Menu,
  ChevronDown,
  UserPlus,
  MessageSquare,
  User,
  Headphones
} from 'lucide-react';

const AdminLayout = ({ children, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [expandedSections, setExpandedSections] = useState({});

  // Redirect if not logged in
  React.useEffect(() => {
    if (!user) {
      navigate('/auth/login');
    }
  }, [user, navigate]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const menuItems = [
    { title: 'Dashboard', icon: Home, id: 'dashboard', section: 'main' },
    {
      title: 'Products', icon: Package, id: 'products', section: 'catalog',
      children: [
        { title: 'All Products', id: 'products' },
        { title: 'Categories', id: 'categories' },
        { title: 'Inventory', id: 'inventory' },
        { title: 'Low Stock', id: 'lowstock' }
      ]
    },
    {
      title: 'Orders', icon: ShoppingCart, id: 'orders', section: 'sales',
      children: [
        { title: 'All Orders', id: 'orders' },
        { title: 'Pending', id: 'pending' },
        { title: 'Completed', id: 'completed' },
        { title: 'Returns', id: 'returns' }
      ]
    },
    {
      title: 'Customers', icon: Users, id: 'customers', section: 'users',
      children: [
        { title: 'All Customers', id: 'customers' },
        { title: 'New Customers', id: 'newcustomers' },
        { title: 'Customer Groups', id: 'groups' }
      ]
    },
    {
      title: 'Marketing', icon: Tag, id: 'marketing', section: 'marketing',
      children: [
        { title: 'Campaigns', id: 'campaigns' },
        { title: 'Discounts', id: 'discounts' },
        { title: 'Banners', id: 'banners' },
        { title: 'Analytics', id: 'analytics' }
      ]
    },
    { title: 'Content', icon: FileText, id: 'content', section: 'content',
      children: [
        { title: 'Pages', id: 'pages' },
        { title: 'Blog', id: 'blog' },
        { title: 'Media', id: 'media' },
        { title: 'FAQ', id: 'faq' }
      ]
    },
    { title: 'Support', icon: Headphones, id: 'support', section: 'support',
      children: [
        { title: 'Tickets', id: 'tickets' },
        { title: 'Live Chat', id: 'chat' },
        { title: 'Knowledge Base', id: 'knowledge' }
      ]
    },
    { title: 'Settings', icon: Settings, id: 'settings', section: 'system',
      children: [
        { title: 'General', id: 'general' },
        { title: 'Payment', id: 'payment' },
        { title: 'Shipping', id: 'shipping' },
        { title: 'Email', id: 'email' },
        { title: 'Security', id: 'security' }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* ── Sidebar ── */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gray-900 text-white transition-all duration-300 ease-in-out flex flex-col`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className={`flex items-center ${!sidebarOpen && 'justify-center w-full'}`}>
            <Store className="w-8 h-8 text-blue-400 flex-shrink-0" />
            {sidebarOpen && <span className="ml-2 text-xl font-bold">Admin</span>}
          </div>
          {sidebarOpen && (
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-white">
              <Menu className="w-5 h-5" />
            </button>
          )}
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="absolute left-3 mt-1 text-gray-400 hover:text-white">
            </button>
          )}
        </div>

        {!sidebarOpen && (
          <button onClick={() => setSidebarOpen(true)} className="flex justify-center py-2 text-gray-400 hover:text-white">
            <Menu className="w-5 h-5" />
          </button>
        )}

        <nav className="mt-4 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <div key={item.section}>
              <button
                onClick={() => {
                  if (item.children) toggleSection(item.section);
                  else setActiveTab(item.id);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 text-sm hover:bg-gray-800 transition-colors ${
                  activeTab === item.id ? 'bg-blue-600 text-white' : 'text-gray-300'
                }`}
              >
                <div className={`flex items-center ${!sidebarOpen && 'justify-center w-full'}`}>
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && <span className="ml-3">{item.title}</span>}
                </div>
                {sidebarOpen && item.children && (
                  <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections[item.section] ? 'rotate-180' : ''}`} />
                )}
              </button>

              {sidebarOpen && item.children && expandedSections[item.section] && (
                <div className="bg-gray-800">
                  {item.children.map((child) => (
                    <button
                      key={child.id}
                      onClick={() => setActiveTab(child.id)}
                      className={`w-full text-left px-12 py-2 text-sm hover:bg-gray-700 transition-colors ${
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

        {/* User section */}
        <div className="border-t border-gray-800 p-4">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-white" />
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
                <button
                  onClick={() => navigate('/')}
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

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="bg-white shadow-sm border-b flex-shrink-0">
          <div className="px-6 py-4 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {menuItems.flatMap(i => [i, ...(i.children || [])]).find(i => i.id === activeTab)?.title || 'Dashboard'}
              </h1>
              <p className="text-gray-600 text-sm">Manage your software store</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">
                <Download className="w-4 h-4 mr-2" />
                Export
              </button>
              <button className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 text-sm">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
