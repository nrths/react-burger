import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl, checkResponse } from '../../utils/data';
import { getCookie } from '../../utils/cookies';

export const registration = createAsyncThunk(
    'auth/registration',
    async (form, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
            const data = await checkResponse(response);
            return data
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (form, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
            const data = await checkResponse(response);
            return data            
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
)

export const updateToken = createAsyncThunk(
    'auth/updateToken',
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}/auth/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: localStorage.getItem('refreshToken') }),
            })
            const data = await checkResponse(response)

            if (data.message === 'Token is invalid') {
                updateToken()
            }
            return data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const getUserInfo = createAsyncThunk(
    'auth/getUserInfo',
    async (token, { rejectWithValue }) => {
        try {
            if (getCookie('token')) {
                const response = await fetch(`${baseUrl}/auth/user`, {
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
                const data = await checkResponse(response)
                return data.user
            } else if (localStorage.getItem('refreshToken')) {
                updateToken()
                getUserInfo()
            }
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const updateUserInfo = createAsyncThunk(
    'auth/updateUserInfo',
    async (form, { rejectWithValue }) => {
        try {
            if (getCookie('token')) {
                const response = await fetch(`${baseUrl}/auth/user`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${getCookie('token')}`
                    },
                    body: JSON.stringify(form),
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                })
                const data = await checkResponse(response)
                return data.user
            } else {
                updateToken()
                updateUserInfo(form)
            }
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (token, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}/auth/logout`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': getCookie('token')
                },
                body: JSON.stringify({ token: localStorage.getItem('refreshToken') })
            })
            const data = await checkResponse(response)
            return data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const forgotPassword = createAsyncThunk(
    'auth/forgotPassword',
    async (email, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}/password-reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 'email': email })
            })
            const data = await checkResponse(response)
            return data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)

export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async (form, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}/password-reset/reset`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            })
            const data = await checkResponse(response)
            console.log(data)
            return data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)
