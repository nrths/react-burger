import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookies';
import {
    registration, forgotPassword, resetPassword,
    login, updateToken, getUserInfo, updateUserInfo,
    logout
} from '../thunks/auth-thunks';

export const initialState = {
    user: {
        email: '',
        password: '',
        name: '',
    },
    registerSuccess: false,
    forgotAndResetPass: false,
    isLoggedIn: false,
    updated: false,

    loading: false,
    error: '',
}

const userRightsSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        checkPreLogin: state => {
            getCookie('refreshToken') ? getUserInfo() : state.isLoggedIn = false;
        },
        resetUpdateMessage: state => {
            state.updated = false
        },
        resetErrors: state => { state.error = '' }
    },
    extraReducers: builder => {
        builder
            // user registration
            .addCase(registration.pending, state => { state.loading = true })
            .addCase(registration.fulfilled, (state, { payload }) => {
                state.loading = false
                state.user = payload
                setCookie('accessToken', payload.accessToken, { expires: 20 * 60 });
                setCookie('refreshToken', payload.refreshToken)
                payload.success === true ? state.registerSuccess = true : state.registerSuccess = false
                // обработай ошибки
            })
            .addCase(registration.rejected, (state, { payload }) => {
                state.loading = false
                state.error = 'Ошибка!'
            })
            // forgot password
            .addCase(forgotPassword.pending, state => { state.loading = true })
            .addCase(forgotPassword.fulfilled, (state, { payload }) => {
                state.loading = false
                state.forgotAndResetPass = true
                // обработай ошибки
            })
            .addCase(forgotPassword.rejected, (state, { payload }) => {
                state.error = 'Ошибка!'
                state.forgotAndResetPass = false
            })
            // reset password
            .addCase(resetPassword.pending, state => { state.loading = true })
            .addCase(resetPassword.fulfilled, (state, { payload }) => {
                state.loading = false
                state.forgotAndResetPass = true
            })
            .addCase(resetPassword.rejected, (state, { payload }) => {
                state.loading = false
                console.log(payload)
                state.error = 'Ошибка!'
            })
            // login
            .addCase(login.pending, state => {
                state.loading = true
                state.forgotAndResetPass = false
            })
            .addCase(login.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user.name = payload.user.name;
                state.user.email = payload.user.email;
                state.user.password = payload.user.password;
                console.log(payload)
                state.isLoggedIn = true;
                setCookie('accessToken', payload.accessToken, { expires: 20 * 60 });
                setCookie('refreshToken', payload.refreshToken)

            })
            .addCase(login.rejected, (state, { payload }) => { state.error = 'Ошибка!' })
            // update token
            .addCase(updateToken.fulfilled, (state, { payload }) => {
                deleteCookie('accessToken')
                deleteCookie('refreshToken')
                setCookie('accessToken', payload.accessToken, { expires: 20 * 60 })
                setCookie('refreshToken', payload.refreshToken)
                state.isLoggedIn = true;
            })
            .addCase(updateToken.rejected, (state, { payload }) => {
                state.error = 'Ошибка!'
                state.isLoggedIn = false;
            })
            // getUserInfo
            .addCase(getUserInfo.pending, state => { state.loading = true })
            .addCase(getUserInfo.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user.name = payload.user.name;
                state.user.email = payload.user.email;
                state.user.password = payload.user.password;
                state.isLoggedIn = true;
            })
            .addCase(getUserInfo.rejected, (state, { payload }) => { state.error = 'Ошибка!' })
            // update user information
            .addCase(updateUserInfo.pending, state => { state.loading = true })
            .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
                state.loading = false
                state.user = payload
                state.isLoggedIn = true
                state.updated = true
            })
            .addCase(updateUserInfo.rejected, (state, { payload }) => { state.error = 'Ошибка!' })
            // logout
            .addCase(logout.fulfilled, (state, { payload }) => {
                state.isLoggedIn = false
                state.user = initialState.user
                state.isLoggedIn = false
                deleteCookie('accessToken')
                deleteCookie('refreshToken')
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.error = 'Ошибка!'
            })
    }
})

export const {
    checkPreLogin,
    resetUpdateMessage,
    resetErrors
} = userRightsSlice.actions

export const userSelector = state => state.auth

export default userRightsSlice.reducer