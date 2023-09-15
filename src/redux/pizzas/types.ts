import { IPizza } from '../../interfaces/pizza.interface';

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface IPizzaSliceState {
  items: IPizza[];
  status: Status;
}

export type SearchPizzaParams = {
  category: string;
  search: string;
  currentPage: string;
  sortBy: string;
};
