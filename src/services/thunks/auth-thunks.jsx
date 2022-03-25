import { baseUrl } from '../../utils/data';
import {
    createUser, createUserSuccess, createUserFailed,
    login, loginSuccess, loginFailed,
    getToken, getTokenSuccess, getTokenFailed,
    getUser, getUserSuccess, getUserFailed
} from '../slices/authorization';
import { getTokens } from '../../utils/tokens';
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
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
        // dispatch(getToken());
        fetch(`${baseUrl}/auth/token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
            body: JSON.stringify({ token: localStorage.refreshToken }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
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
            })
            .catch(err => {
                if (err.message === 'jwt expired' || err.message === 'Token is invalid') {
                    dispatch(updateToken())
                    dispatch(getUserInfo())
                } else {
                    console.log(err)
                    dispatch(getUserFailed())
                }
            })
    }
}