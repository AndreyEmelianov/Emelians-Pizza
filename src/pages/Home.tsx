import { FC, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import qs from 'qs';

import { useAppDispatch } from '../redux/store';
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
import { SearchPizzaParams, fetchPizzas, pizzasSelector } from '../redux/slices/pizzasSlice';

const Home: FC = () => {
  const isMounted = useRef<boolean>(false);
  const isSearch = useRef<boolean>(false);

  const { items, status } = useSelector(pizzasSelector);
  const { sortType, categoryId, currentPage, searchValue } = useSelector(filtersSelector);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  // проверяем был ли первый рендер компонента, если уже был, то можно вшивать параметры в адресную строку
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const params = {
  //       categoryId: categoryId > 0 ? categoryId : null,
  //       sortProperty: sortType.sortProperty,
  //       currentPage,
  //     };
  //     const queryString = qs.stringify(params, { skipNulls: true });

  //     navigate(`?${queryString}`);
  //   }

  //   if (!window.location.search) {
  //     dispatch(fetchPizzas({} as SearchPizzaParams));
  //   }

  //   isMounted.current = true;
  // }, [categoryId, sortType.sortProperty, currentPage]);

  //после первого рендера компонента проверяем url параметры и передаём их в redux
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;

  //     const sortType = sortList.find((obj) => obj.sortProperty === params.sortBy);

  //     dispatch(
  //       setFilters({
  //         searchValue: params.search,
  //         categoryId: Number(params.category),
  //         currentPage: Number(params.currentPage),
  //         sortType: sortType || sortList[0],
  //       }),
  //     );
  //   }
  //   isSearch.current = true;
  // }, []);

  const getPizzas = async () => {
    const search = searchValue ? `&search=${searchValue}` : '';
    const category = categoryId > 0 ? `category=${categoryId}` : '';

    dispatch(
      fetchPizzas({
        search,
        category,
        currentPage: String(currentPage),
        sortBy: sortType.sortProperty,
      }),
    );
    window.scrollTo(0, 0);
  };

  // если был первый рендер, то отправляется запрос на получение пицц
  useEffect(() => {
    // if (!isSearch.current) {
    // }
    getPizzas();
    // isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const pizzas = items.map((item: any) => <PizzaBlock {...item} key={item.id} />);
  const skeletons = [...new Array(10)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={(index: number) => dispatch(setCategoryId(index))}
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

      <Pagination currentPage={currentPage} onChangePage={(page: number) => onChangePage(page)} />
    </div>
  );
};
export default Home;
