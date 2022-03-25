import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registration } from '../../services/thunks/auth-thunks';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';
import styles from './register.module.css';

const RegistrationPage = () => {
    const dispatch = useDispatch();
    const [formValue, setFormValue] = useState({
        email: '',
        password: '', 
        name: '' 
    })

    const onChange = e => {
        setFormValue({
            ...formValue, [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        dispatch(registration(formValue))
    }

    return (
        <div className={`${styles.container}`}>
            <h1 className='text text_type_main-medium mb-6'>Регистрация</h1>
            <form className={`${styles.form}`} onSubmit={handleSubmit}>
                <Input type={'text'}
                    placeholder={'Имя'}
                    onChange={onChange}
                    value={formValue.name}
                    name={'name'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'} 
                />
                <Input type={'text'}
                    placeholder={'E-mail'}
                    onChange={onChange}
                    value={formValue.email}
                    name={'email'}
                    error={false}
                    errorText={'Ошибка'}
                    size={'default'} 
                />
                <PasswordInput onChange={onChange} value={formValue.password} name={'password'} />
                <Button type="primary" size='medium'>Зарегистрироваться</Button>
            </form>
            <span className="text text_type_main-default text_color_inactive">Уже зарегистрированы?
                <Link to={'/login'} className={`${styles.link} ml-2`}>Войти</Link>
            </span>
        </div>
    );
};

export default RegistrationPage;