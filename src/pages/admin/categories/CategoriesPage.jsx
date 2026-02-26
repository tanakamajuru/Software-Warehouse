import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Tag } from 'lucide-react';
import apiService from '../../../services/api';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [notification, setNotification] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: null
  });

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await apiService.getCategories();
        const categoryArray = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data || []);
        setCategories(categoryArray);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
        showNotification('Failed to load categories', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => {
      const updated = { ...prev, [field]: value };
      // Auto-generate slug from name
      if (field === 'name') {
        updated.slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '').trim();
      }
      return updated;
    });
  };

  const handleFileChange = (file) => {
    setFormData(prev => ({ ...prev, image: file }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: null
    });
    setSelectedCategory(null);
  };

  const handleAddCategory = async () => {
    try {
      const data = new FormData();
      if (formData.name) data.append('name', formData.name);
      if (formData.slug) data.append('slug', formData.slug);
      if (formData.description) data.append('description', formData.description);
      if (formData.image) data.append('image', formData.image);

      const created = await apiService.createCategory(data);
      const newCategory = created?.data || created;
      setCategories(prev => [...prev, newCategory]);
      setShowAddModal(false);
      resetForm();
      showNotification('Category created successfully!');
    } catch (error) {
      console.error('Failed to create category:', error);
      showNotification('Failed to create category: ' + error.message, 'error');
    }
  };

  const handleEditCategory = async () => {
    try {
      const data = new FormData();
      if (formData.name) data.append('name', formData.name);
      if (formData.slug) data.append('slug', formData.slug);
      if (formData.description) data.append('description', formData.description);
      if (formData.image) data.append('image', formData.image);

      const updated = await apiService.updateCategory(selectedCategory._id || selectedCategory.id, data);
      const updatedCategory = updated?.data || updated;
      setCategories(prev =>
        prev.map(c => (c._id || c.id) === (selectedCategory._id || selectedCategory.id) ? updatedCategory : c)
      );
      setShowEditModal(false);
      resetForm();
      showNotification('Category updated successfully!');
    } catch (error) {
      console.error('Failed to update category:', error);
      showNotification('Failed to update category: ' + error.message, 'error');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('Are you sure you want to delete this category?')) return;
    try {
      await apiService.deleteCategory(categoryId);
      setCategories(prev => prev.filter(c => (c._id || c.id) !== categoryId));
      showNotification('Category deleted successfully!');
    } catch (error) {
      console.error('Failed to delete category:', error);
      showNotification('Failed to delete category: ' + error.message, 'error');
    }
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name || '',
      slug: category.slug || '',
      description: category.description || '',
      image: null
    });
    setShowEditModal(true);
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CategoryModal = ({ isOpen, onClose, title, onSubmit, isEdit }) => {
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Image {isEdit ? '(leave empty to keep existing)' : ''}
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
                {isEdit ? 'Update Category' : 'Create Category'}
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
              Categories ({filteredCategories.length})
            </h2>
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search categories..."
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
                Add Category
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Tag className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>No categories found</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredCategories.map((category) => {
                  const cid = category._id || category.id;
                  return (
                    <tr key={cid} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {category.image && (
                            <img
                              className="h-8 w-8 rounded-lg object-cover flex-shrink-0 mr-3"
                              src={category.image}
                              alt={category.name}
                            />
                          )}
                          <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {category.slug}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        <div className="max-w-xs truncate">{category.description || '—'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => openEditModal(category)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(cid)}
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
      <CategoryModal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); resetForm(); }}
        title="Add New Category"
        onSubmit={handleAddCategory}
        isEdit={false}
      />

      <CategoryModal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); resetForm(); }}
        title="Edit Category"
        onSubmit={handleEditCategory}
        isEdit={true}
      />
    </div>
  );
};

export default CategoriesPage;
