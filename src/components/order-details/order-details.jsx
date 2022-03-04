import { useSelector } from 'react-redux';
import { ingredientsSelector } from '../../slices/ingredients';
// import PropTypes from 'prop-types';
import styles from './order-details.module.css';
import orderStatusOK from '../../images/order-ok.gif';


function OrderDetails() {
    const { orderName, orderNumber } = useSelector(ingredientsSelector);
    return (
        <div className={`${styles.order} pl-10 pr-10 pt-30 pb-30`}>
            <span className={`${styles.orderID} text text_type_digits-large mb-8`}>{orderNumber}</span>
            <p className="text text_type_main-medium mb-15">идентификатор заказа</p>
            <img className={styles.status} src={orderStatusOK} alt="OK" />
            <p className="text text_type_main-default mb-2 mt-15">Ваш заказ начали готовить:</p>
            <p className={`${styles.orderName} text text_type_main-default mb-5 mt-5`}>{orderName}</p>
            <p className="text text_type_main-default text_color_inactive">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

// OrderDetails.propTypes = {
//     number: PropTypes.number.isRequired,
//     name: PropTypes.string.isRequired,
// }

export default OrderDetails;