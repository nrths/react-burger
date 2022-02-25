import styles from "./burger-ingredient.module.css";
import {
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";

const BurgerIngredient = ({item}) => {
  return (
    <a href="#"  className={`${styles.link}`}>
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
  );
};

// BurgerIngredient.propTypes = {
//   item: dataPropTypes.isRequired,
// }

export default BurgerIngredient;
