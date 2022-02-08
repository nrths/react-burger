// import React, { useState} from 'react';
import PropTypes from "prop-types";
import dataPropTypes from "../../utils/types";
import Total from "../cart-total/cart-total";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";

function BurgerConstructor(props) {
  const defineIngredientType = (type) =>
    props.data.filter((products) => products.type === type);

    // temporary for layout step-1: start
  const defineIngredientName = (ingredientName) =>
    props.data.filter((products) => products.name === ingredientName);
    const mains = defineIngredientType('main');
    const sauces = defineIngredientType('sauce');
    const stuff = mains.concat(sauces);
    // temporary for layout step- 1: end

  return (
    <section className={`${styles.constr} + mt-25`}>
      <div className={`${styles.position_bun} + pl-8`}>
        {defineIngredientName("Краторная булка N-200i").map((data) => {
          return (
            <div key={data._id}>
              <ConstructorElement
                type="top"
                isLocked={true}
                text={data.name + " (верх)"}
                price={data.price}
                thumbnail={data.image}
              />
            </div>
          );
        })}
      </div>

      <div className={`${styles.stuff} + custom-scroll mt-4 mb-4`}>
        <ul className={`${styles.list}`}>
          {stuff.map((data) => {
            return (
              <li key={data._id} className={`${styles.stuff__item} + pl-2 pr-2`}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={data.name}
                  price={data.price}
                  thumbnail={data.image}
                />
              </li>
            );
          })}
        </ul>
      </div>

      <div className={`${styles.position_bun} + pl-8`}>
        {defineIngredientName("Краторная булка N-200i").map((data) => {
          return (
            <div key={data._id}>
              <ConstructorElement
                type="bottom"
                isLocked={true}
                text={data.name + " (низ)"}
                price={data.price}
                thumbnail={data.image}
              />
            </div>
          );
        })}
      </div>
      <Total props={props.data}/>
    </section>  
  );
}

BurgerConstructor.propTypes = {
    data: PropTypes.arrayOf(dataPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;
