import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { RootState } from '../store';
import { IPizza } from '../../interfaces/pizza.interface';
import { SortListItem } from './filterSlice';

export type SearchPizzaParams = {
  category: string;
  search: string;
  currentPage: string;
  sortBy: string;
};

export const fetchPizzas = createAsyncThunk<IPizza[], SearchPizzaParams>(
  'pizzas/fetchPizzasStatus',
  async ({ category, search, currentPage, sortBy }) => {
    const { data } = await axios.get(
      `https://6500496918c34dee0cd4a89a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=desc${search}`,
    );
    return data;
  },
);

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzaSliceState {
  items: IPizza[];
  status: Status;
}

export const initialState: IPizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const pizzasSelector = (state: RootState) => state.pizzas;

// export const { setItems } = pizzasSlice.actions;
export default pizzasSlice.reducer;
