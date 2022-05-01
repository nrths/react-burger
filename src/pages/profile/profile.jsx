import styles from './profile.module.css';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCookie } from '../../utils/cookies';
import { getUserInfo, updateToken } from '../../services/thunks/auth-thunks';
import { getUserOrders } from '../../services/thunks/ws-requests';
import { ProfileNavigation } from '../../components/profile/profile-nav/profile-nav';
import { ProfileEditForm } from '../../components/profile/profile-user-edit-form/profile-user-edit-form';
import { ProfileOrders } from '../../components/profile/order-history/order-history';
import Modal from '../../components/modal/modal';
import OrderInfo from '../../components/order-info/order-info';


const ProfilePage = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const background = location.state && location.state.background
    const { orders } = useSelector(state => state.feed)
    const [ reversedOrderList, setOrderList ] = useState([])

    const onCloseModal = () => {
        history.goBack();
    }

    useEffect(() => {
        if (getCookie('refreshToken') && !getCookie('accessToken')) {
            dispatch(updateToken()).then(() => dispatch(getUserInfo()))

        }
        if (getCookie('accessToken')) {
            dispatch(getUserInfo())
        }

        dispatch(getUserOrders())
    }, [dispatch])

    

    useEffect(() => {
        if (orders.length > 0) setOrderList([...orders].reverse())
    }, [orders])

    return (
        <div className={`${styles.container}  ${!background ? `${styles.order_page}` : null} mt-20 pr-5 pl-5`}>
            <Switch location={background || location}>
                <Route path='/profile/orders/:id' exact={true}>
                    <OrderInfo />
                </Route>
                <Route path='/'>
                    <ProfileNavigation />
                    <Switch>
                        <Route path='/profile' exact={true}>
                            <ProfileEditForm />
                        </Route>
                        <Route path='/profile/orders' exact={true}>
                            <ProfileOrders orders={reversedOrderList}/>
                        </Route>
                    </Switch>
                </Route>
            </Switch>

            {background && <Route path='/profile/orders/:id' exact={true}>
                <Modal onClose={onCloseModal} title={''}>
                    <OrderInfo />
                </Modal>
            </Route>}
        </div>
    )
}

export default ProfilePage;