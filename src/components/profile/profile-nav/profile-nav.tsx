import styles from './profile-nav.module.css';
import { NavLink, useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from '../../../services/types/hooks-types';
import { logout } from '../../../services/thunks/auth-thunks';
import { FC } from 'react';
import { TLocation } from '../../../services/types/types';



export const ProfileNavigation: FC = () => {
    const history = useHistory();
    const location = useLocation<TLocation>();
    const dispatch = useDispatch();


    const logoutUser = () => {
        dispatch(logout())
        history.replace({ pathname: '/login' })
    };

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.list__item}>
                    <NavLink to='/profile' exact={true} className={`${styles.link} 
                    text text_type_main-medium`} activeClassName={styles.link_active}>
                        Профиль
                    </NavLink>
                </li>
                <li className={styles.list__item}>
                    <NavLink to='/profile/orders' exact={true} className={`${styles.link} 
                    text text_type_main-medium`} activeClassName={styles.link_active}>
                        История заказов
                    </NavLink>
                </li>
                <li className={styles.list__item}>
                    <NavLink to='/login' exact={true} onClick={logoutUser} className={`${styles.link} 
                    text text_type_main-medium`} activeClassName={styles.link_active}>
                        Выход
                    </NavLink>
                </li>
            </ul>

            {location.pathname === '/profile' && <span className={`${styles.description} text text_type_main-small text_color_inactive`}>
                В этом разделе вы можете
                изменить свои персональные данные
            </span>}
            {location.pathname === '/profile/orders' && <span className={`${styles.description} text text_type_main-small text_color_inactive`}>
                В этом разделе вы можете просмотреть свою историю заказов
            </span>}
        </nav>
    )
}