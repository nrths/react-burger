import PropTypes from 'prop-types';
import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = (props) => {
  return (
    <a href="#"  className={`${styles.link}`}>
      <img
        src={props.item.image}
        alt={props.item.name}
        className={`${styles.image} + pl-4 pr-4`}
      />
      <div className={`${styles.price} + + pt-1 pb-1`}>
        <p className="text text_type_digits-default mr-2">{props.item.price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.description} + text text_type_main-default mb-6`}>
        {props.item.name}
      </p>
      <Counter count={1} size="default" />
    </a>
  );
};

BurgerIngredient.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired
  })
}

export default BurgerIngredient;
