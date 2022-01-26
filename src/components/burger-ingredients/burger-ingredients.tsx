import React, { useRef } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from '../burger-ingredient/burger-ingredient'
import dataPropTypes from "../../utils/types";

function BurgerIngredients(props) {
  const [current, setCurrent] = React.useState("bun");
  const buns = props.data.filter((products) => products.type === "bun");
  const sauces = props.data.filter((products) => products.type === "sauce");
  const mains = props.data.filter((products) => products.type === "main");

//   const mainsList = useRef(null);
  
//   const onTabClick = (productType) => {
//     productType.current.scrollIntoView({block: "start", behavior: "smooth"});
//   }

  return (
    <section>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <div className={styles.tabs}>
        <Tab value="bun" active={current === "bun"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients_list} + mt-10 custom-scroll`}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={`${styles.products_list} + pr-4 pl-4 pt-6 pb-10`}>
          {buns.map((ingredient) => <li key={ingredient._id} className={`${styles.card}`}>
            <BurgerIngredient item={ingredient}/>
          </li>)}
        </ul>

        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={`${styles.products_list} + pr-4 pl-4 pt-6 pb-10`}>
          {sauces.map((ingredient) => <li key={ingredient._id} className={`${styles.card}`}>
            <BurgerIngredient item={ingredient}/>
          </li>)}
        </ul>

        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={`${styles.products_list} + pr-4 pl-4 pt-6 pb-10`}>
          {mains.map((ingredient) => <li key={ingredient._id} className={`${styles.card}`}>
            <BurgerIngredient item={ingredient}/>
          </li>)}
        </ul>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
