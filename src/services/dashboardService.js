// import axiosInstance from './axiosConfig';

const mockStats = {
  totalRevenue: '$45,231.89',
  totalRevenueTrend: 20.1,
  totalUsers: '2,341',
  totalUsersTrend: 15,
  totalOrders: '12,543',
  totalOrdersTrend: 8.2,
  conversionRate: '2.4%',
  conversionRateTrend: -4.3,
};

const mockChartData = [
  { month: 'Jan', revenue: 4000, users: 2400, orders: 2210 },
  { month: 'Feb', revenue: 3000, users: 1398, orders: 2210 },
  { month: 'Mar', revenue: 2000, users: 9800, orders: 2290 },
  { month: 'Apr', revenue: 2780, users: 3908, orders: 2000 },
  { month: 'May', revenue: 1890, users: 4800, orders: 2181 },
  { month: 'Jun', revenue: 2390, users: 3800, orders: 2500 },
  { month: 'Jul', revenue: 3490, users: 4300, orders: 2100 },
];

export const dashboardService = {
  /**
   * Fetch dashboard statistics
   * Initially returns mock data
   * Later can be replaced with real API call
   */
  async getStats() {
    try {
      // REPLACE THIS WITH REAL API WHEN READY:
      // return axiosInstance.get('/dashboard/stats');
      
      // Currently returning mock data
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockStats), 500);
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch dashboard stats');
    }
  },

  /**
   * Fetch chart data
   */
  async getChartData() {
    try {
      // REPLACE THIS WITH REAL API WHEN READY:
      // return axiosInstance.get('/dashboard/chart-data');
      
      // Currently returning mock data
      return new Promise((resolve) => {
        setTimeout(() => resolve(mockChartData), 500);
      });
    } catch (error) {
      throw new Error(error.message || 'Failed to fetch chart data');
    }
  },

  /**
   * Fetch recent activities
   */
  async getRecentActivities() {
    return new Promise((resolve) => {
      const activities = [
        { id: 1, user: 'John Doe', action: 'Created new project', timestamp: new Date(Date.now() - 3600000) },
        { id: 2, user: 'Jane Smith', action: 'Updated profile', timestamp: new Date(Date.now() - 7200000) },
        { id: 3, user: 'Bob Johnson', action: 'Completed task', timestamp: new Date(Date.now() - 10800000) },
      ];
      setTimeout(() => resolve(activities), 300);
    });
  },
};
