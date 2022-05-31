import styles from './order-card.module.css';
import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from '../../services/types/hooks-types';
import { nanoid } from '@reduxjs/toolkit';
import { ingredientsSelector } from '../../services/slices/ingredients';
import { getShowOrder } from '../../services/slices/feed'
// import { PreviewListItem } from '../preview-list-item/preview-list-item';
// сделать отдельный компонент для li с превью?
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { formatDate, checkStatus } from '../../utils/check-funcs';
import { TIngredient, TLocation, TOrderCard } from '../../services/types/types';


const OrderCard: FC<TOrderCard> = ({ order }) => {
    const dispatch = useDispatch();
    const location = useLocation<TLocation>();
    const { ingredients } = useSelector(ingredientsSelector)
    const orderIngredients: Array<TIngredient> = [];


    order.ingredients.forEach(ingredient => {
        const selectedIngredient = ingredients.find(element => element._id === ingredient)

        selectedIngredient && orderIngredients.push(selectedIngredient);
    })
    const renderedOrderIngredients = orderIngredients.slice(0, 6)
    const orderIngredientsRest = orderIngredients.length > 6
    const totalPrice = orderIngredients.reduce((acc, ingredient) => acc + ingredient.price, 0)

    return (
        <li className={styles.card} onClick={() => dispatch(getShowOrder(order))}>
            <Link className={`${styles.link}`} to={{ pathname: `${location.pathname}/${order._id}`, state: { background: location } }}>
                <div className={styles.description}>
                    <span className={`${styles.number} text text_type_digits-default `}>{`#${order.number}`}</span>
                    <time className={`${styles.date} text_type_main-default text_color_inactive`}>{formatDate(order.createdAt)}</time>
                </div>
                <h3 className={`${styles.title} text text_type_main-medium mt-6`}>{order.name}</h3>
                {location.pathname === '/profile/orders' && 
                <span className={`text_type_main-default pt-2 ${order.status === 'done' ? styles.status : 'text_color_primary'}`}>{checkStatus(order.status)}</span>}
                <div className={`${styles.components} mt-7`}>
                    <ul className={styles.ingredients__list}>
                        {renderedOrderIngredients.slice(0, 6).map((ingredient, index) => (
                            <li
                                key={nanoid()}
                                className={`${styles.order__item} ${styles.order__item_last}`}
                                style={{ zIndex: `${(index - renderedOrderIngredients.length) * -1}` }}>
                                <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.order__img} />
                            </li>))}
                        {orderIngredientsRest && 
                        <li className={`${styles.order__item} ${styles.order__rest} text text_type_digits-default`}
                        style={{ zIndex: `${renderedOrderIngredients.length - 5}` }}>
                            +{orderIngredients.length - 6}
                        </li>}


                    </ul>
                    <div className={styles.price}>
                        <span className="text text_type_digits-default">{totalPrice}</span>
                        <CurrencyIcon type='primary' />
                    </div>
                </div>
            </Link>
        </li>
    )
}


export default OrderCard;