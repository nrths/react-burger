import styles from './order-info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { nanoid } from '@reduxjs/toolkit';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ingredientsSelector } from '../../services/slices/ingredients';
import { checkStatus, formatDate } from '../../utils/check-funcs';

const OrderInfo = () => {

    const { orders } = useSelector(state => state.feed)
    const { ingredients } = useSelector(ingredientsSelector)
    const { id } = useParams()
    const [ renderedOrderIngredients, setRenderedOrderIngredients ] = useState([])
    const [ price, setPrice ] = useState(0)
    const selectedOrder = orders.find(order => order._id === id)
    

    useEffect(() => {
        const orderIngredients = [];
        let uniqueOrderIngredients = [];
        let totalPrice = 0

        selectedOrder && selectedOrder.ingredients.forEach(ingredient => {
            const selectedIngredient = ingredients.find(element => element._id === ingredient)
            
            if (selectedIngredient.type === 'bun') orderIngredients.push({...selectedIngredient, count: 2})
            else orderIngredients.push({...selectedIngredient, count: 1});
        })
        
        orderIngredients.forEach(ingredient => {
            const repeatedIngredient = uniqueOrderIngredients.find(item => item._id === ingredient._id)
            if (repeatedIngredient) repeatedIngredient.count++
            else uniqueOrderIngredients.push(ingredient)
        })
       
        totalPrice = uniqueOrderIngredients.reduce((acc, ingredient) => acc + (ingredient.count * ingredient.price), 0)

        setRenderedOrderIngredients(uniqueOrderIngredients)
        setPrice(totalPrice)
    }, [selectedOrder, ingredients])

    return (
        <>
            {selectedOrder && <div className={`${styles.container} p-10`}>
                <p className={`${styles.title} text text_type_digits-default pt-6 pb-6`}>#{selectedOrder.number}</p>
                <h2 className='text text_type_main-medium'>{selectedOrder.name}</h2>
                <span className={`text_type_main-default pt-2 ${selectedOrder.status === 'done' ? styles.status : 'text_color_primary'}`}>{checkStatus(selectedOrder.status)}</span>
                <h3 className='text text_type_main-medium pt-6'>Состав:</h3>
                <ul className={`${styles.ingredients__list} custom-scroll`}>
                    {renderedOrderIngredients.map(ingredient => <li key={nanoid()} className={styles.list__item}>
                        <div className={styles.list__item_info}>
                            <img src={ingredient.image_mobile} alt={ingredient.name} className={`${styles.list__item_image} mr-4`} />
                            <p className={`${styles.ingredient_name} text_type_main-default`}>{ingredient.name}</p>
                        </div>
                        <div className={`${styles.ingredient_count} text_type_digits-default pr-6`}>
                            {`${ingredient.count} x ${ingredient.price}`}
                            <CurrencyIcon type='primary' />
                        </div>
                    </li>)}
                </ul>
                <div className={styles.description}>
                    <time className={`${styles.date} text_type_main-default text_color_inactive`}>{formatDate(selectedOrder.createdAt)}</time>
                    <div className={styles.price}>
                        <span className={`${styles.summary} text text_type_digits-default mr-2`}>{price}</span>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </div>}
        </>
    )
}

export default OrderInfo;