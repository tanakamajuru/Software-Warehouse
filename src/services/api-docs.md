# Zimbabwe Software Company - API Service Documentation

## Complete API Endpoint Coverage

### 🔐 Authentication
- `POST /signup` - Create new user account
- `POST /login` - Login with existing credentials
- `POST /forgotPassword` - Request password reset code
- `POST /verifyResetCode` - Verify reset code validity
- `PUT /resetPassword` - Reset password with new credentials

### 👥 User Management (Admin Only)
- `GET /users` - Get all users
- `GET /users/{id}` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/{id}` - Update user details
- `DELETE /users/{id}` - Delete user
- `PUT /users/{id}/role` - Change user role

### 📁 Categories
- `GET /categories` - Get all categories
- `GET /categories/{id}` - Get single category
- `POST /categories` - Create new category (Admin)
- `PUT /categories/{id}` - Update category (Admin/Manager)
- `DELETE /categories/{id}` - Delete category (Admin)

### 📂 Subcategories
- `GET /subcategories` - Get all subcategories
- `GET /subcategories/{id}` - Get single subcategory
- `GET /subcategories/by-category/{categoryId}` - Get subcategories by category
- `POST /subcategories` - Create new subcategory (Admin)
- `PUT /subcategories/{id}` - Update subcategory (Admin/Manager)
- `DELETE /subcategories/{id}` - Delete subcategory (Admin)

### 🏷️ Brands
- `GET /brands` - Get all brands
- `GET /brands/{id}` - Get single brand
- `POST /brands` - Create new brand (Admin)
- `PUT /brands/{id}` - Update brand (Admin/Manager)
- `DELETE /brands/{id}` - Delete brand (Admin)

### 💻 Products
- `GET /products` - Get all products (with pagination)
- `GET /products/{id}` - Get single product
- `POST /products` - Create new product (Admin)
- `PUT /products/{id}` - Update product (Admin/Manager)
- `DELETE /products/{id}` - Delete product (Admin)

### 📦 Inventory Management
- `GET /inventory/products/{productId}` - Get inventory for product
- `GET /inventory/low-stock` - Get low stock products (Admin/Manager)
- `POST /inventory/check-availability/{productId}` - Check product availability
- `PUT /inventory/update/{productId}` - Update inventory (Admin/Manager)

### 🎯 Banners (Max 5)
- `GET /banners` - Get all active banners with product details
- `POST /banners` - Create new banner (Admin)
- `PUT /banners/{id}` - Update banner (Admin)
- `DELETE /banners/{id}` - Delete banner (Admin)
- `POST /banners/reorder` - Reorder banners (Admin)

### 💰 Discounts (Auto-removes expired)
- `GET /discounts/top` - Get top 5 discounted products
- `POST /discounts` - Create new discount (Admin)
- `PUT /discounts/{id}` - Update discount (Admin)
- `DELETE /discounts/{id}` - Delete discount (Admin)

### ⭐ Featured Products (Max 5 each)
- `GET /featured/recent` - Get recently added products
- `GET /featured/low-stock` - Get low stock products
- `GET /featured/top-bought` - Get top bought products

### 🔧 Utilities
- `GET /health` - Health check

## Usage Examples

### Authentication
```javascript
// Login
const user = await apiService.login('user@example.com', 'password');

// Check auth status
if (apiService.isAuthenticated()) {
  const currentUser = apiService.getUser();
}

// Logout
apiService.logout();
```

### Product Management
```javascript
// Get products with pagination
const products = await apiService.getProducts({ page: 1, limit: 20 });

// Create new product (Admin)
const newProduct = await apiService.createProduct({
  title: 'Accounting Software Pro',
  description: 'Complete accounting solution',
  price: 299.99,
  categoryId: 'category-uuid'
});
```

### Inventory Management
```javascript
// Check product availability
const availability = await apiService.checkProductAvailability(productId);

// Update inventory (Admin/Manager)
await apiService.updateInventory(productId, {
  quantity: 100,
  restockLevel: 20
});
```

### Banner Management
```javascript
// Get all banners
const banners = await apiService.getBanners();

// Create new banner (Admin)
await apiService.createBanner({
  productId: 'product-uuid',
  position: 1
});

// Reorder banners (Admin)
await apiService.reorderBanners([
  { id: 'banner-1', position: 1 },
  { id: 'banner-2', position: 2 }
]);
```

## Response Structure

All endpoints follow this structure:
```javascript
{
  "success": true,
  "message": "Operation successful",
  "data": {} // Response data or null
}
```

## Authentication

Protected endpoints automatically include the Bearer token:
```javascript
Authorization: Bearer <jwt-token>
```

## Error Handling

```javascript
try {
  const result = await apiService.getCategories();
} catch (error) {
  console.error('API Error:', error.message);
  // Error message comes from backend response.message
}
```

## Zimbabwe Software Company Features

- **Local Business Focus**: Categories and products tailored for Zimbabwean market
- **ZIMRA Compliance**: Accounting software compliant with Zimbabwe Revenue Authority
- **Local Currency Support**: Ready for USD/ZWL pricing
- **Educational Integration**: Software aligned with Zimbabwe curriculum
- **SME Solutions**: Business management tools for small and medium enterprises
