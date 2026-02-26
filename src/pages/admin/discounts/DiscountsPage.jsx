import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Tag, Calendar, Percent } from 'lucide-react';
import apiService from '../../../services/api';

const DiscountsPage = () => {
  const [discounts, setDiscounts] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    productId: '',
    discountPercentage: 0,
    discountStartDate: '',
    discountEndDate: '',
    active: true
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [discountsData, productsData] = await Promise.all([
          apiService.getDiscounts(),
          apiService.getProducts()
        ]);

        const discountArray = Array.isArray(discountsData) ? discountsData : (discountsData?.data || []);
        const productArray = Array.isArray(productsData) ? productsData : (productsData?.data || []);

        setDiscounts(discountArray);
        setProducts(productArray);
      } catch (error) {
        console.error('Failed to fetch discounts data:', error);
        showNotification('Failed to load data', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      productId: '',
      discountPercentage: 0,
      discountStartDate: '',
      discountEndDate: '',
      active: true
    });
    setSelectedDiscount(null);
  };

  const handleAddDiscount = async () => {
    try {
      const created = await apiService.createDiscount(formData);
      const newDiscount = created?.data || created;
      setDiscounts(prev => [...prev, newDiscount]);
      setShowAddModal(false);
      resetForm();
      showNotification('Discount created successfully!');
    } catch (error) {
      console.error('Failed to create discount:', error);
      showNotification('Failed to create discount: ' + error.message, 'error');
    }
  };

  const handleEditDiscount = async () => {
    try {
      const updated = await apiService.updateDiscount(selectedDiscount._id || selectedDiscount.id, formData);
      const updatedDiscount = updated?.data || updated;
      setDiscounts(prev =>
        prev.map(d => (d._id || d.id) === (selectedDiscount._id || selectedDiscount.id) ? updatedDiscount : d)
      );
      setShowEditModal(false);
      resetForm();
      showNotification('Discount updated successfully!');
    } catch (error) {
      console.error('Failed to update discount:', error);
      showNotification('Failed to update discount: ' + error.message, 'error');
    }
  };

  const handleDeleteDiscount = async (discountId) => {
    if (!window.confirm('Are you sure you want to delete this discount?')) return;
    try {
      await apiService.deleteDiscount(discountId);
      setDiscounts(prev => prev.filter(d => (d._id || d.id) !== discountId));
      showNotification('Discount deleted successfully!');
    } catch (error) {
      console.error('Failed to delete discount:', error);
      showNotification('Failed to delete discount: ' + error.message, 'error');
    }
  };

  const openEditModal = (discount) => {
    setSelectedDiscount(discount);
    setFormData({
      productId: discount.productId || '',
      discountPercentage: discount.discountPercentage || 0,
      discountStartDate: discount.discountStartDate ? new Date(discount.discountStartDate).toISOString().split('T')[0] : '',
      discountEndDate: discount.discountEndDate ? new Date(discount.discountEndDate).toISOString().split('T')[0] : '',
      active: discount.active !== false
    });
    setShowEditModal(true);
  };

  const filteredDiscounts = discounts.filter(discount => {
    const product = products.find(p => (p._id || p.id) === discount.productId);
    if (!product) return false;
    
    const name = product.title || product.name || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const isDiscountExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const getDiscountStatus = (discount) => {
    if (discount.active === false) return { text: 'Inactive', class: 'bg-gray-100 text-gray-800' };
    if (isDiscountExpired(discount.discountEndDate)) return { text: 'Expired', class: 'bg-red-100 text-red-800' };
    return { text: 'Active', class: 'bg-green-100 text-green-800' };
  };

  const DiscountModal = ({ isOpen, onClose, title, onSubmit, isEdit }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <Trash2 className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product *</label>
              <select
                value={formData.productId}
                onChange={(e) => handleInputChange('productId', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Product</option>
                {products.map(product => (
                  <option key={product._id || product.id} value={product._id || product.id}>
                    {product.title || product.name} - ${product.price?.toFixed(2) || '0.00'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Discount Percentage (%) *</label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={formData.discountPercentage}
                onChange={(e) => handleInputChange('discountPercentage', parseFloat(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                value={formData.discountStartDate}
                onChange={(e) => handleInputChange('discountStartDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
              <input
                type="date"
                value={formData.discountEndDate}
                onChange={(e) => handleInputChange('discountEndDate', e.target.value)}
                min={formData.discountStartDate}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="active"
                checked={formData.active}
                onChange={(e) => handleInputChange('active', e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="active" className="ml-2 block text-sm text-gray-900">
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
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {isEdit ? 'Update Discount' : 'Create Discount'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

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

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">
              Discounts ({filteredDiscounts.length})
            </h2>
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search discounts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Discount
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredDiscounts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Tag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No discounts found</p>
              <p className="text-sm text-gray-400 mt-2">Create promotional discounts for your products</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Discount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDiscounts.map((discount) => {
                  const did = discount._id || discount.id;
                  const product = products.find(p => (p._id || p.id) === discount.productId);
                  const productName = product ? (product.title || product.name) : 'Unknown Product';
                  const status = getDiscountStatus(discount);
                  
                  return (
                    <tr key={did} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product?.imageCover && (
                            <img
                              className="h-8 w-8 rounded-lg object-cover flex-shrink-0 mr-3"
                              src={product.imageCover}
                              alt={productName}
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">{productName}</div>
                            <div className="text-xs text-gray-500">
                              ${product?.price?.toFixed(2) || '0.00'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Percent className="w-4 h-4 text-green-600 mr-2" />
                          <span className="text-sm font-medium text-gray-900">
                            {discount.discountPercentage}%
                          </span>
                          {product && (
                            <span className="ml-2 text-xs text-gray-500">
                              (${(product.price * discount.discountPercentage / 100).toFixed(2)} off)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                            {new Date(discount.discountStartDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center text-xs text-gray-500">
                            <ArrowDown className="w-3 h-3 mr-1" />
                            {new Date(discount.discountEndDate).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${status.class}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => openEditModal(discount)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDiscount(did)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Modals */}
      <DiscountModal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); resetForm(); }}
        title="Add New Discount"
        onSubmit={handleAddDiscount}
        isEdit={false}
      />

      <DiscountModal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); resetForm(); }}
        title="Edit Discount"
        onSubmit={handleEditDiscount}
        isEdit={true}
      />
    </div>
  );
};

export default DiscountsPage;
