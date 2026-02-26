//const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.ecommerce.com/api/v1';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://engine.softwarewarehouse.co.zw/api/v1';

class ApiService {
  // Auth helper methods
  getToken() {
    return localStorage.getItem('authToken');
  }

  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }

  isAuthenticated() {
    return !!this.getToken();
  }

  // Helper method to convert relative image URLs to full URLs
  getImageUrl(imagePath) {
    if (!imagePath) return '';
    
    // If already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // Remove leading slash and construct full URL
    const cleanPath = imagePath.startsWith('/') ? imagePath.slice(1) : imagePath;
    const baseUrl = API_BASE_URL.replace('/api/v1', '');
    
    // If path already includes 'uploads/', just prepend base URL
    if (cleanPath.startsWith('uploads/')) {
      return `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}${cleanPath}`;
    }
    
    // Otherwise, assume it's in uploads directory
    return `${baseUrl}${baseUrl.endsWith('/') ? '' : '/'}uploads/${cleanPath}`;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();
    
    // Handle FormData (file uploads)
    const isFormData = options.body instanceof FormData;
    
    const config = {
      headers: {
        ...(token && { 'Authorization': `Bearer ${token}` }),
        // Don't set Content-Type for FormData - browser sets it with boundary
        ...(!isFormData && { 'Content-Type': 'application/json' }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Handle wrapped response structure
      if (result.success === false) {
        throw new Error(result.message || 'API request failed');
      }
      
      // Process image URLs and fix stringified arrays in the response data
      const processedData = this.processImageUrlsAndArrays(result.data);
      
      return processedData;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Helper method to process image URLs and fix stringified arrays in API response data
  processImageUrlsAndArrays(data) {
    if (!data) return data;
    
    // Handle different data structures
    const processItem = (item) => {
      if (!item) return item;
      
      // Process image field
      if (item.image) {
        item.image = this.getImageUrl(item.image);
      }
      
      // Process imageCover field
      if (item.imageCover) {
        const originalImageCover = item.imageCover;
        item.imageCover = this.getImageUrl(item.imageCover);
        console.log('Image processing:', {
          original: originalImageCover,
          processed: item.imageCover
        });
      }
      
      // Process images array - handle stringified JSON
      if (item.images) {
        if (typeof item.images === 'string') {
          try {
            const parsedImages = JSON.parse(item.images);
            console.log('Parsed images array:', parsedImages);
            item.images = parsedImages;
          } catch (e) {
            console.warn('Failed to parse images JSON:', item.images);
            item.images = [];
          }
        }
        // Process image URLs in the array
        if (Array.isArray(item.images)) {
          item.images = item.images.map(img => {
            const processedImg = this.getImageUrl(img);
            console.log('Processing image in array:', {
              original: img,
              processed: processedImg
            });
            return processedImg;
          });
        }
      }
      
      return item;
    };
    
    // Handle arrays of items
    if (Array.isArray(data)) {
      return data.map(processItem);
    }
    
    // Handle paginated response
    if (data.data && Array.isArray(data.data)) {
      return {
        ...data,
        data: data.data.map(processItem)
      };
    }
    
    // Handle single item
    return processItem(data);
  }

  // Helper method to process image URLs in API response data
  processImageUrls(data) {
    if (!data) return data;
    
    // Handle different data structures
    const processItem = (item) => {
      if (!item) return item;
      
      // Process image field
      if (item.image) {
        item.image = this.getImageUrl(item.image);
      }
      
      // Process imageCover field
      if (item.imageCover) {
        item.imageCover = this.getImageUrl(item.imageCover);
      }
      
      // Process nested images array
      if (item.images && Array.isArray(item.images)) {
        item.images = item.images.map(img => this.getImageUrl(img));
      }
      
      return item;
    };
    
    // Handle arrays of items
    if (Array.isArray(data)) {
      return data.map(processItem);
    }
    
    // Handle paginated response
    if (data.data && Array.isArray(data.data)) {
      return {
        ...data,
        data: data.data.map(processItem)
      };
    }
    
    // Handle single item
    return processItem(data);
  }

  // User Management (Admin only)
  async getUsers() {
    return this.request('/users');
  }

  async getUserById(id) {
    return this.request(`/users/${id}`);
  }

  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async updateUser(id, userData) {
    return this.request(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async deleteUser(id) {
    return this.request(`/users/${id}`, {
      method: 'DELETE',
    });
  }

  async changeUserRole(id, role) {
    return this.request(`/users/${id}/role`, {
      method: 'PUT',
      body: JSON.stringify({ role }),
    });
  }

  // Categories
  async getCategories() {
    const response = await this.request('/categories');
    // Handle different response structures
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response)) {
      return response;
    }
    return response.data || response;
  }

  async getCategoryById(id) {
    return this.request(`/categories/${id}`);
  }

  async createCategory(categoryData) {
    return this.request('/categories', {
      method: 'POST',
      body: categoryData, // Expect FormData for file uploads
    });
  }

  async updateCategory(id, categoryData) {
    return this.request(`/categories/${id}`, {
      method: 'PUT',
      body: categoryData, // Expect FormData for file uploads
    });
  }

  async deleteCategory(id) {
    return this.request(`/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // Subcategories
  async getSubcategories() {
    return this.request('/subcategories');
  }

  async getSubcategoriesByCategory(categoryId) {
    return this.request(`/subcategories/by-category/${categoryId}`);
  }

  async getSubcategoryById(id) {
    return this.request(`/subcategories/${id}`);
  }

  async createSubcategory(subcategoryData) {
    return this.request('/subcategories', {
      method: 'POST',
      body: JSON.stringify(subcategoryData),
    });
  }

  async updateSubcategory(id, subcategoryData) {
    return this.request(`/subcategories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(subcategoryData),
    });
  }

  async deleteSubcategory(id) {
    return this.request(`/subcategories/${id}`, {
      method: 'DELETE',
    });
  }

  // Products
  async getProducts(params = {}) {
    const queryString = new URLSearchParams(params).toString();
    const response = await this.request(`/products${queryString ? `?${queryString}` : ''}`);
    // Handle different response structures
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response)) {
      return response;
    } else if (response.data && response.data.data && Array.isArray(response.data.data)) {
      return response.data.data;
    }
    return response.data || response;
  }

  async getProductById(id) {
    return this.request(`/products/${id}`);
  }

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: productData, // Expect FormData for file uploads
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: productData, // Expect FormData for file uploads
    });
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Brands
  async getBrands() {
    const response = await this.request('/brands');
    // Handle different response structures
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response)) {
      return response;
    }
    return response.data || response;
  }

  async getBrandById(id) {
    return this.request(`/brands/${id}`);
  }

  async createBrand(brandData) {
    return this.request('/brands', {
      method: 'POST',
      body: brandData, // Expect FormData for file uploads
    });
  }

  async updateBrand(id, brandData) {
    return this.request(`/brands/${id}`, {
      method: 'PUT',
      body: brandData, // Expect FormData for file uploads
    });
  }

  async deleteBrand(id) {
    return this.request(`/brands/${id}`, {
      method: 'DELETE',
    });
  }

  // Inventory
  async getInventory(productId) {
    return this.request(`/inventory/products/${productId}`);
  }

  async checkProductAvailability(productId) {
    return this.request(`/inventory/check-availability/${productId}`, {
      method: 'POST',
      body: JSON.stringify({ quantity: 1 })
    });
  }

  async getLowStockProducts() {
    return this.request('/inventory/low-stock');
  }

  async updateInventory(productId, inventoryData) {
    return this.request(`/inventory/update/${productId}`, {
      method: 'PUT',
      body: JSON.stringify(inventoryData),
    });
  }

  // Banners
  async getBanners() {
    const response = await this.request('/banners');
    // Handle different response structures
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response)) {
      return response;
    }
    return response.data || response;
  }

  async createBanner(bannerData) {
    return this.request('/banners', {
      method: 'POST',
      body: JSON.stringify(bannerData),
    });
  }

  async updateBanner(id, bannerData) {
    return this.request(`/banners/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bannerData),
    });
  }

  async deleteBanner(id) {
    return this.request(`/banners/${id}`, {
      method: 'DELETE',
    });
  }

  async reorderBanners(bannerOrder) {
    return this.request('/banners/reorder', {
      method: 'POST',
      body: JSON.stringify({ banners: bannerOrder }),
    });
  }

  // Discounts
  async getDiscounts() {
    const response = await this.request('/discounts');
    // Handle different response structures
    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else if (Array.isArray(response)) {
      return response;
    }
    return response.data || response;
  }

  async getTopDiscounts() {
    return this.request('/discounts/top');
  }

  async createDiscount(discountData) {
    return this.request('/discounts', {
      method: 'POST',
      body: JSON.stringify(discountData),
    });
  }

  async updateDiscount(id, discountData) {
    return this.request(`/discounts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(discountData),
    });
  }

  async deleteDiscount(id) {
    return this.request(`/discounts/${id}`, {
      method: 'DELETE',
    });
  }

  // Featured Products
  async getRecentProducts() {
    // Fallback to regular products with limit since featured endpoint doesn't exist
    return this.request('/products?limit=8');
  }

  async getLowStockFeatured() {
    return this.request('/inventory/low-stock');
  }

  async getTopBoughtProducts() {
    // Fallback to regular products with limit since featured endpoint doesn't exist
    return this.request('/products?limit=8');
  }

  // Authentication
  async login(email, password) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    // Store token if available
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.userId,
        email: response.email,
        name: response.name
      }));
    }
    return response;
  }

  async signup(userData) {
    const response = await this.request('/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    // Store token if available
    if (response.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('user', JSON.stringify({
        id: response.userId,
        email: response.email
      }));
    }
    return response;
  }

  async forgotPassword(email) {
    return this.request('/forgotPassword', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async verifyResetCode(resetCode) {
    return this.request('/verifyResetCode', {
      method: 'POST',
      body: JSON.stringify({ resetCode }),
    });
  }

  async resetPassword(email, newPassword) {
    return this.request('/resetPassword', {
      method: 'PUT',
      body: JSON.stringify({ email, newPassword }),
    });
  }

  // Health check
  async healthCheck() {
    return this.request('/health');
  }
}

export default new ApiService();
