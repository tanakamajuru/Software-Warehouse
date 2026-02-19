const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

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

  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = this.getToken();
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
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
      
      // Handle the wrapped response structure
      if (!result.success) {
        throw new Error(result.message || 'API request failed');
      }
      
      return result.data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
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
    return this.request('/categories');
  }

  async getCategoryById(id) {
    return this.request(`/categories/${id}`);
  }

  async createCategory(categoryData) {
    return this.request('/categories', {
      method: 'POST',
      body: JSON.stringify(categoryData),
    });
  }

  async updateCategory(id, categoryData) {
    return this.request(`/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(categoryData),
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
    // Handle paginated response - return the data array
    return response.data || response;
  }

  async getProductById(id) {
    return this.request(`/products/${id}`);
  }

  async createProduct(productData) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  async updateProduct(id, productData) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Brands
  async getBrands() {
    return this.request('/brands');
  }

  async getBrandById(id) {
    return this.request(`/brands/${id}`);
  }

  async createBrand(brandData) {
    return this.request('/brands', {
      method: 'POST',
      body: JSON.stringify(brandData),
    });
  }

  async updateBrand(id, brandData) {
    return this.request(`/brands/${id}`, {
      method: 'PUT',
      body: JSON.stringify(brandData),
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
    return this.request('/banners');
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
      body: JSON.stringify({ bannerOrder }),
    });
  }

  // Discounts
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
    return this.request('/featured/recent');
  }

  async getLowStockFeatured() {
    // Since low stock endpoint doesn't exist in your API, return empty array
    return [];
  }

  async getTopBoughtProducts() {
    return this.request('/featured/top-bought');
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
