import { useState } from 'react';
import styles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../services/thunks/auth-thunks';
import { userSelector } from '../../services/slices/authorization';

const ResetPasswordPage = () => {
    const { resetPass, forgotPass, isLoggedIn } = useSelector(userSelector)
    const dispatch = useDispatch();
    const history = useHistory();

    const [formValue, setFormValue] = useState({
        password: '',
        token: ''
    })

    const redirection = () => {
        history.push('/login')
    }

    const onChange = e => {
        setFormValue({
            ...formValue, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(resetPassword(formValue))
        setTimeout(redirection, 1000)
    }

    return (
        <>
            {isLoggedIn ? (<Redirect to={'/login'} />) : (<div className={`${styles.container}`}>
                <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
                <form className={`${styles.form}`} onSubmit={handleSubmit}>
                    <PasswordInput onChange={onChange} value={formValue.password} name={'password'} placeholder='введите новый пароль' />
                    <Input type={'text'}
                        placeholder={'Введите код из письма'}
                        onChange={onChange}
                        value={formValue.token}
                        name={'token'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'} />
                    <Button type="primary" size='medium'>Сохранить</Button>
                </form>
                <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                    <Link to='/login' className={`${styles.link} ml-2`}>Войти</Link>
                </span>
            </div>)}
        </>

    )
}

export default ResetPasswordPage;