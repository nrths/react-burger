import React, { useState, useRef, useContext } from "react";
import styles from "./burger-ingredients.module.css";
import {
  Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { BurgerConstructorContext } from "../../services/burger-constructor-context";

function BurgerIngredients() {
  const { state } = useContext(BurgerConstructorContext);
  const [current, setCurrent] = useState('bun');
  const ingredients = state.data;

  const buns = ingredients.filter((products) => products.type === "bun");
  const sauces = ingredients.filter((products) => products.type === "sauce");
  const mains = ingredients.filter((products) => products.type === "main");

  const [modalState, setModalState] = useState();
  
  const mainsRef = useRef(null);
  const saucesRef = useRef(null);
  const bunsRef = useRef(null);
  
  const onTabClick = (evt, ref) => {
    setCurrent(evt);
    ref.current.scrollIntoView({block: 'start', behavior: 'smooth'})
  }

  return ingredients.length && (
    <section>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <div className={styles.tabs}>
        <Tab value="bun" active={current === "bun"} onClick={evt => onTabClick(evt, bunsRef)}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={evt => onTabClick(evt, saucesRef)}>
          Соусы
        </Tab>
        <Tab value="main" active={current === "main"} onClick={evt => onTabClick(evt, mainsRef)}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.ingredients_list} + mt-10 custom-scroll`}>
        <h2 className="text text_type_main-medium" ref={bunsRef}>Булки</h2>
        <ul className={`${styles.products_list} + pr-4 pl-4 pt-6 pb-10`}>
          {buns.map((ingredient) => <li key={ingredient._id} className={`${styles.card}`} onClick={() => {setModalState(ingredient)}}>
            <BurgerIngredient item={ingredient}/>
          </li>)}
        </ul>

        <h2 className="text text_type_main-medium" ref={saucesRef}>Соусы</h2>
        <ul className={`${styles.products_list} + pr-4 pl-4 pt-6 pb-10`}>
          {sauces.map((ingredient) => <li key={ingredient._id} className={`${styles.card}`} onClick={() => {setModalState(ingredient)}}>
            <BurgerIngredient item={ingredient}/>
          </li>)}
        </ul>

        <h2 className="text text_type_main-medium" ref={mainsRef}>Начинки</h2>
        <ul className={`${styles.products_list} + pr-4 pl-4 pt-6 pb-10`}>
          {mains.map((ingredient) => <li key={ingredient._id} className={`${styles.card}`} onClick={() => {setModalState(ingredient)}}>
            <BurgerIngredient item={ingredient}/>
          </li>)}
        </ul>
      </div>
      {modalState && <>
        <Modal onClose={setModalState} title={"Детали ингредиента"}>
          <IngredientDetails ingredient={modalState}/>
        </Modal>
      </>}
    </section>
  );
}

export default BurgerIngredients;
