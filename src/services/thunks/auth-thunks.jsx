import { baseUrl, checkResponse } from '../../utils/data';
import {
    createUser, createUserSuccess, createUserFailed,
    login, loginSuccess, loginFailed,
    getToken, getTokenSuccess, getTokenFailed,
    getUser, getUserSuccess, getUserFailed,
    updateUser, updateUserSuccess, updateUserFailed,
    logout, logoutSuccess, logoutFailed
} from '../slices/authorization';
import { getTokens, signOut } from '../../utils/tokens';
import { getCookie } from '../../utils/cookies';

export const registration = ({ email, password, name }) => {
    return function (dispatch) {
        dispatch(createUser())
        fetch(`${baseUrl}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ email, password, name }),
        })
            .then((res) => checkResponse(res))
            .then(data => {
                // console.log('registration', data)
                getTokens(data)
                dispatch(createUserSuccess(data))
            })
            .catch(err => {
                console.log(err)
                dispatch(createUserFailed(err))
            });
    }
}

export const loginUser = ({ email, password }) => {
    return function (dispatch) {
        dispatch(login());
        fetch(`${baseUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ email, password }),
        })
            .then((res) => checkResponse(res))
            .then(data => {
                console.log('loginUser:', data)
                getTokens(data)
                dispatch(loginSuccess(data))
            })
            .catch(err => {
                console.log(err)
                dispatch(loginFailed(err))
            });
    }
}

export const updateToken = () => {
    return function (dispatch) {
        dispatch(getToken());
        fetch(`${baseUrl}/auth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
        })
            .then((res) => checkResponse(res))
            .then(data => {
                // console.log('updateToken:', data)
                getTokens(data)
                dispatch(getTokenSuccess(data))
            })
            .catch(err => {
                if (err.message === 'Token is invalid') {
                    dispatch(updateToken())
                } else {
                    console.log(err)
                    dispatch(getTokenFailed(err))
                }
            })
    }
}

export const getUserInfo = () => {
    return function (dispatch) {
        dispatch(getUser())
        if (getCookie('token')) {
            fetch(`${baseUrl}/auth/user`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${getCookie('token')}`
                },
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
            })
                .then(res => res.json())
                .then(data => {
                    dispatch(getUserSuccess(data))
                    console.log('getUserInfo', data)
                })
        } else if (localStorage.getItem('refreshToken')) {
            updateToken()
            getUserInfo()
        }
        else {
            console.log('err')
            dispatch(getUserFailed())
        }

    }
}

export const updateUserInfo = (formValue) => {
    return function (dispatch) {
        dispatch(updateUser())
        fetch(`${baseUrl}/auth/user`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getCookie('token')}`
            },
            body: JSON.stringify(formValue),
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        })
            .then(res => res.json())
            .then(data => {
                dispatch(updateUserSuccess({ formValue: data.user }))
                console.log('updateUserInfo', data.user)
            })
            .catch(err => {
                if (err.message === 'jwt expired' || err.message === 'Token is invalid') {
                    dispatch(updateToken())
                    dispatch(updateUserInfo(formValue))
                } else {
                    console.log(err)
                    dispatch(updateUserFailed())
                }
            })
    }
}

export const logoutUser = () => {
    return function (dispatch) {
        // dispatch(logout())
        fetch(`${baseUrl}/auth/logout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
        })
            .then((res) => checkResponse(res))
            .then((data) => {
                signOut()
                // dispatch(logoutSuccess())
                console.log('logout:', data)
            })
            .catch((err) => {
                console.log('error:', err)
                // dispatch(logoutFailed())s
            })
    }
}

// .catch(err => {
//     if (err.message === 'jwt expired' || err.message === 'Token is invalid') {
//         dispatch(updateToken())
//         dispatch(getUserInfo())
//     } else {
//         console.log(err)
//         dispatch(getUserFailed())
//     }
// })