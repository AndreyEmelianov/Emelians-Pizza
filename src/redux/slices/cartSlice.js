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
      state.items.push(action.payload);
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
