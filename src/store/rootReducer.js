// src/store/rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice';
import authReducer from '../features/auth/authSlice'

const rootReducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  
});

export default rootReducer;
