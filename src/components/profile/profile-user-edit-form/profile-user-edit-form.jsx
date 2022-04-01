import styles from './profile-user-edit-form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userSelector } from '../../../services/slices/authorization';
import { getUserInfo, updateUserInfo } from '../../../services/thunks/auth-thunks';

export const ProfileEditForm = () => {
    const nameInputRef = useRef(null);
    const emailInputRef = useRef(null);
    const passwordInputRef = useRef(null);
    const dispatch = useDispatch();
    const { user } = useSelector(userSelector);

    const [formValue, setFormValue] = useState({
        email: user.email,
        password: '',
        name: user.name,
    })
    const [showButton, setShowButton] = useState(false)
    
    useEffect(() => {
        dispatch(getUserInfo())
        setFormValue({
            email: user.email,
            password: '',
            name: user.name,
        })
        
    }, [dispatch, user])

    const onReset = (e) => {
        e.preventDefault()
        setFormValue({
            email: user.email,
            password: '',
            name: user.name,
        })
    }

    const onChange = e => {
        setFormValue({
            ...formValue, [e.target.name]: e.target.value
        })
        setShowButton(true)
    }

    const onIconClickName = () => {
        setTimeout(() => nameInputRef.current.focus(), 0);
    }
    const onIconClickEmail = () => {
        setTimeout(() => emailInputRef.current.focus(), 0);
    }
    const onIconClickPassword = () => {
        setTimeout(() => passwordInputRef.current.focus(), 0);
    }

    const onSubmit = e => {
        e.preventDefault()
        dispatch(updateUserInfo(formValue))
        setShowButton(false)
    }

    return (
        <>
            <div className={styles.container}>
                <form className={styles.form} >
                    {<Input
                        type={'text'}
                        placeholder={'Имя'}
                        onChange={onChange}
                        icon={(formValue.name === user.name) ? 'EditIcon' : 'CloseIcon'}
                        value={formValue.name}
                        name={'name'}
                        error={false}
                        ref={nameInputRef}
                        onIconClick={onIconClickName}
                        errorText={'Ошибка'}
                        size={'default'}
                    />}
                    {<Input type={'text'}
                        placeholder={'E-mail'}
                        onChange={onChange}
                        icon={(formValue.email === user.email) ? 'EditIcon' : 'CloseIcon'}
                        value={formValue.email}
                        name={'email'}
                        error={false}
                        ref={emailInputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        onIconClick={onIconClickEmail}
                    />}
                    {<Input type={'password'}
                        placeholder={'Пароль'}
                        onChange={onChange}
                        icon={(formValue.password === '') ? 'EditIcon' : 'CloseIcon'}
                        value={formValue.password}
                        name={'password'}
                        error={false}
                        ref={passwordInputRef}
                        errorText={'Ошибка'}
                        size={'default'}
                        onIconClick={onIconClickPassword}
                    />}

                    {showButton && <div className={styles.buttons}>
                        <Button type="primary" size='medium' onClick={onSubmit} className={`${styles.button}`}>Сохранить</Button>
                        <Button type="secondary" size='medium' onClick={onReset} className={`${styles.button}`}>Отмена</Button>
                    </div>}
                </form>
            </div>
        </>
    )
}