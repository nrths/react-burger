import styles from './feed.module.css';
import OrderCard from '../order-card/order-card';
import Loader from '../loader/loader';
import { useEffect, FC } from 'react';
import { useDispatch } from '../../services/types/hooks-types';
import { closeWSConnection } from '../../services/thunks/ws-request';
import { TOrderHistory } from '../../services/types/types';

const Feed: FC<TOrderHistory> = ({ orders }) => {

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
       {orders.length > 0 && 
       <section>
            <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
            <ul className={`${styles.orders_list} custom-scroll`}>
                {orders.map(order => 
                    <OrderCard order={order} key={order._id} />)}
            </ul>
        </section>}
        </>
    )
}

export default Feed;