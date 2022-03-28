import styles from './login.module.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components"; //ShowIcon, HideIcon
import { Link, useLocation, Redirect } from 'react-router-dom';
import { loginUser } from '../../services/thunks/auth-thunks';

const LoginPage = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const refreshToken = localStorage.refreshToken;
    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })
    const onChange = e => {
        setFormValue({
            ...formValue, [e.target.name]: e.target.value
        })
    }
    const handleSubmit = e => {
        e.preventDefault();
        dispatch(loginUser(formValue))
    }

    return (
        <>
        {refreshToken ? (
            <Redirect to={location.state?.from || '/'} />
        ) :
         (<div className={styles.container}>
            <h1 className="text text_type_main-medium mb-6">Вход</h1>
            <form className={`${styles.form} mb-20`} onSubmit={handleSubmit}>
                <Input type={'text'}
                    placeholder={'E-mail'}
                    onChange={onChange}
                    value={formValue.email}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'} />
                <PasswordInput onChange={onChange} value={formValue.password} name={'password'} />
                <Button type="primary" size='medium'>Войти</Button> 
            </form>
            <div className={`${styles.lines__container} mt-20`}>
                <span className="text text_type_main-default text_color_inactive">Вы — новый пользователь?
                    <Link to='/register' className={`${styles.link} ml-2`}>Зарегистрироваться</Link>
                </span>
                <span className="text text_type_main-default text_color_inactive">Забыли пароль?
                    <Link to='/forgot-password' className={`${styles.link} ml-2`}>Восстановить пароль</Link>
                </span>
            </div>
        </div>)
        }
        </>
    );
};

export default LoginPage;