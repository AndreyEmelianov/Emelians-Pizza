import { RootState } from '../store';

export const filtersSelector = (state: RootState) => state.filters;

export const sortTypeSelector = (state: RootState) => state.filters.sortType;
