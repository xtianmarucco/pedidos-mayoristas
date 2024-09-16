// src/features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Duración de 48 horas en milisegundos
const CART_EXPIRATION_TIME = 48 * 60 * 60 * 1000;

// Función para obtener el carrito del localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('cart');
    const timestamp = localStorage.getItem('cartTimestamp');
    
    if (!serializedCart || !timestamp) return [];

    const now = new Date().getTime();
    if (now - parseInt(timestamp, 10) > CART_EXPIRATION_TIME) {
      localStorage.removeItem('cart');
      localStorage.removeItem('cartTimestamp');
      return [];
    }

    return JSON.parse(serializedCart);
  } catch (err) {
    console.error("Error loading cart from localStorage", err);
    return [];
  }
};

// Guardar el carrito y el timestamp en el localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('cart', serializedCart);
    localStorage.setItem('cartTimestamp', new Date().getTime().toString());
  } catch (err) {
    console.error("Error saving cart to localStorage", err);
  }
};

// Slice de Redux para el carrito
const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCartFromLocalStorage() || [],
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.find((i) => i.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.push(item);
      }
      saveCartToLocalStorage(state);
    },
    removeItem: (state, action) => {
      const id = action.payload.id;
      const index = state.findIndex((i) => i.id === id);
      if (index !== -1) {
        state.splice(index, 1);
      }
      saveCartToLocalStorage(state);
    },
    clearCart: (state) => {
      state.length = 0;
      localStorage.removeItem('cart');
      localStorage.removeItem('cartTimestamp');
    }
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
