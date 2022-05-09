import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from '../../services/types/hooks-types';
import { deleteIngredientFromConstructorItem, dragItems } from '../../services/slices/ingredients';
import { TConstructorMainItem, TIngredient } from '../../services/types/types';
import styles from './constructor-main-item.module.css';

const ConstructorMainItem: FC<TConstructorMainItem> = ({ item, index }) => {
    const dispatch = useDispatch();
    const ref = useRef<HTMLLIElement>(null)

    const handleDeleteItem = () => {
        dispatch(deleteIngredientFromConstructorItem(item)) 
    }

    const [{ isDragging }, dragRef] = useDrag({
        type: 'main-ingredient',
        item: () => ({ item, index }),
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    });

    const [{ handlerId }, dropRef] = useDrop({
        accept: 'main-ingredient',
        collect: monitor => ({ handlerId: monitor.getHandlerId() }),
        drop: (item: TIngredient) => {
          const dragIndex = item.index;
          const hoverIndex = index;
          if (dragIndex === hoverIndex) return;
          dispatch(dragItems({drag: dragIndex, hover: hoverIndex }))
        },
        hover: (item, monitor) => {
          if (!ref.current) return
          const dragIndex = item.index
          const hoverIndex = index
    
          if (dragIndex === hoverIndex) return
    
          const hoverBoundingRect = ref.current?.getBoundingClientRect()
          const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
          const clientOffset = monitor.getClientOffset()
          const hoverClientY = clientOffset.y - hoverBoundingRect.top

          if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return
          if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return
    
          dispatch(dragItems({ dragIndex: dragIndex, hoverIndex: hoverIndex }))
        
          item.index = hoverIndex
        },
    })
    dragRef(dropRef(ref))

    const opacity = isDragging ? .5 : 1

    return (
        <li className={`${styles.stuff__item} + pl-2 pr-2`} style={{...styles, opacity}} ref={ref} draggable data-handler-id={handlerId}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleClose={handleDeleteItem}
            />
        </li>
    )
}

export default ConstructorMainItem;