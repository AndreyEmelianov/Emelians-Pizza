import { useEffect, useState } from 'react';
import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';

const Home = ({ searchValue }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({ name: 'популярности', sortProperty: 'rating' });

  useEffect(() => {
    setIsLoading(true);

    const search = searchValue ? `&search=${searchValue}` : '';
    fetch(
      `https://6500496918c34dee0cd4a89a.mockapi.io/items?${
        categoryId > 0 ? `category=${categoryId}` : ''
      }&sortBy=${sortType.sortProperty}&order=desc${search}`,
    )
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue]);

  const pizzas = items.map((item) => <PizzaBlock {...item} key={item.id} />);
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories categoryId={categoryId} onChangeCategory={(index) => setCategoryId(index)} />
        <Sort sortType={sortType} onChangeSort={(sortObj) => setSortType(sortObj)} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
    </div>
  );
};
export default Home;
