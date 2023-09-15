import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { ICartSliceState } from './types';
import { calcTotalPrice } from '../../utils/calcTotalPrice';
import { IPizza } from '../../interfaces/pizza.interface';
import { getCartFromLocalStorage } from '../../utils/getCartFromLocalStorage';

const { items, totalPrice } = getCartFromLocalStorage();

export const initialState: ICartSliceState = {
  items,
  totalPrice,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart(state, action: PayloadAction<IPizza>) {
      const findItem = state.items.find((item) => item.id === action.payload.id);
      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }

      state.totalPrice = calcTotalPrice(state.items);
    },
    removeItemFromCart(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    clearItemFromCart(state) {
      state.items = [];
      state.totalPrice = 0;
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);
      if (findItem) {
        findItem.count--;
      }
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearItemFromCart, minusItem } =
  cartSlice.actions;
export default cartSlice.reducer;
