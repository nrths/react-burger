import styles from "./app-header.module.css";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useLocation, NavLink } from 'react-router-dom';
import { FC } from "react";

const AppHeader: FC = () => {

  const location = useLocation();
  const profileIcon = () => {
    if (location.pathname !== '.profile' && location.pathname !== '/profile/orders') {
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
              <BurgerIcon type={location.pathname === '/' ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2">Конструктор</p>
            </NavLink>
          </li>
          <li className={`${styles.list__item} + pl-5 pr-5 pt-4 pb-4`}>
            <NavLink to='/feed' className={styles.link} activeClassName={styles.link_active}>
              <ListIcon type={location.pathname === '/feed' ? 'primary' : 'secondary'} />
              <p className="text text_type_main-default ml-2">
                Лента заказов
              </p>
            </NavLink>
          </li>
        </ul>
        <ul className={`${styles.list} + ${styles.list_logo}`}>
          <li className={`${styles.list__item} + pl-5 pr-5 pt-4 pb-4`}>
            <div className={styles.link}>
              <NavLink to='/'>
                <Logo />
              </NavLink>
            </div>
          </li>
          <li className={`${styles.list__item} + pl-5 pr-5 pt-4 pb-4`}>
            <NavLink to='/profile' className={styles.link} activeClassName={styles.link_active}>
              <ProfileIcon type={profileIcon()} />
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
