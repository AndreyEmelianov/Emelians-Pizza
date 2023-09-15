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
