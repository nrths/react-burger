import styles from './feed.module.css';
import OrderCard from '../order-card/order-card';
import Loader from '../loader/loader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { closeWSConnection } from '../../services/thunks/ws-requests';

const Feed = ({ orders }) => {

    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(closeWSConnection())
        }
    }, [])
    
    return (
        <>
        {orders.length === 0 && <Loader />} 
       {orders.length > 0 && 
       <section>
            <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
            <ul className={`${styles.orders_list} custom-scroll`}>
                {orders.map(order => 
                    <OrderCard item={order} key={order._id} />)}
            </ul>
        </section>}
        </>
    )
}

export default Feed;