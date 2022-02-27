import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import Total from "../cart-total/cart-total";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { ingredientsSelector } from '../../slices/ingredients';

function BurgerConstructor() {

  const { bun, selectedIngredients } = useSelector(ingredientsSelector);
  const dispatch = useDispatch();

  const id = [bun, bun, ...selectedIngredients].map(item => item._id);

  // const [, dropTarget] = useDrop({
  //   accept: 'ingredient',
  //   drop(id) {
  //     onDropHandler(id)
  //   },
  //   collect: monitor => ({
  //     isHover: monitor.isOver(),
  //   })
  // });

  return (
    <section ref={dropTarget} className={`${styles.constr} + mt-25`}>
      {/* проверка на булку */}
      {bun._id && <div className={`${styles.position_bun} + pl-8`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bun.image}
        />)
      </div>}

      {selectedIngredients.length > 0 && <div className={`${styles.stuff} + custom-scroll mt-4 mb-4`}>
        <ul className={`${styles.list}`}>
          {selectedIngredients.map((item) => {
            return (<li key={item._id} className={`${styles.stuff__item} + pl-2 pr-2`}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </li>
            )
          }
          )}
        </ul>
      </div>}
      {/* проверка на булку */}
      {bun._id && <div className={`${styles.position_bun} + pl-8`}>
        (<ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
        />)
      </div>}
      {/* <Total /> */}
    </section>
  )
}

export default BurgerConstructor;
