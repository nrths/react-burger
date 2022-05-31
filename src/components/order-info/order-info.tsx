import styles from './order-info.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Loader from '../loader/loader';
import { useState, useEffect, FC } from 'react';
import { useSelector, useDispatch } from '../../services/types/hooks-types';
import { useParams, useLocation } from 'react-router-dom';
import { ingredientsSelector } from '../../services/slices/ingredients';
import { userSelector } from '../../services/slices/authorization';
import { fetchIngredients } from '../../services/thunks/ingredients-and-order-thunks';
import { updateToken } from '../../services/thunks/auth-thunks'
import { getShowOrder, feedSelector } from '../../services/slices/feed';
import { getAllOrders, getUserOrders } from '../../services/thunks/ws-request';
import { checkStatus, formatDate } from '../../utils/check-funcs';
import { TLocation, TIngredient } from '../../services/types/types';

const OrderInfo: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation<TLocation>();
    const background = location.state && location.state.background
    const { orders, showOrder } = useSelector(feedSelector)
    const { ingredients } = useSelector(ingredientsSelector)
    const { id } = useParams<{ id: string }>()
    const [renderedOrderIngredients, setRenderedOrderIngredients] = useState<Array<TIngredient>>([])
    const [price, setPrice] = useState<number>(0)
    const { isLoggedIn } = useSelector(userSelector)

    useEffect(() => {
        if (ingredients.length === 0) dispatch(fetchIngredients())
        if (!showOrder) {
            const selectedOrder = orders.find(order => order._id === id)
            dispatch(getShowOrder(selectedOrder))
        }

        if (!isLoggedIn) {
            dispatch(updateToken())
        }

        if (orders.length === 0) {
            if (location.pathname.startsWith('/profile')) {
                dispatch(getUserOrders())
            } else {
                dispatch(getAllOrders())
            }
        }
    }, [ingredients, orders, location.pathname, id, dispatch, showOrder, isLoggedIn]);

    useEffect(() => {
        let orderIngredients: Array<TIngredient> = [];
        let uniqueOrderIngredients: Array<TIngredient> = [];
        let totalPrice = 0
        console.log(showOrder)
        if (showOrder) showOrder.ingredients.forEach(ingredient => {
            let selectedIngredient = ingredients.find(element => element._id === ingredient)

            orderIngredients.push({ ...selectedIngredient, count: 1 })
        })

        orderIngredients.forEach(ingredient => {
            const repeatedIngredient = uniqueOrderIngredients.find(item => item._id === ingredient._id)
            if (repeatedIngredient) repeatedIngredient.count++
            else uniqueOrderIngredients.push(ingredient)
        })

        totalPrice = uniqueOrderIngredients.reduce((acc, ingredient) => acc + (ingredient.count * ingredient.price), 0)

        setRenderedOrderIngredients(uniqueOrderIngredients)
        setPrice(totalPrice)
        console.log(orderIngredients)
    }, [ingredients, showOrder])

    return (
        <>
            {orders.length === 0 && <Loader />}
            {(orders.length > 0 && ingredients.length > 0 && showOrder) && 
            <div className={`${styles.container} ${!background ? '' : null} p-10`}>
                <p className={`${!background ? `${styles.title}` : null} text text_type_digits-default pt-6 pb-6`}>#{showOrder.number}</p>
                <h2 className='text text_type_main-medium'>{showOrder.name}</h2>
                <span className={`text_type_main-default pt-2 ${showOrder.status === 'done' ? styles.status : 'text_color_primary'}`}>{checkStatus(showOrder.status)}</span>
                <h3 className='text text_type_main-medium pt-6'>Состав:</h3>
                <ul className={`${styles.ingredients__list} custom-scroll`}>
                    {renderedOrderIngredients.map(ingredient => (<li key={ingredient._id} className={styles.list__item}>
                        <div className={styles.list__item_info}>
                            <img src={ingredient.image_mobile} alt={ingredient.name} className={`${styles.list__item_image} mr-4`} />
                            <p className={`${styles.ingredient_name} text_type_main-default`}>{ingredient.name}</p>
                        </div>
                        <div className={`${styles.ingredient_count} text_type_digits-default pr-6`}>
                            <span className={styles.digits}>{`${ingredient.count} x ${ingredient.price}`}</span>
                            <CurrencyIcon type='primary' />
                        </div>
                    </li>))}
                </ul>
                <div className={`${styles.description} ${!background ? 'mt-10' : null}`}>
                    <time className={`${styles.date} text_type_main-default text_color_inactive`}>{formatDate(showOrder.createdAt)}</time>
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