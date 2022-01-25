import React, { useRef } from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { dataPropTypes } from "../../utils/data";

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
      <div className={`${styles.ingredients_list} + mt-10`}>
        <h2 className="text text_type_main-medium">Булки</h2>
        <ul className={`${styles.products_list} + pr-4 pl-4 pt-6 pb-10`}>
          {buns.map((ingredient) => {
            return (
              <li key={ingredient._id} className={`${styles.card}`}>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className={`${styles.image} + pl-4 pr-4`}
                />
                <div className={`${styles.price} + + pt-1 pb-1`}>
                  <p className="text text_type_digits-default mr-2">
                    {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
                <p
                  className={`${styles.description} + text text_type_main-default mb-6`}
                >
                  {ingredient.name}
                </p>
                <Counter count={1} size="default" />
              </li>
            );
          })}
        </ul>

        <h2 className="text text_type_main-medium">Соусы</h2>
        <ul className={`${styles.products_list} + pr-4 pl-4 pt-6 pb-10`}>
          {sauces.map((ingredient) => {
            return (
              <li key={ingredient._id} className={`${styles.card}`}>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className={`${styles.image} + pl-4 pr-4`}
                />
                <div className={`${styles.price} + + pt-1 pb-1`}>
                  <p className="text text_type_digits-default mr-2">
                    {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
                <p
                  className={`${styles.description} + text text_type_main-default mb-6`}
                >
                  {ingredient.name}
                </p>
                <Counter count={1} size="default" />
              </li>
            );
          })}
        </ul>

        <h2 className="text text_type_main-medium">Начинки</h2>
        <ul className={`${styles.products_list} + pr-4 pl-4 pt-6 pb-10`}>
          {mains.map((ingredient) => {
            return (
              <li key={ingredient._id} className={`${styles.card}`}>
                <img
                  src={ingredient.image}
                  alt={ingredient.name}
                  className={`${styles.image} + pl-4 pr-4`}
                />
                <div className={`${styles.price} + + pt-1 pb-1`}>
                  <p className="text text_type_digits-default mr-2">
                    {ingredient.price}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
                <p
                  className={`${styles.description} + text text_type_main-default mb-6`}
                >
                  {ingredient.name}
                </p>
                <Counter count={1} size="default" />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
