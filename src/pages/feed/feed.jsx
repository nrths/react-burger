import styles from './feed.module.css';
import Feed from '../../components/feed/feed';
import FeedBack from '../../components/feedback/feedback';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, closeWSConnection } from '../../services/thunks/ws-requests';

const FeedPage = () => {

    const dispatch = useDispatch();
    const { orders, total, totalToday } = useSelector(state => state.feed);

    useEffect(() => {
        dispatch(getAllOrders());
        return () => {
            dispatch(closeWSConnection());
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className={styles.container}>
            <Feed orders={orders}/>
            <FeedBack />
        </div>
    )
}

export default FeedPage;