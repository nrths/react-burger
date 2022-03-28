import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    user: {
        email: '',
        password: '',
        name: '',
    },

    token: {
        get: false,
        success: false,
        failed: false,
    },

    logoutRequest: false,
    logoutFailed: false,

    loading: false,
    hasError: false,
}

const userRightsSlice = createSlice({
    name: 'rights',
    initialState,
    reducers: {
        createUser: state => {
            state.loading = true;
        },
        createUserSuccess: (state, { payload }) => {
            console.log(payload);
            state.loading = false;
            state.user = payload;
        },
        createUserFailed: state => {
            state.hasError = true;
            state.loading = false;
        },
        login: state => {
            state.loading = true;
        },
        loginSuccess: (state, { payload }) => {
            state.loading = false;
            state.user.email = payload.user.email;
            state.user.password = payload.user.password;
        },
        loginFailed: state => {
            state.hasError = true;
            state.loading = false;
        },
        getToken: state => {
            state.token.get = true;
        },
        getTokenSuccess: state => {
            state.token.get = false;
            state.token.success = true;
            state.token.failed = false;
        },
        getTokenFailed: state => {
            state.token.get = false;
            state.token.success = false;
            state.token.failed = true;
        },
        getUser: state => {
            state.loading = true;
        },
        getUserSuccess: (state, { payload }) => {
            // console.log(payload)
            state.loading = false;
            state.user.name = payload.user.name;
            state.user.email = payload.user.email;
            state.user.password = payload.user.password;
        },
        getUserFailed: state => {
            state.hasError = true;
            // state.user = initialState.user;
        },
        updateUser: state => {
            state.loading = true;
        },
        updateUserSuccess: (state, { payload }) => {
            state.loading = false;
            state.user = payload;
            //state.user.password = payload.user.password;
        },
        updateUserFailed: (state) => {
            state.hasError = true;
        },
        logout: (state) => {
            state.logoutRequest = true;
        },
        logoutSuccess: (state) => {
            state.logoutRequest = false;
            state.logoutFailed = false;
        },
        logoutFailed: (state) => {
            state.logoutFailed = true;
        }
    }
})

export const {
    createUser, createUserSuccess, createUserFailed,
    login, loginSuccess, loginFailed,
    getToken, getTokenSuccess, getTokenFailed,
    getUser, getUserSuccess, getUserFailed,
    updateUser, updateUserSuccess, updateUserFailed,
    logout, logoutSuccess, logoutFailed
} = userRightsSlice.actions

export const userSelector = state => state.auth

export default userRightsSlice.reducer