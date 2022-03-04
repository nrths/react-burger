// import { useMemo, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./cart-total.module.css";
import CustomIcon from "./custom-icon";
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';
import {fetchOrderDetails, ingredientsSelector, closeOrderDetailsModal } from '../../slices/ingredients';

const Total = () => {
    const { constructor, orderDetailsModal } = useSelector(ingredientsSelector)
    const dispatch = useDispatch()
    const constructorItems  = constructor.burger

    // const total = useMemo(() => {
    //    let sum = 0;
    //    sum = (constructorItems.filter(ingredient => ingredient.type !== 'bun').reduce((prev, item) => prev + item.price, 0)) + (constructorItems.find(ingredient => ingredient.type === 'bun').price * 2)
    //    return sum > 0 ? sum : 0;
    // }, [constructorItems])
    // console.log(total)
    // работает, только если запустить после загрузки всего приложения

    // подумай еще или используй useState + useEffect:
    // const [total, setTotal] = useState(0)
    // const calculatePrice = () => {
        

    //     setTotal()
    // }

    // useEffect(() => {
    //     calculatePrice()
    // }, [constructorItems])

    

    return (
        constructorItems.length > 0 && <section className={`${styles.total__container} + pt-10 pr-4 pl-4`}>
            <p className={`${styles.total__sum} + text text_type_digits-medium pr-2`}>
                {/* {total} */}
            </p>
            <div className={`${styles.icon} + mr-10`}>
                <CustomIcon size='36' />
            </div>
            <Button type="primary" size="medium" onClick={() => {dispatch(fetchOrderDetails(constructorItems))}}>
                Оформить заказ
            </Button>
            {orderDetailsModal && <Modal onClose={() => {dispatch(closeOrderDetailsModal())}} title=''>
                <OrderDetails />
            </Modal>
            }
        </section>
    );
};

export default Total;
