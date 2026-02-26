import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, Package, TrendingUp } from 'lucide-react';
import apiService from '../../../services/api';

const InventoryPage = () => {
  const [products, setProducts] = useState([]);
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [stockUpdates, setStockUpdates] = useState({});

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const productsData = await apiService.getProducts();
        const productArray = Array.isArray(productsData) ? productsData : (productsData?.data || []);
        
        setProducts(productArray);
        
        // Filter low stock products (stock < 20)
        const lowStock = productArray.filter(p => (p.stock || 0) < 20);
        setLowStockProducts(lowStock);
      } catch (error) {
        console.error('Failed to fetch inventory:', error);
        showNotification('Failed to load inventory data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, []);

  const handleStockUpdate = async (productId, newStock) => {
    try {
      await apiService.updateInventory(productId, { quantity: parseInt(newStock) });
      
      // Update local state
      setProducts(prev =>
        prev.map(p => (p._id || p.id) === productId ? { ...p, stock: parseInt(newStock) } : p)
      );
      
      // Update low stock products
      setLowStockProducts(prev =>
        prev.map(p => (p._id || p.id) === productId ? { ...p, stock: parseInt(newStock) } : p)
          .filter(p => (p.stock || 0) < 20)
      );
      
      // Clear the stock update input
      setStockUpdates(prev => ({ ...prev, [productId]: '' }));
      
      showNotification('Stock updated successfully!');
    } catch (error) {
      console.error('Failed to update stock:', error);
      showNotification('Failed to update stock: ' + error.message, 'error');
    }
  };

  const filteredProducts = products.filter(product => {
    const name = product.title || product.name || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const filteredLowStock = lowStockProducts.filter(product => {
    const name = product.title || product.name || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white text-sm font-medium transition-all ${
          notification.type === 'error' ? 'bg-red-500' : 'bg-green-500'
        }`}>
          {notification.message}
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
            <Package className="h-6 w-6 text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Total Products</p>
            <p className="text-2xl font-bold text-gray-900">{products.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="flex-shrink-0 bg-red-100 rounded-lg p-3">
            <AlertTriangle className="h-6 w-6 text-red-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">Low Stock Items</p>
            <p className="text-2xl font-bold text-gray-900">{lowStockProducts.length}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 flex items-center">
          <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">In Stock</p>
            <p className="text-2xl font-bold text-gray-900">
              {products.filter(p => (p.stock || 0) >= 20).length}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>
      </div>

      {/* Low Stock Alert */}
      {filteredLowStock.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600 mr-2" />
            <h3 className="text-lg font-medium text-red-800">Low Stock Alert</h3>
          </div>
          <p className="text-red-700 mt-2">
            {filteredLowStock.length} product(s) need restocking. Update inventory levels below.
          </p>
        </div>
      )}

      {/* Low Stock Products Table */}
      {filteredLowStock.length > 0 && (
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Low Stock Products</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Current Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Update Stock
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLowStock.map((product) => {
                  const pid = product._id || product.id;
                  const name = product.title || product.name || '—';
                  const currentStock = product.stock || 0;
                  
                  return (
                    <tr key={pid} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.imageCover && (
                            <img
                              className="h-8 w-8 rounded-lg object-cover flex-shrink-0 mr-3"
                              src={product.imageCover}
                              alt={name}
                            />
                          )}
                          <div className="text-sm font-medium text-gray-900">{name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          currentStock === 0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {currentStock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          currentStock === 0 ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {currentStock === 0 ? 'Out of Stock' : 'Low Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <input
                            type="number"
                            min="0"
                            placeholder="New quantity"
                            value={stockUpdates[pid] || ''}
                            onChange={(e) => setStockUpdates(prev => ({ ...prev, [pid]: e.target.value }))}
                            className="w-24 px-2 py-1 border border-gray-300 rounded-md text-sm"
                          />
                          <button
                            onClick={() => {
                              const newStock = stockUpdates[pid];
                              if (newStock && newStock !== currentStock.toString()) {
                                handleStockUpdate(pid, newStock);
                              }
                            }}
                            className="px-3 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700"
                          >
                            Update
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* All Products Inventory */}
      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-medium text-gray-900">All Products Inventory</h2>
        </div>
        <div className="overflow-x-auto">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No products found</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sales
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => {
                  const pid = product._id || product.id;
                  const name = product.title || product.name || '—';
                  const currentStock = product.stock || 0;
                  const sales = product.sales || 0;
                  
                  return (
                    <tr key={pid} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product.imageCover && (
                            <img
                              className="h-8 w-8 rounded-lg object-cover flex-shrink-0 mr-3"
                              src={product.imageCover}
                              alt={name}
                            />
                          )}
                          <div className="text-sm font-medium text-gray-900">{name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          currentStock === 0 ? 'bg-red-100 text-red-800' : 
                          currentStock < 20 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {currentStock}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          currentStock === 0 ? 'bg-red-100 text-red-800' : 
                          currentStock < 20 ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-green-100 text-green-800'
                        }`}>
                          {currentStock === 0 ? 'Out of Stock' : 
                           currentStock < 20 ? 'Low Stock' : 
                           'In Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {sales}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
