import { createSlice, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { TRootState } from '../index';
import { TOrder } from '../types/types';

type TFeedState = {
    orders: TOrder[],
    total: number,
    totalToday: number,
    showOrder: TOrder | null,
}

export const initialState: TFeedState = {
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
            // console.log(payload)
        }
    },
})

export const { getFeedData, getShowOrder } = feedSlice.actions
export const FeedActions = feedSlice.actions

export const feedSelector = (state: TRootState) => state.feed
export default feedSlice.reducer