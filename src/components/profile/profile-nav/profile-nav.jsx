import styles from './profile-nav.module.css';
import { NavLink, useLocation } from 'react-router-dom'; // useHistory
// import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../services/thunks/auth-thunks';

export const ProfileNavigation = () => {

    const { pathname } = useLocation();
    // const dispatch = useDispatch();

    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                <li className={styles.list__item}>
                    <NavLink to='/profile' exact={true} className={`${styles.link} text text_type_main-medium`} activeClassName={styles.link_active}>
                        Профиль
                    </NavLink>
                </li>
                <li className={styles.list__item}>
                    <NavLink to='/profile/orders' exact={true} className={`${styles.link} text text_type_main-medium`} activeClassName={styles.link_active}>
                        История заказов
                    </NavLink>
                </li>
                <li className={styles.list__item}>
                    <NavLink to='/login' exact={true} onClick={logoutUser()} className={`${styles.link} text text_type_main-medium`} activeClassName={styles.link_active}>
                        Выход
                    </NavLink>
                </li>
            </ul>

            {pathname === '/profile' && <span className={`${styles.description} text text_type_main-small text_color_inactive`}>
                В этом разделе вы можете
                изменить свои персональные данные
            </span>}
            {pathname === '/profile/orders' && <span className={`${styles.description} text text_type_main-small text_color_inactive`}>
                В этом разделе вы можете просмотреть свою историю заказов
            </span>}
        </nav>
    )
}