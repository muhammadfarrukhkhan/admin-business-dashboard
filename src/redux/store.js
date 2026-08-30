import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';
import usersReducer from './slices/usersSlice';
import productsReducer from './slices/productsSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
    users: usersReducer,
    products: productsReducer,
    auth: authReducer,
  },
});

export default store;
