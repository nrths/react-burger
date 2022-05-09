import { useState, FC, FormEvent } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks-types';
import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, useHistory, useLocation, Redirect } from 'react-router-dom';
import { forgotPassword } from '../../services/thunks/auth-thunks';
import { userSelector } from '../../services/slices/authorization';
import { TLocation } from '../../services/types/types';

const ForgotPasswordPage: FC = () => {
    const [value, setValue] = useState<string>('');
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<TLocation>();
    const { isLoggedIn } = useSelector(userSelector)

    const redirection = () => {
        history.push('/reset-password')
    }

    const handleSubmit = (e: FormEvent) => {
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
            {(isLoggedIn) ? (
                <Redirect to={location.state?.from || '/'} />
            ) :
                (<div className={`${styles.container}`}>
                    <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
                    <form className={`${styles.form}`} onSubmit={handleSubmit}>
                        <Input type={'email'}
                            placeholder={'Укажите e-mail'}
                            onChange={e => setValue(e.target.value)}
                            value={value}
                            name={'email'}
                            error={false}
                            errorText={'Ошибка'}
                            size={'default'}
                            // узнать почему не работает паттерн
                            // pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$'
                        />
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