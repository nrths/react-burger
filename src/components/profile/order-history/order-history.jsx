import styles from './order-history.module.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { closeWSConnection } from '../../../services/thunks/ws-requests';
import OrderCard from '../../order-card/order-card';
import Loader from '../../loader/loader';


export const ProfileOrders = ({ orders }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(closeWSConnection())
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        {orders.length === 0 && <Loader />}
        {orders.length > 0 && <div className={`${styles.container} custom-scroll`}>
            <ul className={styles.orders__list}>
                {orders && orders.map(order => (
                    <OrderCard item={order} key={order._id}/>
                ))}
            </ul>
        </div>}
        </>
        
    )
}