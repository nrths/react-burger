// import dataPropTypes from 'data-prop-types';
import styles from "./burger-ingredient.module.css";
import { useDispatch } from "react-redux";
import { showIngredientDetails } from "../../slices/ingredients";
import { useDrag } from 'react-dnd';
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = ({ item }) => {
  const dispatch = useDispatch();

  // const id = item._id

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: item,
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    })
  });


  if (item.type === 'bun') {
    return (!isDrag &&
      <li onClick={() => dispatch(showIngredientDetails(item))} className={`${styles.card}`}>
        <a ref={dragRef} href="#" className={`${styles.link}`}>
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
          <Counter count={1} size="default" />
        </a>
      </li>
    )
  } else {
    return (
      <li onClick={() => dispatch(showIngredientDetails(item))} className={`${styles.card}`}>
        <a href="#" ref={dragRef} className={`${styles.link}`}>
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
          <Counter count={1} size="default" />
        </a>
      </li>
    )
  }

};

// BurgerIngredient.propTypes = {
//   item: dataPropTypes.isRequired,
// }

export default BurgerIngredient;
