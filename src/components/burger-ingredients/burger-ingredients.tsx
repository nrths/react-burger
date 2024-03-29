import { useState, useRef, useMemo, FC, MutableRefObject, SetStateAction } from "react";
import { useSelector } from '../../services/types/hooks-types';
import styles from "./burger-ingredients.module.css";
import {
  Tab
} from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredient from '../burger-ingredient/burger-ingredient';
import { ingredientsSelector } from "../../services/slices/ingredients";

const BurgerIngredients: FC = () => {
  
  const [current, setCurrent] = useState<string>('bun');
  const { ingredients } = useSelector(ingredientsSelector);
  
  const buns = useMemo(() => ingredients.filter((products) => products.type === "bun"), [ingredients])
  const sauces = useMemo(() => ingredients.filter((products) => products.type === "sauce"), [ingredients])
  const mains = useMemo(() => ingredients.filter((products) => products.type === "main"), [ingredients])

  const containerRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement | null>(null);
  const saucesRef = useRef<HTMLDivElement | null>(null);
  const bunsRef = useRef<HTMLDivElement | null>(null);
  
  const onTabClick = (evt: SetStateAction<string>, ref: MutableRefObject<HTMLDivElement>) => {
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
        <Tab value="bun" active={current === "bun"} onClick={evt => onTabClick(evt, bunsRef)}>Булки</Tab>
        <Tab value="sauce" active={current === "sauce"} onClick={evt => onTabClick(evt, saucesRef)}>Соусы</Tab>
        <Tab value="main" active={current === "main"} onClick={evt => onTabClick(evt, mainsRef)}>Начинки</Tab>
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
    </section>
  );
}

export default BurgerIngredients;
