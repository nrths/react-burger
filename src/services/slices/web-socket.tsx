import { createSlice } from "@reduxjs/toolkit";

type TWSState = {
  wsConnected: boolean;
  wsHasError: boolean;
};

const initialState: TWSState = {
  // webSocket: null,
  wsConnected: false,
  wsHasError: false,
};

export const webSocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    wsInit: (state, { payload }) => {},
    wsClose: (state) => {
      state.wsConnected = false;
      state.wsHasError = false;
    },
    wsError: (state) => {
      state.wsConnected = false;
      state.wsHasError = true;
    },
    wsSuccess: (state) => {
      state.wsConnected = true;
      state.wsHasError = false;
    },
  },
});

export const { wsInit, wsClose, wsError, wsSuccess } = webSocketSlice.actions;
export const wsActions = webSocketSlice.actions;

export default webSocketSlice.reducer;
