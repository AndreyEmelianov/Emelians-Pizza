import { useEffect, useState } from 'react';

import Categories from './components/Categories/Categories';
import Header from './components/Header/Header';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Sort from './components/Sort/Sort';

import './scss/app.scss';
import Skeleton from './components/PizzaBlock/Skeleton/Skeleton';

function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://6500496918c34dee0cd4a89a.mockapi.io/items')
      .then((res) => res.json())
      .then((data) => {
        setItems(data);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(10)].map((_, index) => <Skeleton key={index} />)
              : items.map((item) => <PizzaBlock {...item} key={item.id} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
