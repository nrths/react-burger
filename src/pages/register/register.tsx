import { useState, FC, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks-types';
import { registration } from '../../services/thunks/auth-thunks';
import { Button, Input, PasswordInput } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Redirect, useLocation, useHistory } from 'react-router-dom';
import { userSelector } from '../../services/slices/authorization';
import { TLocation, TUserData } from '../../services/types/types';
import styles from './register.module.css';

const RegistrationPage: FC = () => {
    const dispatch = useDispatch();
    const location = useLocation<TLocation>();
    const history = useHistory();
    const { isLoggedIn, registerSuccess } = useSelector(userSelector)
    const [formValue, setFormValue] = useState<TUserData>({
        email: '',
        password: '', 
        name: '' 
    })

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue, [e.target.name]: e.target.value
        })
    }

    const redirection = () => {
        history.push('/login')
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(registration(formValue))
        if (registerSuccess === true) setTimeout(redirection, 2000)
    }

    return (
        <>
        {isLoggedIn ? (
            <Redirect to={location.state?.from || '/'} />
        ) : 
        (
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
        </div>)
        }
        </>
    );
};

export default RegistrationPage;