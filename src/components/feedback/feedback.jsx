import styles from './feedback.module.css';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';


const FeedBack = ({ orders }) => {

    const { total, totalToday } = useSelector(state => state.feed)
    const doneOrders = useMemo(() => orders && orders.filter(order => order.status === 'done'), [orders])
    const pendingOrders = useMemo(() => orders && orders.filter(order => order.status === 'pending'), [orders])

    return (
        <div className={styles.container}>
            <div className={styles.columns}>
                <div className={styles.done}>
                    <h3 className={`${styles.title} text text_type_main-medium mb-6`}>Готовы:</h3>
                    <ul className={styles.orders__list}>
                        {doneOrders.map(order => 
                            (<li key={order._id} className={`${styles.list__item} ${styles.list__item_done} tex text_type_digits-default`}>
                            {order.number}
                        </li>))}
                    </ul>
                </div>
                <div className={styles.pending}>
                    <h3 className={`${styles.title} text text_type_main-medium mb-6`}>В работе:</h3>
                    <ul className={styles.orders__list}>
                    {pendingOrders.map(order => 
                        (<li key={order._id} className={`${styles.list__item} ${styles.list__item_pending} text text_type_digits-default`}>
                        {order.number}
                    </li>))}
                    </ul>
                </div>
            </div>
            <div className={styles.totalToday}>
            <h3 className={`${styles.title} text text_type_main-medium`}>Выполнено за все время:</h3>
            <span className={`${styles.digit} text text_type_digits-large`}>{totalToday}</span>
            </div>
            <div className={styles.total}>
            <h3 className={`${styles.title} text text_type_main-medium`}>Выполнено за сегодня:</h3>
            <span className={`${styles.digit} text text_type_digits-large`}>{total}</span>
            </div>
        </div>
    )
}

export default FeedBack;