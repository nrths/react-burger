import dataPropTypes from '../../utils/types';
import styles from "./burger-ingredient.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from 'react-router-dom';
import { showIngredientDetails, ingredientsSelector } from "../../services/slices/ingredients";
import { useDrag } from 'react-dnd';
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = ({ item }) => {
  const { constructor } = useSelector(ingredientsSelector)
  const constructorItems = constructor.burger
  const count = constructorItems.filter(element => element._id === item._id).length;
  const bunCount = 1;
 
  const dispatch = useDispatch()
  const location = useLocation()

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    })
  });

  if (constructorItems.includes(item.type === 'bun')) {
    return bunCount
  }

  if (item.type === 'bun') {
    return (!isDrag &&
      <li onClick={() => dispatch(showIngredientDetails(item))} className={`${styles.card}`}>
        <Link ref={dragRef} to={{ pathname: `/ingredients/${item._id}`, state: { background: location } }} className={`${styles.link}`}>
          <img
            src={item.image}
            alt={item.name}
            className={`${styles.image} + pl-4 pr-4`}
          />
          <div className={`${styles.price} + + pt-1 pb-1`}>
            <p className="text text_type_digits-default mr-2">{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`${styles.description} + text text_type_main-default mb-6`}>
            {item.name}
          </p>
          {count > 0 && <Counter count={bunCount} size="default" />}
        </Link>
      </li>
    )
  } else {
    return (
      <li onClick={() => dispatch(showIngredientDetails(item))} className={`${styles.card}`}>
        <Link ref={dragRef} to={{ pathname: `/ingredients/${item._id}`, state: { background: location } }} className={`${styles.link}`}>
          <img
            src={item.image}
            alt={item.name}
            className={`${styles.image} + pl-4 pr-4`}
          />
          <div className={`${styles.price} + + pt-1 pb-1`}>
            <p className="text text_type_digits-default mr-2">{item.price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`${styles.description} + text text_type_main-default mb-6`}>
            {item.name}
          </p>
          {count > 0 && <Counter count={count} size="default" />}
        </Link>
      </li>
    )
  }

};

BurgerIngredient.propTypes = {
  item: dataPropTypes.isRequired,
}

export default BurgerIngredient;
