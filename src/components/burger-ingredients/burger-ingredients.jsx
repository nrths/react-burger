import { useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import styles from "./burger-ingredients.module.css";
import {
  Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import Modal from '../modal/modal';
import IngredientDetails from '../ingredient-details/ingredient-details';
import { ingredientsSelector, removeIngredientDetails } from "../../services/slices/ingredients";

function BurgerIngredients() {
  
  const [current, setCurrent] = useState('bun');
  const { ingredients, ingredientDetailsModal, ingredientDetails } = useSelector(ingredientsSelector);
  const dispatch = useDispatch();
  
  const buns = ingredients.filter((products) => products.type === "bun");
  const sauces = ingredients.filter((products) => products.type === "sauce");
  const mains = ingredients.filter((products) => products.type === "main");

  const containerRef = useRef(null);
  const mainsRef = useRef(null);
  const saucesRef = useRef(null);
  const bunsRef = useRef(null);
  
  const onTabClick = (evt, ref) => {
    setCurrent(evt);
    ref.current.scrollIntoView({block: 'start', behavior: 'smooth'})
  }

  const onScroll = () => {
    const top = containerRef.current.getBoundingClientRect().y;
    const bunsDistance = Math.abs(
      top - bunsRef.current.getBoundingClientRect().y
    );
    const saucesDistance = Math.abs(
      top - saucesRef.current.getBoundingClientRect().y
    );
    const mainsDistance = Math.abs(
      top - mainsRef.current.getBoundingClientRect().y
    );
    const minTabDistance = Math.min(
      bunsDistance,
      saucesDistance,
      mainsDistance
    );
    
    const activeTab =
      minTabDistance === saucesDistance
        ? 'sauce'
        : minTabDistance === mainsDistance
        ? 'main'
        : 'bun';
    setCurrent(activeTab);
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
      <div ref={containerRef} onScroll={onScroll} className={`${styles.ingredients_list} + mt-10 custom-scroll`}>
        <h2 className="text text_type_main-medium" ref={bunsRef}>Булки</h2>
        <ul className={`${styles.products_list} + pr-4 pl-4 pt-6 pb-10`}>
          {buns.map(ingredient => 
            <BurgerIngredient item={ingredient} key={ingredient._id} />)}
        </ul>

        <h2 className="text text_type_main-medium" ref={saucesRef}>Соусы</h2>
        <ul className={`${styles.products_list} + pr-4 pl-4 pt-6 pb-10`}>
          {sauces.map(ingredient => 
            <BurgerIngredient item={ingredient} key={ingredient._id} />
          )}
        </ul>

        <h2 className="text text_type_main-medium" ref={mainsRef}>Начинки</h2>
        <ul className={`${styles.products_list} + pr-4 pl-4 pt-6 pb-10`}>
          {mains.map(ingredient => 
            <BurgerIngredient item={ingredient} key={ingredient._id} />)}
        </ul>
      </div>
      {ingredientDetailsModal && <>
        <Modal onClose={() => dispatch(removeIngredientDetails())} title={"Детали ингредиента"}>
          <IngredientDetails ingredient={ingredientDetails}/>
        </Modal>
      </>}
    </section>
  );
}

export default BurgerIngredients;
