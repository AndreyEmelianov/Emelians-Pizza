import { Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import './scss/app.scss';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import PizzaCard from './pages/PizzaCard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizzas/:id" element={<PizzaCard />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
