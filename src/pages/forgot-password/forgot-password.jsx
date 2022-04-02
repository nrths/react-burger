import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { forgotPassword } from '../../services/thunks/auth-thunks';
import { userSelector } from '../../services/slices/authorization';

const ForgotPasswordPage = () => {
    const [value, setValue] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const { isLoggedIn } = useSelector(userSelector)

    const redirection = () => {
        history.push('/reset-password')
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (value === '') {
            alert('Пожалуйста введите ваш e-mail')
        } else {
            dispatch(forgotPassword(value)).then((response) => {
                response && response.payload.success && setTimeout(redirection, 1000)
            })
        }
    }


    return (
        <>
            {isLoggedIn ? (
                <Redirect to={location.state?.from || '/'} />
            ) :
                (<div className={`${styles.container}`}>
                    <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
                    <form className={`${styles.form}`} onSubmit={handleSubmit}>
                        <Input type={'text'}
                            placeholder={'Укажите e-mail'}
                            onChange={e => setValue(e.target.value)}
                            value={value}
                            name={'email'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'} />
                        <Button type="primary" size='medium'>Восстановить</Button>
                    </form>
                    <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                        <Link to='/login' className={`${styles.link} ml-2`}>Войти</Link>
                    </span>
                </div>)
            }
        </>
    )

}

export default ForgotPasswordPage;