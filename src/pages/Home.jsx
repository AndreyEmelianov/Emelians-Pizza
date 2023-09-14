import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories/Categories';
import Sort, { sortList } from '../components/Sort/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton/Skeleton';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Pagination from '../components/Pagination/Pagination';
import {
  filtersSelector,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, pizzasSelector } from '../redux/slices/pizzasSlice';

const Home = () => {
  const isMounted = useRef(false);
  const isSearch = useRef(false);

  const { items, status } = useSelector(pizzasSelector);
  const { sortType, categoryId, currentPage, searchValue } = useSelector(filtersSelector);
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

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    dispatch(
      fetchPizzas({
        search,
        category,
        currentPage,
        sortType,
      }),
    );
    window.scrollTo(0, 0);
  };

  // если был первый рендер, то отправляется запрос на получение пицц
  useEffect(() => {
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const onChangePage = (page) => {
    dispatch(setCurrentPage(page));
  };

  const pizzas = items.map((item) => (
    <Link to={`/pizzas/${item.id}`} key={item.id}>
      <PizzaBlock {...item} />
    </Link>
  ));
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
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>К сожалению, не удалось получить пиццы, попробуйте повторить попытку позже</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}

      <Pagination currentPage={currentPage} onChangePage={(page) => onChangePage(page)} />
    </div>
  );
};
export default Home;
