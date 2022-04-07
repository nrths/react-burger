import { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./cart-total.module.css";
import CustomIcon from "./custom-icon";
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import { ingredientsSelector, closeOrderDetailsModal } from '../../services/slices/ingredients';
import { userSelector } from '../../services/slices/authorization';
import { fetchOrderDetails } from '../../services/thunks/ingredients-and-order-thunks';

const Total = () => {
    const { constructor, orderDetailsModal } = useSelector(ingredientsSelector)
    const { isLoggedIn } = useSelector(userSelector);
    const dispatch = useDispatch()
    const history = useHistory()
    const constructorItems = constructor.burger
    const bunsPresence = constructorItems.find(item => item.type === 'bun')

    const total = useMemo(() => {
        let sum
        if (constructorItems.length > 0) {
            sum = constructorItems.filter(ingredient => ingredient.type !== 'bun').reduce((prev, ingredient) => prev + ingredient.price, 0) + (constructorItems.some(ingredient => ingredient.type === 'bun') ? (constructorItems.find(ingredient => ingredient.type === 'bun').price * 2) : 0)
            return sum
        } else {
            sum = 0
            return sum
        }
    }, [constructorItems])

    const sendAnOrder = () => {
        if (!isLoggedIn) {
            history.replace({ pathname: '/login' })
        } else {
            dispatch(fetchOrderDetails(constructorItems))
        }
    }

    return (
        constructorItems.length > 0 && <section className={`${styles.total__container} + pt-10 pr-4 pl-4 mb-10`}>
            <p className={`${styles.total__sum} + text text_type_digits-medium pr-2`}>
                {total}
            </p>
            <div className={`${styles.icon} + mr-10`}>
                <CustomIcon size='36' />
            </div>
            {bunsPresence ? (<Button type="primary" size="medium" onClick={() => {sendAnOrder()}}>
                Оформить заказ
            </Button>) : (<Button type="primary" size="medium" disabled>
                Оформить заказ
            </Button>)}
            {orderDetailsModal && <Modal onClose={() => { dispatch(closeOrderDetailsModal()) }} title=''>
                <OrderDetails />
            </Modal>
            }
        </section>
    );
};

export default Total;
