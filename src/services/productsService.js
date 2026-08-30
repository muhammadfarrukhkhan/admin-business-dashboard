// import axiosInstance from './axiosConfig';

// Mock data for products
const mockProducts = [
  {
    id: 1,
    name: 'Laptop Pro',
    category: 'Electronics',
    price: 1299.99,
    stock: 45,
    status: 'active',
    createdDate: '2023-01-15',
  },
  {
    id: 2,
    name: 'Wireless Mouse',
    category: 'Accessories',
    price: 29.99,
    stock: 120,
    status: 'active',
    createdDate: '2023-02-10',
  },
  {
    id: 3,
    name: 'USB-C Cable',
    category: 'Accessories',
    price: 15.99,
    stock: 0,
    status: 'out_of_stock',
    createdDate: '2023-03-05',
  },
  {
    id: 4,
    name: 'Monitor 4K',
    category: 'Electronics',
    price: 599.99,
    stock: 30,
    status: 'active',
    createdDate: '2023-04-20',
  },
  {
    id: 5,
    name: 'Keyboard Mechanical',
    category: 'Accessories',
    price: 149.99,
    stock: 65,
    status: 'active',
    createdDate: '2023-05-15',
  },
];

export const productsService = {
  /**
   * Get all products with pagination and filtering
   */
  async getAll(params = {}) {
    try {
      // REPLACE WITH REAL API:
      // return axiosInstance.get('/products', { params });
      
      const { current = 1, pageSize = 10, search = '', category = '' } = params;
      
      let filtered = [...mockProducts];
      
      if (search) {
        filtered = filtered.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      if (category) {
        filtered = filtered.filter((p) => p.category === category);
      }
      
      const start = (current - 1) * pageSize;
      const end = start + pageSize;
      
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            data: filtered.slice(start, end),
            total: filtered.length,
          });
        }, 300);
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch products');
    }
  },

  /**
   * Get single product by ID
   */
  async getById(id) {
    try {
      // REPLACE WITH REAL API:
      // return axiosInstance.get(`/products/${id}`);
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const product = mockProducts.find((p) => p.id === id);
          if (product) {
            resolve(product);
          } else {
            reject(new Error('Product not found'));
          }
        }, 200);
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch product');
    }
  },

  /**
   * Create new product
   */
  async create(productData) {
    try {
      // REPLACE WITH REAL API:
      // return axiosInstance.post('/products', productData);
      
      const newProduct = {
        id: Math.max(...mockProducts.map((p) => p.id)) + 1,
        ...productData,
        createdDate: new Date().toISOString().split('T')[0],
      };
      
      mockProducts.push(newProduct);
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(newProduct), 300);
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to create product');
    }
  },

  /**
   * Update product
   */
  async update(id, productData) {
    try {
      // REPLACE WITH REAL API:
      // return axiosInstance.put(`/products/${id}`, productData);
      
      const index = mockProducts.findIndex((p) => p.id === id);
      
      if (index === -1) {
        throw new Error('Product not found');
      }
      
      const updatedProduct = { ...mockProducts[index], ...productData };
      mockProducts[index] = updatedProduct;
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(updatedProduct), 300);
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to update product');
    }
  },

  /**
   * Delete product
   */
  async delete(id) {
    try {
      // REPLACE WITH REAL API:
      // return axiosInstance.delete(`/products/${id}`);
      
      const index = mockProducts.findIndex((p) => p.id === id);
      
      if (index === -1) {
        throw new Error('Product not found');
      }
      
      mockProducts.splice(index, 1);
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(id), 300);
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to delete product');
    }
  },

  /**
   * Get product categories (for filters)
   */
  async getCategories() {
    return new Promise((resolve) => {
      const categories = [...new Set(mockProducts.map((p) => p.category))];
      setTimeout(() => resolve(categories), 200);
    });
  },
};
