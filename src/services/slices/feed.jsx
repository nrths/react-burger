import { createSlice } from '@reduxjs/toolkit';

export const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    showOrder: null
}

export const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        getFeedData: (state, { payload }) => {
            state.orders = payload.orders
            state.total = payload.total
            state.totalToday = payload.totalToday
        },
        getShowOrder: (state, { payload }) => {
            state.showOrder = payload
        }
    },
})

export const { getFeedData, getShowOrder } = feedSlice.actions

export const feedSelector = state => state.feed
export default feedSlice.reducer