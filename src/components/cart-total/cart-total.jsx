// import React, { useState, useContext, useEffect } from 'react';
// import { Button } from "@ya.praktikum/react-developer-burger-ui-components";
// import styles from "./cart-total.module.css";
// import CustomIcon from "./custom-icon";
// import Modal from '../modal/modal';
// import OrderDetails from '../order-details/order-details';
// //import { BurgerConstructorContext } from '../../services/burger-constructor-context';
// import { baseUrl, checkResponse } from '../../utils/data';

// const Total = () => {
  
//   const { state, dispatch } = useContext(BurgerConstructorContext);
//   const [isModalShown, setModalShown] = useState(false);
//   const [orderState, setOrderState] = useState({
//     number: 0,
//     name: '',
//   });
//   const ingredients = state.data;

//   const switchModalState = () => {
//     setModalShown(!isModalShown);
//   }

//   useEffect(() => {
//     dispatch({type:'total'})
//   }, [ingredients])

//   const getOrderDetails = () => {
//     fetch(`${baseUrl}/orders`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ingredients: ingredients.map(item => item._id),
//       })
//     })
//     .then(checkResponse)
//     .then(res => {
//       setOrderState({ number: res.order.number, name: res.name })
//       switchModalState();
//     })
//     .catch(err => {
//       console.log(err);
//       switchModalState();
//       setOrderState({ number: 0, name: 'Ой, не начали!' })
//     })
//   }
  
//   return (
//     <section className={`${styles.total__container} + pt-10 pr-4 pl-4`}>
//       <p className={`${styles.total__sum} + text text_type_digits-medium pr-2`}>
//         {state.total}
//       </p>
//       <div className={`${styles.icon} + mr-10`}>
//         <CustomIcon size='36' />
//       </div>
//       <Button type="primary" size="medium" onClick={getOrderDetails}>
//         Оформить заказ
//       </Button>
//       {isModalShown && <Modal onClose={switchModalState} title=''>
//         <OrderDetails number={orderState.number} name={orderState.name} />
//       </Modal>
//       }
//     </section>
//   );
// };

// export default Total;
