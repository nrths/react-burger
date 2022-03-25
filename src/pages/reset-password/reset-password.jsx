import { useState } from 'react';
import styles from './reset-password.module.css';
import { PasswordInput, Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const ResetPasswordPage = () => {
    const [formValue, setFormValue] = useState({
        new_password: '',
        code: ''
    })

    const onChange = e => {
        setFormValue({
            ...formValue, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        // dispatch
    }

    return (
        <div className={`${styles.container}`}>
            <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
            <form className={`${styles.form}`} onSubmit={handleSubmit}>
                <PasswordInput onChange={onChange} value={formValue.new_password} name={'new_password'}  placeholder='введите новый пароль'/>
                <Input type={'text'}
                    placeholder={'Введите код из письма'}
                    onChange={onChange}
                    value={formValue.code}
                    name={'code'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'} />
                <Button type="primary" size='medium'>Сохранить</Button>
            </form>
            <span className="text text_type_main-default text_color_inactive">Вспомнили пароль?
                <Link to='/login' className={`${styles.link} ml-2`}>Войти</Link>
            </span>
        </div>
    )
}

export default ResetPasswordPage;