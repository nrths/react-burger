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
            console.log(payload)
            state.loading = false;
            state.user.name = payload.user.name;
            state.user.email = payload.user.email;
            // state.user.password = payload.user.password;
        },
        getUserFailed: state => {
            state.hasError = true;
            // state.user = initialState.user;
        },
    }
})

export const {
    createUser, createUserSuccess, createUserFailed,
    login, loginSuccess, loginFailed,
    getToken, getTokenSuccess, getTokenFailed,
    getUser, getUserSuccess, getUserFailed
} = userRightsSlice.actions

export const userSelector = state => state.user

export default userRightsSlice.reducer