import styles from './profile.module.css';
import { Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUserInfo, updateToken } from '../../services/thunks/auth-thunks';
import { ProfileNavigation } from '../../components/profile/profile-nav/profile-nav';
import { ProfileEditForm } from '../../components/profile/profile-user-edit-form/profile-user-edit-form';
import { ProfileOrders } from '../../components/profile/order-history/order-history';


const ProfilePage = () => {
    
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserInfo())
        dispatch(updateToken())
    }, [dispatch])


    return (
        <div className={`${styles.container} pr-5 pl-5`}>
            <ProfileNavigation />
            <Switch>
                <Route path='/profile' exact={true}>
                    <ProfileEditForm />
                </Route>
                <Route path='/profile/orders' exact={true}>
                    <ProfileOrders />
                </Route>
            </Switch>
        </div>
    )
}

export default ProfilePage;