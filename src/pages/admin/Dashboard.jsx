import React, { useState, useEffect } from 'react';
import apiService from '../../services/api';
import {
  Package,
  DollarSign,
  ShoppingCart,
  Users,
  AlertCircle,
  UserPlus,
  MessageSquare
} from 'lucide-react';

const Dashboard = () => {
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const productsData = await apiService.getProducts();
        const productArray = Array.isArray(productsData) ? productsData : (productsData?.data || []);
        
        setStats({
          totalProducts: productArray.length,
          totalRevenue: productArray.reduce((sum, p) => sum + (p.revenue || 0), 0),
          totalOrders: productArray.reduce((sum, p) => sum + (p.sales || 0), 0),
          totalCustomers: 0, // Would need separate API call
          pendingOrders: productArray.filter(p => p.status === 'pending').length,
          lowStock: productArray.filter(p => (p.stock || 0) < 20).length,
          newCustomers: 0, // Would need separate API call
          supportTickets: 0 // Would need separate API call
        });
      } catch (error) {
        console.error('Failed to fetch dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Primary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Products', value: stats.totalProducts, icon: Package, color: 'blue' },
          { label: 'Total Revenue', value: `$${stats.totalRevenue.toFixed(2)}`, icon: DollarSign, color: 'green' },
          { label: 'Total Orders', value: stats.totalOrders, icon: ShoppingCart, color: 'purple' },
          { label: 'Total Customers', value: stats.totalCustomers, icon: Users, color: 'orange' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className={`flex-shrink-0 bg-${color}-100 rounded-lg p-3`}>
              <Icon className={`h-6 w-6 text-${color}-600`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Pending Orders', value: stats.pendingOrders, icon: AlertCircle, color: 'yellow' },
          { label: 'Low Stock', value: stats.lowStock, icon: AlertCircle, color: 'red' },
          { label: 'New Customers', value: stats.newCustomers, icon: UserPlus, color: 'indigo' },
          { label: 'Support Tickets', value: stats.supportTickets, icon: MessageSquare, color: 'pink' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-lg shadow p-6 flex items-center">
            <div className={`flex-shrink-0 bg-${color}-100 rounded-lg p-3`}>
              <Icon className={`h-6 w-6 text-${color}-600`} />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{label}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">Recent Activity</h2>
        </div>
        <div className="p-6 space-y-4">
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
  );
};

export default Dashboard;
