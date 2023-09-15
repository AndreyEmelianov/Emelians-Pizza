import { IPizza } from '../../interfaces/pizza.interface';

export interface ICartSliceState {
  totalPrice: number;
  items: IPizza[];
}
