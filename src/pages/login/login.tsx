import styles from './login.module.css';
import { useState, useEffect, FC, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from '../../services/types/hooks-types';
import { PasswordInput, Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, useLocation, Redirect } from 'react-router-dom';
import { login } from '../../services/thunks/auth-thunks';
import { userSelector, resetErrors } from '../../services/slices/authorization';
import { TLogin, TLocation } from '../../services/types/types';

const LoginPage: FC = () => {
    const dispatch = useDispatch();
    const { isLoggedIn, error } = useSelector(userSelector);
    const location = useLocation<TLocation>();
    const [formValue, setFormValue] = useState<TLogin>({
        email: '',
        password: ''
    })
    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue, [e.target.name]: e.target.value
        })
    }
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        dispatch(login(formValue))
    }

    useEffect(() => {
        dispatch(resetErrors())
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
        {isLoggedIn ? (
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
                {error && <span className={`${styles.err} text text_type_main-medium`}>{error}</span>}
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