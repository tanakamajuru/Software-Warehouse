import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

const ProductModal = ({ isOpen, onClose, title, onSubmit, isEdit, formData, categories, brands, onInputChange, onFileChange }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
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
                onChange={(e) => onInputChange('title', e.target.value)}
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
                onChange={(e) => onInputChange('slug', e.target.value)}
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
                onChange={(e) => onInputChange('price', e.target.value)}
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
                onChange={(e) => onInputChange('priceAfterDiscount', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
              <select
                value={formData.categoryId}
                onChange={(e) => onInputChange('categoryId', e.target.value)}
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
                onChange={(e) => onInputChange('brandId', e.target.value)}
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
              onChange={(e) => onInputChange('description', e.target.value)}
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
              onChange={(e) => onFileChange('imageCover', e.target.files)}
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
              onChange={(e) => onFileChange('images', e.target.files)}
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
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {isEdit ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
