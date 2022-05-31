import { useSelector, useDispatch } from '../../services/types/hooks-types';
import { useDrop } from 'react-dnd';
import Total from "../cart-total/cart-total";
import ConstructorStartBlock from "../constructor-start-block/constructor-start-block";
import { ConstructorElement } from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorMainItem from "../constructor-main-item/constructor-main-item";
import styles from "./burger-constructor.module.css";
import { ingredientsSelector, addIngredientInConstructorItem, deleteIngredientFromConstructorItem } from '../../services/slices/ingredients';
import { FC } from 'react';
import { TIngredient } from '../../services/types/types';

const BurgerConstructor: FC = () => {

  const { burger } = useSelector(ingredientsSelector);
  const dispatch = useDispatch();

  const [ { canDrop, isOver }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      if (item.type === 'bun') {
        dispatch(deleteIngredientFromConstructorItem(item))
        dispatch(addIngredientInConstructorItem(item))        
      } else {
        dispatch(addIngredientInConstructorItem(item))
      }
    },
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });
  const isActiveForDnD = canDrop && isOver;
  
  const bun = burger.find(item => item.type === 'bun');
  const mains = burger.filter(item => item.type !== 'bun');

  return (
    <section ref={dropTarget} className={`${styles.constr} + mt-25 mb-25`} style={{backgroundColor: isActiveForDnD ? 'rgba(74, 74, 150, .1' : 'transparent'}}>
      {burger.length === 0 && <ConstructorStartBlock />}
      
      {bun && <div className={`${styles.position_bun} + pl-8 mb-4`}>
        <ConstructorElement
          type="top"
          isLocked={true}
          text={bun.name + " (верх)"}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>}

      {mains.length > 0  && <div className={`${styles.stuff} + custom-scroll mt-4 mb-4`}>
        <ul className={`${styles.list}`}>
          {mains.map((item, index) => {
            return (
              <ConstructorMainItem
                id={item._id}
                index={index}
                item={item}
                key={item.uniqueID}
              />
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
      <Total />
    </section>
  )
}

export default BurgerConstructor;
