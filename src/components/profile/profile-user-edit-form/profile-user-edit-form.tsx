import styles from './profile-user-edit-form.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState, useEffect, useRef, FC, FormEvent, ChangeEvent } from 'react';
import { useDispatch, useSelector } from '../../../services/types/hooks-types';
import { userSelector } from '../../../services/slices/authorization';
import { updateUserInfo } from '../../../services/thunks/auth-thunks';
import { resetUpdateMessage } from '../../../services/slices/authorization';
import { TUserData } from '../../../services/types/types';

export const ProfileEditForm: FC = () => {
    // const nameInputRef = useRef(null);
    // const emailInputRef = useRef(null);
    // const passwordInputRef = useRef(null);
    const dispatch = useDispatch();
    const { user, updated, error } = useSelector(userSelector);

    const [formValue, setFormValue] = useState<TUserData>({
        email: user.email,
        password: '',
        name: user.name,
    })
    const [showButton, setShowButton] = useState<boolean>(false)
    
    useEffect(() => {
        setFormValue({
            email: user.email,
            password: '',
            name: user.name,
        })
        
    }, [user])

    const onReset = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        setFormValue({
            email: user.email,
            password: '',
            name: user.name,
        })
        setShowButton(false)
    }

    const onFocus = () => {
        dispatch(resetUpdateMessage())
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValue({
            ...formValue, [e.target.name]: e.target.value
        })
        setShowButton(true)
    }

    // const onIconClickName = () => {
    //     setTimeout(() => nameInputRef.current.focus(), 0);
    // }
    // const onIconClickEmail = () => {
    //     setTimeout(() => emailInputRef.current.focus(), 0);
    // }
    // const onIconClickPassword = () => {
    //     setTimeout(() => passwordInputRef.current.focus(), 0);
    // }

    const onSubmit = (e: FormEvent) => {
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
                        onFocus={onFocus}
                        icon={(formValue.name === user.name) ? 'EditIcon' : 'CloseIcon'}
                        value={formValue.name}
                        name={'name'}
                        error={false}
                        // ref={nameInputRef}
                        // onIconClick={onIconClickName}
                        errorText={'Ошибка'}
                        size={'default'}
                    />}
                    {<Input type={'email'}
                        placeholder={'E-mail'}
                        onChange={onChange}
                        onFocus={onFocus}
                        icon={(formValue.email === user.email) ? 'EditIcon' : 'CloseIcon'}
                        value={formValue.email}
                        name={'email'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        // ref={emailInputRef}
                        // onIconClick={onIconClickEmail}
                    />}
                    {<Input type={'password'}
                        placeholder={'Пароль'}
                        onChange={onChange}
                        onFocus={onFocus}
                        icon={(formValue.password === '') ? 'EditIcon' : 'CloseIcon'}
                        value={formValue.password}
                        name={'password'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                        // ref={passwordInputRef}
                        // onIconClick={onIconClickPassword}
                    />}

                    {showButton && <div className={styles.buttons}>
                        <Button type="primary" size='medium' onClick={onSubmit}>Сохранить</Button>
                        <Button type="secondary" size='medium' onClick={onReset}>Отмена</Button>
                    </div>}

                    {updated && <span className={`${styles.success} text text_type_main-small text_color_inactive mb-3`}>Данные обновлены!</span>}
                    {error && <span className={`${styles.err} text_type_main-medium mb-4`}>{error}</span>}
                </form>
            </div>
        </>
    )
}