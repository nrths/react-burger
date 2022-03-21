import { useState } from 'react';
import styles from './forgot-password.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
    const [value, setValue] = useState(null);
    const handleSubmit = e => {
        e.preventDefault();
        // dispatch forgot-pass?
    }

    return (
        <div className={`${styles.container}`}>
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
        </div>
    )
}

export default ForgotPasswordPage;