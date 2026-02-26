import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Search, Package } from 'lucide-react';
import apiService from '../../../services/api';
import ProductModal from './ProductModal';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
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

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData, brandsData] = await Promise.all([
          apiService.getProducts(),
          apiService.getCategories(),
          apiService.getBrands()
        ]);

        const productArray = Array.isArray(productsData) ? productsData : (productsData?.data || []);
        const categoryArray = Array.isArray(categoriesData) ? categoriesData : (categoriesData?.data || []);
        const brandArray = Array.isArray(brandsData) ? brandsData : (brandsData?.data || []);

        setProducts(productArray);
        setCategories(categoryArray);
        setBrands(brandArray);
      } catch (error) {
        console.error('Failed to fetch products data:', error);
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

  const filteredProducts = products.filter(product => {
    const name = product.title || product.name || '';
    const cat = product.category?.name || product.categoryId || '';
    return (
      name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.toLowerCase().includes(searchTerm.toLowerCase())
    );
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

      <div className="bg-white shadow rounded-lg">
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">
              Products ({filteredProducts.length})
            </h2>
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
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
                Add Product
              </button>
            </div>
          </div>
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
                  {['Product', 'Category', 'Price', 'Disc. Price', 'Brand', 'Actions'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => {
                  const pid = product._id || product.id;
                  const name = product.title || product.name || '—';
                  const cover = product.imageCover || product.image;
                  const categoryName = product.category?.name || product.categoryId || '—';
                  const brandName = product.brand?.name || product.brandId || '—';
                  return (
                    <tr key={pid} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {cover ? (
                            <img
                              className="h-10 w-10 rounded-lg object-cover flex-shrink-0"
                              src={cover}
                              alt={name}
                              onError={(e) => { e.target.style.display = 'none'; }}
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <Package className="w-5 h-5 text-gray-400" />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{name}</div>
                            {product.description && (
                              <div className="text-xs text-gray-400 truncate max-w-xs">
                                {product.description.substring(0, 50)}...
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {categoryName}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${product.price?.toFixed(2) ?? '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.priceAfterDiscount ? `$${product.priceAfterDiscount.toFixed(2)}` : '—'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {brandName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => openEditModal(product)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(pid)}
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
      <ProductModal
        isOpen={showAddModal}
        onClose={() => { setShowAddModal(false); resetForm(); }}
        title="Add New Product"
        onSubmit={handleAddProduct}
        isEdit={false}
        formData={formData}
        categories={categories}
        brands={brands}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
      />

      <ProductModal
        isOpen={showEditModal}
        onClose={() => { setShowEditModal(false); resetForm(); }}
        title="Edit Product"
        onSubmit={handleEditProduct}
        isEdit={true}
        formData={formData}
        categories={categories}
        brands={brands}
        onInputChange={handleInputChange}
        onFileChange={handleFileChange}
      />
    </div>
  );
};

export default ProductsPage;
