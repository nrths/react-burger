import {
    ConstructorElement,
    DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
// import React, { useRef } from 'react';
// import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { deleteIngredientFromConstructorItem } from '../../slices/ingredients'; // sort action 
import styles from './constructor-main-item.module.css';

const ConstructorMainItem = ({ item }) => { // index, id, moveItem
    const dispatch = useDispatch();

    const handleDeleteItem = () => {
        dispatch(deleteIngredientFromConstructorItem(item))
        // sort dispatch
    }

    return (
        <li className={`${styles.stuff__item} + pl-2 pr-2`}>
            <DragIcon type="primary" />
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                handleDeleteItem={handleDeleteItem}
            />
        </li>
    )
}

export default ConstructorMainItem;