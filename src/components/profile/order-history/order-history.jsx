import styles from './order-history.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserOrders, closeWSConnection } from '../../../services/thunks/ws-requests';
import OrderCard from '../../order-card/order-card';


export const ProfileOrders = () => {

    const { orders } = useSelector(state => state.feed)
    const [ reversedOrderList, setOrderList ] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        if (orders.length > 0) setOrderList([...orders].reverse())
    }, [orders])

    useEffect(() => {
        dispatch(getUserOrders())
        return () => {
            dispatch(closeWSConnection())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={`${styles.container} custom-scroll`}>
            <ul className={styles.orders__list}>
                {reversedOrderList.map(order => (
                    <OrderCard item={order} key={order._id}/>
                ))}
            </ul>
        </div>
    )
}