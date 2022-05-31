import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/index";
import { socketMiddleware } from "./middleware/socketMiddleware";
import { wsActions } from "./slices/web-socket";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(socketMiddleware(wsActions)),
});

export type TRootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
