import styles from './feed.module.css';
import Feed from '../../components/feed/feed';
import FeedBack from '../../components/feedback/feedback';
import Loader from '../../components/loader/loader';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getFeedData } from '../../services/slices/feed'
import { getAllOrders, closeWSConnection } from '../../services/thunks/ws-requests';

const FeedPage = () => {

    const dispatch = useDispatch();
    const { orders } = useSelector(state => state.feed);

    useEffect(() => {
        dispatch(getAllOrders())

        return () => {
            dispatch(closeWSConnection())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        {orders.length === 0 && <Loader />}
        {orders.length > 0 &&
        <div className={styles.container}>
            <Feed orders={orders}/>
            <FeedBack orders={orders}/>
        </div>}
        </>
        
    )
}

export default FeedPage;