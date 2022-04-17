import { createSlice } from '@reduxjs/toolkit';
// import { wsUrl } from '../../utils/constants';
// import { getCookie } from '../../utils/cookies';

const initialState = {
    webSocket: null,
    wsConnected: false,
    wsHasError: false,
}

export const webSocketSlice = createSlice({
    name: 'websocket',
    initialState,
    reducers: {
        wsInit: (state, { payload }) => {
            console.log(payload)
        },
        wsClose: state => {
            state.wsConnected = false
            state.wsHasError = false
        },
        wsError: state => {
            state.wsConnected = false
            state.wsHasError = true
        },
        wsSuccess: state => {
            state.wsConnected = true
            state.wsHasError = false
        },
    }
})

export const {
    wsInit, wsClose, wsError, wsSuccess, wsStop
} = webSocketSlice.actions

export const wsSelector = state => state.webSocket
export default webSocketSlice.reducer