import styles from './order-history.module.css';
import { useDispatch } from '../../../services/types/hooks-types';
import { useEffect, FC } from 'react';
import { closeWSConnection } from '../../../services/thunks/ws-request';
import OrderCard from '../../order-card/order-card';
import Loader from '../../loader/loader';
import { TOrderHistory } from '../../../services/types/types';

export const ProfileOrders: FC<TOrderHistory> = ({ orders }) => {

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
                    <OrderCard order={order} key={order._id}/>
                ))}
            </ul>
        </div>}
        </>
        
    )
}