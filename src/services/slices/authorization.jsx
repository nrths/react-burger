import { createSlice } from '@reduxjs/toolkit';
import { getTokens } from '../../utils/tokens';
import { deleteCookie } from '../../utils/cookies';
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

    // tokens: {
    //     accessToken: '',
    //     refreshToken: '',
    // },

    forgotAndResetPass: false,
    resetPass: false,
    isLoggedIn: false,

    loading: false,
    hasError: '',
}

const userRightsSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: builder => {
        builder
            // user registration
            .addCase(registration.pending, state => { state.loading = true })
            .addCase(registration.fulfilled, (state, { payload }) => {
                state.loading = false
                state.user = payload
                getTokens(payload)
            })
            .addCase(registration.rejected, state => {
                state.loading = false
                state.hasError = true
            })
            // forgot password
            .addCase(forgotPassword.pending, state => { state.loading = true })
            .addCase(forgotPassword.fulfilled, (state, { payload }) => {
                state.loading = false
                state.forgotAndResetPass = true
                console.log(payload)
            })
            .addCase(forgotPassword.rejected, state => {
                state.hasError = true
                state.forgotAndResetPass = false
            })
            // reset password
            .addCase(resetPassword.pending, state => { state.loading = true })
            .addCase(resetPassword.fulfilled, state => {
                state.loading = false
                state.forgotAndResetPass = true
                state.resetPass = true
            })
            .addCase(resetPassword.rejected, state => { state.hasError = true })
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
                state.isLoggedIn = true;
                getTokens(payload)
            })
            .addCase(login.rejected, (state, { payload }) => { state.hasError = `Ошибка: ${payload}` })
            // update token
            .addCase(updateToken.fulfilled, (state, { payload }) => {
                getTokens(payload)
            })
            .addCase(updateToken.rejected, state => { state.hasError = true })
            // getUserInfo
            .addCase(getUserInfo.pending, state => { state.loading = true })
            .addCase(getUserInfo.fulfilled, (state, { payload }) => {
                state.loading = false;
                state.user.name = payload.name;
                state.user.email = payload.email;
                state.user.password = payload.password;
            })
            .addCase(getUserInfo.rejected, state => { state.hasError = true })
            // update user information
            .addCase(updateUserInfo.pending, state => { state.loading = true })
            .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
                state.loading = false
                state.user = payload
                state.isLoggedIn = true;
            })
            .addCase(updateUserInfo.rejected, state => { state.hasError = true })
            // logout
            .addCase(logout.fulfilled, (state, { payload }) => {
                // state.tokens.accessToken = ''
                // state.tokens.refreshToken = ''
                state.isLoggedIn = false
                state.user = initialState.user
                localStorage.clear()
                deleteCookie('token')
            })
            .addCase(logout.rejected, (state, { payload }) => {
                state.hasError = true
            })
    }
})

// export const {

// } = userRightsSlice.actions

export const userSelector = state => state.auth

export default userRightsSlice.reducer