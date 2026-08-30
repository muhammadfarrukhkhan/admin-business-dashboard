import axiosInstance, { shouldUseMockData } from './axiosConfig';

const mockUser = {
  id: 1,
  name: 'Farrukh Developer',
  email: 'farrukh@dashboard.com',
  role: 'Admin',
  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Farrukh',
};

const mockLogin = async (credentials) => {
  const { email, password } = credentials || {};

  if (!email || !password) {
    throw new Error('Email and password are required');
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { ...mockUser, email },
        token: `mock_token_${Date.now()}`,
      });
    }, 800);
  });
};

const mockLogout = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(null), 300);
  });
};

const mockCurrentUser = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockUser), 300);
  });
};

export const authService = {
  async login(credentials) {
    try {
      if (shouldUseMockData()) {
        return await mockLogin(credentials);
      }

      return await axiosInstance.post('/auth/login', credentials);
    } catch (error) {
      if (shouldUseMockData()) {
        throw new Error(error.message || 'Login failed');
      }

      throw new Error(error?.message || 'Login failed');
    }
  },

  async logout() {
    try {
      if (shouldUseMockData()) {
        return await mockLogout();
      }

      return await axiosInstance.post('/auth/logout');
    } catch (error) {
      if (shouldUseMockData()) {
        return await mockLogout();
      }

      throw new Error(error?.message || 'Logout failed');
    }
  },

  async getCurrentUser() {
    try {
      if (shouldUseMockData()) {
        return await mockCurrentUser();
      }

      return await axiosInstance.get('/auth/me');
    } catch (error) {
      if (shouldUseMockData()) {
        return await mockCurrentUser();
      }

      throw new Error(error?.message || 'Failed to fetch user');
    }
  },

  async refreshToken() {
    try {
      if (shouldUseMockData()) {
        const newToken = `mock_token_${Date.now()}`;
        localStorage.setItem('token', newToken);
        return { token: newToken };
      }

      const response = await axiosInstance.post('/auth/refresh');
      if (response?.token) {
        localStorage.setItem('token', response.token);
      }
      return response;
    } catch (error) {
      const newToken = `mock_token_${Date.now()}`;
      localStorage.setItem('token', newToken);
      return { token: newToken };
    }
  },

  async register(userData) {
    try {
      if (shouldUseMockData()) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (userData.email && userData.password && userData.name) {
              resolve({
                user: { ...mockUser, ...userData },
                token: `mock_token_${Date.now()}`,
              });
            } else {
              reject(new Error('Invalid registration data'));
            }
          }, 800);
        });
      }

      return await axiosInstance.post('/auth/register', userData);
    } catch (error) {
      throw new Error(error?.message || 'Registration failed');
    }
  },
};
