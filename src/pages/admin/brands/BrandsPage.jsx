import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Package } from 'lucide-react';
import apiService from '../../../services/api';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    image: null
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const brandsData = await apiService.getBrands();
        const brandArray = Array.isArray(brandsData) ? brandsData : (brandsData?.data || []);
        setBrands(brandArray);
      } catch (error) {
        console.error('Failed to fetch brands:', error);
        showNotification('Failed to load brands', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (file) => {
    setFormData(prev => ({ ...prev, image: file }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      image: null
    });
    setSelectedBrand(null);
  };

  const handleAddBrand = async () => {
    try {
      const data = new FormData();
      if (formData.name) data.append('name', formData.name);
      if (formData.image) data.append('image', formData.image);

      const created = await apiService.createBrand(data);
      const newBrand = created?.data || created;
      setBrands(prev => [...prev, newBrand]);
      setShowAddModal(false);
      resetForm();
      showNotification('Brand created successfully!');
    } catch (error) {
      console.error('Failed to create brand:', error);
      showNotification('Failed to create brand: ' + error.message, 'error');
    }
  };

  const handleEditBrand = async () => {
    try {
      const data = new FormData();
      if (formData.name) data.append('name', formData.name);
      if (formData.image) data.append('image', formData.image);

      const updated = await apiService.updateBrand(selectedBrand._id || selectedBrand.id, data);
      const updatedBrand = updated?.data || updated;
      setBrands(prev =>
        prev.map(b => (b._id || b.id) === (selectedBrand._id || selectedBrand.id) ? updatedBrand : b)
      );
      setShowEditModal(false);
      resetForm();
      showNotification('Brand updated successfully!');
    } catch (error) {
      console.error('Failed to update brand:', error);
      showNotification('Failed to update brand: ' + error.message, 'error');
    }
  };

  const handleDeleteBrand = async (brandId) => {
    if (!window.confirm('Are you sure you want to delete this brand?')) return;
    try {
      await apiService.deleteBrand(brandId);
      setBrands(prev => prev.filter(b => (b._id || b.id) !== brandId));
      showNotification('Brand deleted successfully!');
    } catch (error) {
      console.error('Failed to delete brand:', error);
      showNotification('Failed to delete brand: ' + error.message, 'error');
    }
  };

  const openEditModal = (brand) => {
    setSelectedBrand(brand);
    setFormData({
      name: brand.name || '',
      image: null
    });
    setShowEditModal(true);
  };

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const BrandModal = ({ isOpen, onClose, title, onSubmit, isEdit }) => {
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Logo {isEdit ? '(leave empty to keep existing)' : ''}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e.target.files[0])}
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
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {isEdit ? 'Update Brand' : 'Create Brand'}
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
              Brands ({filteredBrands.length})
            </h2>
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search brands..."
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
                Add Brand
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredBrands.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No brands found</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBrands.map((brand) => {
                  const bid = brand._id || brand.id;
                  return (
                    <tr key={bid} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {brand.image && (
                            <img
                              className="h-8 w-8 rounded-lg object-cover flex-shrink-0 mr-3"
                              src={brand.image}
                              alt={brand.name}
                            />
                          )}
                          <div className="text-sm font-medium text-gray-900">{brand.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => openEditModal(brand)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBrand(bid)}
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
      <BrandModal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); resetForm(); }}
        title="Add New Brand"
        onSubmit={handleAddBrand}
        isEdit={false}
      />

      <BrandModal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); resetForm(); }}
        title="Edit Brand"
        onSubmit={handleEditBrand}
        isEdit={true}
      />
    </div>
  );
};

export default BrandsPage;
