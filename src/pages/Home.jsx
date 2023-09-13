import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';

import { SearchContext } from '../App';
import Categories from '../components/Categories/Categories';
import Sort, { sortList } from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const { searchValue } = useContext(SearchContext);

  const { sortType, categoryId, currentPage } = useSelector((state) => state.filters);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // проверяем был ли первый рендер компонента, если уже был, то можно вшивать параметры в адресную строку
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  //после первого рендера компонента проверяем url параметры и передаём их в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sortType = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sortType }));

      isSearch.current = true;
    }
  }, []);

  const fetchPizzas = async () => {
    setIsLoading(true);

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

  // если был первый рендер, то отправляется запрос на получение пицц
  useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

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
      <Pagination currentPage={currentPage} onChangePage={(page) => onChangePage(page)} />
    </div>
  );
};
export default Home;
