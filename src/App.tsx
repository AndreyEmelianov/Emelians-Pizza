import { Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';

import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';

import './scss/app.scss';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const PizzaCard = lazy(() => import(/* webpackChunkName: "PizzaCard" */ './pages/PizzaCard'));
const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route
          path="cart"
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path="pizzas/:id"
          element={
            <Suspense fallback={<div>Идёт загрузка товара...</div>}>
              <PizzaCard />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<div>Поиск страницы...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;
