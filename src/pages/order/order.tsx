import styles from './order.module.css';
import OrderInfo from '../../components/order-info/order-info';
import Loader from '../../components/loader/loader';
import { useParams, useLocation } from 'react-router-dom';
import { useEffect, FC } from 'react';
import { useSelector, useDispatch } from '../../services/types/hooks-types';
import { feedSelector, getShowOrder } from '../../services/slices/feed';
import { userSelector } from '../../services/slices/authorization';
import { fetchIngredients } from '../../services/thunks/ingredients-and-order-thunks';
import { ingredientsSelector } from '../../services/slices/ingredients';
import { updateToken } from '../../services/thunks/auth-thunks';
import { getAllOrders, getUserOrders } from '../../services/thunks/ws-request';

const OrderPage: FC = () => {

    const { ingredients } = useSelector(ingredientsSelector);
    const { orders, showOrder } = useSelector(feedSelector);
    const { isLoggedIn } = useSelector(userSelector);
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const location = useLocation();

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

    return (
        <>
            {(orders.length === 0 || ingredients.length === 0 || !showOrder) && <Loader />}
            {(orders.length > 0 && ingredients.length > 0 && showOrder != null) &&
                <div className={styles.container}>
                    <OrderInfo />
                </div>
            }

        </>
    )
}

export default OrderPage;