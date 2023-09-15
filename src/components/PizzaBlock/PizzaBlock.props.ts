import { IPizza } from '../../interfaces/pizza.interface';

export interface IPizzaBlockProps extends IPizza {
  sizes: number[];
  types: number[];
}
