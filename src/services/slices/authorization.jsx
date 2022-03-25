import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    user: {
        email: '',
        password: '',
        name: '',
    },
    loading: false,
    hasError: false,
}

const authSlice = createSlice({
    name: 'auth',
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
        }
    }
})

export const {
    createUser, createUserSuccess, createUserFailed
} = authSlice.actions

export default authSlice.reducer