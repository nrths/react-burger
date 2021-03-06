import { useState, FC, FormEvent, ChangeEvent } from 'react';
import styles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/types/hooks-types';
import { resetPassword } from '../../services/thunks/auth-thunks';
import { userSelector } from '../../services/slices/authorization';
import { TResetPassword } from '../../services/types/types';

const ResetPasswordPage: FC = () => {
    const { forgotAndResetPass, isLoggedIn, error } = useSelector(userSelector)
    const dispatch = useDispatch();
    const history = useHistory();

    const [formValue, setFormValue] = useState<TResetPassword>({
        password: '',
        token: ''
    })

    const redirection = () => {
        history.push('/login')
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        dispatch(resetPassword(formValue))
        if (forgotAndResetPass) setTimeout(redirection, 5000)
    }

    if (isLoggedIn) {
        return (
            <Redirect to={'/login'} />
        )
    }

    if (!isLoggedIn && !forgotAndResetPass) {
        return (
            <Redirect to={'/forgot-password'} />
        )
    }

    return (
        <div className={`${styles.container}`}>
            <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
            <form className={`${styles.form}`} onSubmit={handleSubmit}>
                <PasswordInput onChange={onChange} value={formValue.password} name={'password'} />
                <Input type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChange}
                    value={formValue.token}
                    name={'token'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'} />

                {error && <span className={`${styles.err} text_type_main-medium mb-3`}>{error}</span>}
                <Button type="primary" size='medium'>Сохранить</Button>
            </form>
            <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                <Link to='/login' className={`${styles.link} ml-2`}>Войти</Link>
            </span>
        </div>
    )
}

export default ResetPasswordPage;