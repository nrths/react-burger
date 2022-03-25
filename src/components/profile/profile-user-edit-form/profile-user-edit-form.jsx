import styles from './profile-user-edit-form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'; // EditIcon, CloseIcon
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../services/slices/authorization';
import { getUserInfo } from '../../../services/thunks/auth-thunks';

export const ProfileEditForm = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const dispatch = useDispatch();
    const user = useSelector(userSelector);
    const [formValue, setFormValue] = useState({
        name: '',
        email: 'mail@stellar.burgers',
        password: '******'
    })

    

    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch])

    const onClose = () => {

    }

    const onChange = e => {
        setFormValue({
            ...formValue, [e.target.name]: e.target.value
        })
    }

    const onIconClick = (ref) => {
        setTimeout(() => ref.current.focus(), 0)
    }

    const onSubmit = e => {
        e.preventDefault()
        // dispatch(editUserInfo(formValue))
    }

    return (
        <>
            <div className={styles.container}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChange}
                        icon={'EditIcon'}
                        value={formValue.name}
                        name={'name'}
                        error={false}
                        ref={nameRef}
                        onIconClick={onIconClick(nameRef)}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <Input
                        type={'email'}
                        placeholder={'Логин'}
                        onChange={onChange}
                        icon={'EditIcon'}
                        value={formValue.email}
                        name={'name'}
                        error={false}
                        ref={emailRef}
                        onIconClick={onIconClick(emailRef)}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                    <Input
                        type={'password'}
                        placeholder={'Пароль'}
                        onChange={onChange}
                        icon={'EditIcon'}
                        value={formValue.password}
                        name={'name'}
                        error={false}
                        ref={passwordRef}
                        onIconClick={onIconClick(passwordRef)}
                        errorText={'Ошибка'}
                        size={'default'}
                    />

                    <div className={styles.buttons}>
                        <Button type="primary" size='medium' className={`${styles.button}`}>Сохранить</Button>
                        <Button type="secondary" size='medium' className={`${styles.button}`}>Отмена</Button>
                    </div>
                </form>
            </div>
        </>
    )
}