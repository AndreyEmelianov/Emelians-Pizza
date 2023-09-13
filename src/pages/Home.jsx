import { useContext, useEffect, useState } from 'react';

import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId } from '../redux/slices/filterSlice';
import axios from 'axios';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const { searchValue } = useContext(SearchContext);
  const { sortType, categoryId } = useSelector((state) => state.filters);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const search = searchValue ? `&search=${searchValue}` : '';

        await axios
          .get(
            `https://6500496918c34dee0cd4a89a.mockapi.io/items?page=${currentPage}&limit=4&${
              categoryId > 0 ? `category=${categoryId}` : ''
            }&sortBy=${sortType.sortProperty}&order=desc${search}`,
          )
          .then((res) => {
            setItems(res.data);
            setIsLoading(false);
          });
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const pizzas = items.map((item) => <PizzaBlock {...item} key={item.id} />);
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={(index) => dispatch(setCategoryId(index))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
};
export default Home;
