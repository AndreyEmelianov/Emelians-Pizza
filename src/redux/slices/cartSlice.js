import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
  totalPrice: 0,
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
    },
    removeItemFromCart(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItemFromCart(state) {
      state.items = [];
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
