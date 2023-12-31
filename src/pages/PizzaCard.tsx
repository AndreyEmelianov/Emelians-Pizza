import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import { IPizza } from '../interfaces/pizza.interface';

const PizzaCard: FC = () => {
  const [pizza, setPizza] = useState<IPizza>();

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getPizza = async () => {
      try {
        const { data } = await axios.get(`https://6500496918c34dee0cd4a89a.mockapi.io/items/${id}`);
        setPizza(data);
      } catch (e) {
        alert('Ошибка при получении информации о пицце!');
        navigate('/');
      }
    };

    getPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="pizza" />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
      <Link to="/">
        <button className="button button--outline button--add">
          <span>Назад</span>
        </button>
      </Link>
    </div>
  );
};
export default PizzaCard;
