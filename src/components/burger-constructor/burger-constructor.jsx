import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import Total from "../cart-total/cart-total";
import ConstructorStartBlock from "../constructor-start-block/constructor-start-block";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorMainItem from "../constructor-main-item/constructor-main-item";
import styles from "./burger-constructor.module.css";
import { ingredientsSelector, addIngredientInConstructorItem, deleteIngredientFromConstructorItem, changeBunInConstructor } from '../../slices/ingredients';

function BurgerConstructor() {

  const { constructor } = useSelector(ingredientsSelector);
  

  const dispatch = useDispatch();

  const [ { isOver }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      if (item.type === 'bun') {
        dispatch(addIngredientInConstructorItem(item))
        dispatch(changeBunInConstructor(item))
      } else {
        dispatch(addIngredientInConstructorItem(item))
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
    })
  });
  
  const bun = constructor.burger.find(item => item.type === 'bun');
  const mains = constructor.burger.filter(item => item.type !== 'bun');

  return (
    <section ref={dropTarget} className={`${styles.constr} + mt-25`}>
      {constructor.burger.length === 0 && <ConstructorStartBlock />}
      
      {bun && <div className={`${styles.position_bun} + pl-8 mb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>}

      {mains.length > 0 && <div className={`${styles.stuff} + custom-scroll mt-4 mb-4`}>
        <ul className={`${styles.list}`}>
          {mains.map((item, index) => {
            return (
              <ConstructorMainItem
                index={index}
                item={item}
                key={item._id} />
            )
          }
          )}
        </ul>
      </div>}
      
      {bun && <div className={`${styles.position_bun} + pl-8`}>
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text={bun.name + " (низ)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>}
      {/* <Total /> */}
    </section>
  )
}

export default BurgerConstructor;
