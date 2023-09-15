import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SearchPizzaParams } from './types';
import { IPizza } from '../../interfaces/pizza.interface';

export const fetchPizzas = createAsyncThunk<IPizza[], SearchPizzaParams>(
  'pizzas/fetchPizzasStatus',
  async ({ category, search, currentPage, sortBy }) => {
    const { data } = await axios.get(
      `https://6500496918c34dee0cd4a89a.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=desc${search}`,
    );
    return data;
  },
);
