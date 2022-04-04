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
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(`${baseUrl}/auth/token`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: getCookie('refreshToken') })
            })
            console.log(response)
            if (response.status !== 200) {
                updateToken()
            }
            const data = await checkResponse(response);
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
            if (getCookie('accessToken')) {
                const response = await fetch(`${baseUrl}/auth/user`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getCookie('accessToken')
                    },
                    mode: 'cors',
                    cache: 'no-cache',
                    credentials: 'same-origin',
                    redirect: 'follow',
                    referrerPolicy: 'no-referrer',
                })
                const data = await checkResponse(response)
                return data
            } else {
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
            if (getCookie('accessToken')) {
                const response = await fetch(`${baseUrl}/auth/user`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getCookie('accessToken')
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
                await updateToken()
                await getUserInfo(form)
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
                    'authorization': getCookie('accessToken')
                },
                body: JSON.stringify({ token: getCookie('refreshToken') })
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
