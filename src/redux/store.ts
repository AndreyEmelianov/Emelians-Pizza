import { configureStore } from '@reduxjs/toolkit';

import { useDispatch } from 'react-redux';
import filterSlice from './filter/filterSlice';
import cartSlice from './cart/cartSlice';
import pizzasSlice from './pizzas/pizzasSlice';

export const store = configureStore({
  reducer: {
    filters: filterSlice,
    cart: cartSlice,
    pizzas: pizzasSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
