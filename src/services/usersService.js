// import axiosInstance from './axiosConfig';

// Mock data for users
const mockUsers = [
  {
    id: 1,
    name: 'Ahmed Ali',
    email: 'ahmed@example.com',
    status: 'active',
    role: 'Admin',
    joinDate: '2023-01-15',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ahmed',
  },
  {
    id: 2,
    name: 'Fatima Khan',
    email: 'fatima@example.com',
    status: 'active',
    role: 'Manager',
    joinDate: '2023-02-20',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Fatima',
  },
  {
    id: 3,
    name: 'Hassan Raza',
    email: 'hassan@example.com',
    status: 'inactive',
    role: 'User',
    joinDate: '2023-03-10',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Hassan',
  },
  {
    id: 4,
    name: 'Ayesha Malik',
    email: 'ayesha@example.com',
    status: 'active',
    role: 'Editor',
    joinDate: '2023-04-05',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ayesha',
  },
  {
    id: 5,
    name: 'Ali Hussain',
    email: 'ali@example.com',
    status: 'active',
    role: 'User',
    joinDate: '2023-05-12',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ali',
  },
];

export const usersService = {
  /**
   * Get all users with pagination
   */
  async getAll(params = {}) {
    try {
      // REPLACE WITH REAL API:
      // return axiosInstance.get('/users', { params });
      
      const { current = 1, pageSize = 10, search = '', role = '' } = params;
      
      let filtered = [...mockUsers];
      
      if (search) {
        filtered = filtered.filter(
          (u) =>
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase())
        );
      }
      
      if (role) {
        filtered = filtered.filter((u) => u.role === role);
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
      throw new Error(error.message || 'Failed to fetch users');
    }
  },

  /**
   * Get single user by ID
   */
  async getById(id) {
    try {
      // REPLACE WITH REAL API:
      // return axiosInstance.get(`/users/${id}`);
      
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const user = mockUsers.find((u) => u.id === id);
          if (user) {
            resolve(user);
          } else {
            reject(new Error('User not found'));
          }
        }, 200);
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch user');
    }
  },

  /**
   * Create new user
   */
  async create(userData) {
    try {
      // REPLACE WITH REAL API:
      // return axiosInstance.post('/users', userData);
      
      const newUser = {
        id: Math.max(...mockUsers.map((u) => u.id)) + 1,
        ...userData,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.name}`,
        joinDate: new Date().toISOString().split('T')[0],
      };
      
      mockUsers.push(newUser);
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(newUser), 300);
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to create user');
    }
  },

  /**
   * Update user
   */
  async update(id, userData) {
    try {
      // REPLACE WITH REAL API:
      // return axiosInstance.put(`/users/${id}`, userData);
      
      const index = mockUsers.findIndex((u) => u.id === id);
      
      if (index === -1) {
        throw new Error('User not found');
      }
      
      const updatedUser = { ...mockUsers[index], ...userData };
      mockUsers[index] = updatedUser;
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(updatedUser), 300);
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to update user');
    }
  },

  /**
   * Delete user
   */
  async delete(id) {
    try {
      // REPLACE WITH REAL API:
      // return axiosInstance.delete(`/users/${id}`);
      
      const index = mockUsers.findIndex((u) => u.id === id);
      
      if (index === -1) {
        throw new Error('User not found');
      }
      
      mockUsers.splice(index, 1);
      
      return new Promise((resolve) => {
        setTimeout(() => resolve(id), 300);
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to delete user');
    }
  },
};
