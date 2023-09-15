import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { IPizza } from '../../interfaces/pizza.interface';

export interface ICartSliceState {
  totalPrice: number;
  items: IPizza[];
}

export const initialState: ICartSliceState = {
  totalPrice: 0,
  items: [],
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

      state.totalPrice = state.items.reduce((sum, item) => {
        return item.price * item.count + sum;
      }, 0);
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

      if (findItem && findItem.count === 0) {
        state.items = state.items.filter((item) => item.id !== action.payload);
      }
    },
  },
});

export const cartSelector = (state: RootState) => state.cart;
export const cartItemSelectorById = (id: string) => (state: RootState) =>
  state.cart.items.find((item) => item.id === id);

export const { addItemToCart, removeItemFromCart, clearItemFromCart, minusItem } =
  cartSlice.actions;
export default cartSlice.reducer;
