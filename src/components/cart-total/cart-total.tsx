import React, { useState } from 'react';
import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./cart-total.module.css";
import CustomIcon from "./custom-icon";
import Modal from '../modal/modal';
import OrderDetails from '../order-details/order-details';

const Total = (props) => {
    const selectedIngredients = props.props;
    const sum = selectedIngredients.reduce((prev, item) => prev + item.price, 0);
    console.log(sum);

    const [modalState, setModalState] = useState(false);

    const switchModalState = () => {
      setModalState(!modalState);
    }

  return (
    <section className={`${styles.total__container} + pt-10 pr-4 pl-4`}>
      <p className={`${styles.total__sum} + text text_type_digits-medium pr-2`}>
        {sum}
      </p>
      <div className={`${styles.icon} + mr-10`}>
        <CustomIcon size='36'/>
      </div>
      <Button type="primary" size="medium" onClick={switchModalState}>
        Оформить заказ
      </Button>
      {modalState && <Modal onClose={switchModalState} title=''>
        <OrderDetails></OrderDetails>
        </Modal>
      }
    </section> 
  );
};

export default Total;
