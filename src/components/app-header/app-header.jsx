import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, NavLink } from 'react-router-dom';  

const AppHeader = () => {

  const location = useLocation();
  const changeIcon = (route, nestedRoute, dynamicRoute) => {
    if (location.pathname !== route && location.pathname !== nestedRoute && location.pathname !== dynamicRoute) {
      return 'secondary'
    } else {
      return 'primary'
    }
  }

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} + pt-4 pb-4`}>
        <ul className={styles.list}>
          <li className={`${styles.list__item} + pl-5 pr-5 pt-4 pb-4`}>
            <NavLink to='/' exact className={`${styles.link} + mr-2`} activeClassName={styles.link_active}>
              <BurgerIcon type={ location.pathname === '/' ? 'primary' : 'secondary' } />
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </NavLink>
          </li>
          <li className={`${styles.list__item} + pl-5 pr-5 pt-4 pb-4`}>
            <NavLink to='/feed' className={styles.link} activeClassName={styles.link_active}>
              <ListIcon type={changeIcon('/feed', '/feed/:id')} />
              <p className="text text_type_main-default ml-2">
                Лента заказов
              </p>
            </NavLink>
          </li>
        </ul>
        <ul className={`${styles.list} + ${styles.list_logo}`}>
          <li className={`${styles.list__item} + pl-5 pr-5 pt-4 pb-4`}>
            <div className={styles.link}>
              <Logo />
            </div>
          </li>
          <li className={`${styles.list__item} + pl-5 pr-5 pt-4 pb-4`}>
            <NavLink to='/profile' className={styles.link} activeClassName={styles.link_active}>
              <ProfileIcon type={changeIcon('/profile', '/profile/orders', '/profile/orders/:id')} />
              <p className="text text_type_main-default ml-2">
                Личный кабинет
              </p>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
