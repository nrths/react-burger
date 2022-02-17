import { useContext } from 'react';
import Total from "../cart-total/cart-total";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { BurgerConstructorContext } from '../../services/burger-constructor-context';

function BurgerConstructor() {

  const { state } = useContext(BurgerConstructorContext);
  const ingredients = state.data;

  const bun = ingredients.find((products) => products.type === 'bun');

  if (ingredients.length !== 0) {
    return (
      <section className={`${styles.constr} + mt-25`}>
        <div className={`${styles.position_bun} + pl-8`}>
          {bun && (<ConstructorElement
            type="top"
            isLocked={true}
            text={bun.name + " (верх)"}
            price={bun.price}
            thumbnail={bun.image}
          />)}
        </div>

        <div className={`${styles.stuff} + custom-scroll mt-4 mb-4`}>
          <ul className={`${styles.list}`}>
            {ingredients.map((item, j) => item.type !== 'bun' && (
              <li key={item._id + j} className={`${styles.stuff__item} + pl-2 pr-2`}>
                <DragIcon type="primary" />
                <ConstructorElement
                  text={item.name}
                  price={item.price}
                  thumbnail={item.image}
                />
              </li>
            )
            )}
          </ul>
        </div>

        <div className={`${styles.position_bun} + pl-8`}>
          {bun && (<ConstructorElement
            type="bottom"
            isLocked={true}
            text={bun.name + " (низ)"}
            price={bun.price}
            thumbnail={bun.image}
          />)}
        </div>
        <Total />
      </section>
    )
  };
}

export default BurgerConstructor;
