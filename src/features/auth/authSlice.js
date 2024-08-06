// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const EXPIRATION_TIME_MS = 7 * 24 * 60 * 60 * 1000; // 7 días en milisegundos

// Verificar si la sesión ha expirado
const isSessionExpired = () => {
  const expirationTime = localStorage.getItem('expirationTime');
  if (!expirationTime) return true;
  return new Date().getTime() > parseInt(expirationTime, 10);
};

const initialState = {
  isAuthenticated: localStorage.getItem('isAuthenticated') === 'true' && !isSessionExpired(),
  user: JSON.parse(localStorage.getItem('user')),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      const expirationTime = new Date().getTime() + EXPIRATION_TIME_MS;
      state.isAuthenticated = true;
      state.user = action.payload;
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('user', JSON.stringify(action.payload));
      localStorage.setItem('expirationTime', expirationTime.toString());
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      localStorage.removeItem('expirationTime');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
