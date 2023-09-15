import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface IFilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sortType: SortListItem;
}

export enum SortPropertyEnum {
  RATING = 'rating',
  PRICE = 'price',
  TITLE = 'title',
}

export type SortListItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export const initialState: IFilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: 1,
  sortType: { name: 'популярности', sortProperty: SortPropertyEnum.RATING },
};

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortListItem>) {
      state.sortType = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      if (Object.keys(action.payload).length) {
        state.currentPage = Number(action.payload.currentPage);
        state.categoryId = Number(action.payload.categoryId);
        state.sortType = action.payload.sortType;
      } else {
        state.currentPage = 1;
        state.categoryId = 0;
        state.sortType = {
          name: 'популярности',
          sortProperty: SortPropertyEnum.RATING,
        };
      }
    },
  },
});

export const filtersSelector = (state: RootState) => state.filters;
export const sortTypeSelector = (state: RootState) => state.filters.sortType;

export const { setCategoryId, setSortType, setCurrentPage, setFilters, setSearchValue } =
  filterSlice.actions;
export default filterSlice.reducer;
