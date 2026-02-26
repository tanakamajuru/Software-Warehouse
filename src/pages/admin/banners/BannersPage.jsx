import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Image as ImageIcon, ArrowUp, ArrowDown } from 'lucide-react';
import apiService from '../../../services/api';

const BannersPage = () => {
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    productId: '',
    position: 0,
    active: true
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [bannersData, productsData] = await Promise.all([
          apiService.getBanners(),
          apiService.getProducts()
        ]);

        const bannerArray = Array.isArray(bannersData) ? bannersData : (bannersData?.data || []);
        const productArray = Array.isArray(productsData) ? productsData : (productsData?.data || []);

        setBanners(bannerArray);
        setProducts(productArray);
      } catch (error) {
        console.error('Failed to fetch banners data:', error);
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
      position: 0,
      active: true
    });
    setSelectedBanner(null);
  };

  const handleAddBanner = async () => {
    try {
      const created = await apiService.createBanner(formData);
      const newBanner = created?.data || created;
      setBanners(prev => [...prev, newBanner].sort((a, b) => a.position - b.position));
      setShowAddModal(false);
      resetForm();
      showNotification('Banner created successfully!');
    } catch (error) {
      console.error('Failed to create banner:', error);
      showNotification('Failed to create banner: ' + error.message, 'error');
    }
  };

  const handleEditBanner = async () => {
    try {
      const updated = await apiService.updateBanner(selectedBanner._id || selectedBanner.id, formData);
      const updatedBanner = updated?.data || updated;
      setBanners(prev =>
        prev.map(b => (b._id || b.id) === (selectedBanner._id || selectedBanner.id) ? updatedBanner : b)
          .sort((a, b) => a.position - b.position)
      );
      setShowEditModal(false);
      resetForm();
      showNotification('Banner updated successfully!');
    } catch (error) {
      console.error('Failed to update banner:', error);
      showNotification('Failed to update banner: ' + error.message, 'error');
    }
  };

  const handleDeleteBanner = async (bannerId) => {
    if (!window.confirm('Are you sure you want to delete this banner?')) return;
    try {
      await apiService.deleteBanner(bannerId);
      setBanners(prev => prev.filter(b => (b._id || b.id) !== bannerId));
      showNotification('Banner deleted successfully!');
    } catch (error) {
      console.error('Failed to delete banner:', error);
      showNotification('Failed to delete banner: ' + error.message, 'error');
    }
  };

  const handleReorder = async (bannerId, direction) => {
    try {
      const currentIndex = banners.findIndex(b => (b._id || b.id) === bannerId);
      if (currentIndex === -1) return;

      const newBanners = [...banners];
      const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      if (targetIndex < 0 || targetIndex >= newBanners.length) return;

      // Swap positions
      [newBanners[currentIndex], newBanners[targetIndex]] = [newBanners[targetIndex], newBanners[currentIndex]];
      
      // Update positions
      newBanners.forEach((banner, index) => {
        banner.position = index;
      });

      // Call reorder API
      await apiService.reorderBanners({
        banners: newBanners.map(b => ({
          id: b._id || b.id,
          position: b.position
        }))
      });

      setBanners(newBanners);
      showNotification('Banners reordered successfully!');
    } catch (error) {
      console.error('Failed to reorder banners:', error);
      showNotification('Failed to reorder banners: ' + error.message, 'error');
    }
  };

  const openEditModal = (banner) => {
    setSelectedBanner(banner);
    setFormData({
      productId: banner.productId || '',
      position: banner.position || 0,
      active: banner.active !== false
    });
    setShowEditModal(true);
  };

  const filteredBanners = banners.filter(banner => {
    const product = products.find(p => (p._id || p.id) === banner.productId);
    if (!product) return false;
    
    const name = product.title || product.name || '';
    return name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const BannerModal = ({ isOpen, onClose, title, onSubmit, isEdit }) => {
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
                    {product.title || product.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
              <input
                type="number"
                min="0"
                max="4"
                value={formData.position}
                onChange={(e) => handleInputChange('position', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">Position 0-4 (max 5 banners)</p>
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
                Active (visible on homepage)
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
                {isEdit ? 'Update Banner' : 'Create Banner'}
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
              Banners ({filteredBanners.length}/5)
            </h2>
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search banners..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                disabled={banners.length >= 5}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Banner
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredBanners.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <ImageIcon className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No banners found</p>
              <p className="text-sm text-gray-400 mt-2">Add up to 5 promotional banners for your homepage</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Product
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
                {filteredBanners.map((banner, index) => {
                  const bid = banner._id || banner.id;
                  const product = products.find(p => (p._id || p.id) === banner.productId);
                  const productName = product ? (product.title || product.name) : 'Unknown Product';
                  
                  return (
                    <tr key={bid} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-gray-900">#{banner.position}</span>
                          <div className="flex flex-col">
                            <button
                              onClick={() => handleReorder(bid, 'up')}
                              disabled={index === 0}
                              className="text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Move up"
                            >
                              <ArrowUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleReorder(bid, 'down')}
                              disabled={index === filteredBanners.length - 1}
                              className="text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                              title="Move down"
                            >
                              <ArrowDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>
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
                            {product && (
                              <div className="text-xs text-gray-500">
                                ${product.price?.toFixed(2) || '0.00'}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          banner.active !== false ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {banner.active !== false ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => openEditModal(banner)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBanner(bid)}
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
      <BannerModal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); resetForm(); }}
        title="Add New Banner"
        onSubmit={handleAddBanner}
        isEdit={false}
      />

      <BannerModal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); resetForm(); }}
        title="Edit Banner"
        onSubmit={handleEditBanner}
        isEdit={true}
      />
    </div>
  );
};

export default BannersPage;
