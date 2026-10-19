
import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart(state, action) {
      const plant = action.payload;
      const existingPlant = state.items.find(
        (item) => item.id === plant.id
      );

      if (existingPlant) {
        existingPlant.quantity += 1;
      } else {
        state.items.push({
          ...plant,
          quantity: 1,
        });
      }
    },

    increaseQuantity(state, action) {
      const plant = state.items.find(
        (item) => item.id === action.payload
      );

      if (plant) {
        plant.quantity += 1;
      }
    },

    decreaseQuantity(state, action) {
      const plant = state.items.find(
        (item) => item.id === action.payload
      );

      if (plant && plant.quantity > 1) {
        plant.quantity -= 1;
      }
    },

    removeFromCart(state, action) {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
