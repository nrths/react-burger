import styles from './order-history.module.css';


export const ProfileOrders = () => {
    return (
        <div className={styles.container}>
            <p className={`${styles.text} text text_type_main-large text_color_inactive`}>Здесь будет история заказов</p>
        </div>
    )
}