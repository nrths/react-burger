import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
}

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        getFeedData: (state, { payload }) => {
            state.orders = payload.orders
            state.total = payload.total
            state.totalToday = payload.totalToday
        }
    },
})

export const { getFeedData } = feedSlice.actions

export const feedSelector = state => state.orders
export default feedSlice.reducer