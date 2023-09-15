import { IPizza } from '../interfaces/pizza.interface';

export const calcTotalPrice = (items: IPizza[]) => {
  return items.reduce((sum, item) => item.price * item.count + sum, 0);
};
