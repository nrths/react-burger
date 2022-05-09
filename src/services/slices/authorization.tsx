import { createSlice } from "@reduxjs/toolkit";
import { TRootState } from "../index";
import { deleteCookie, setCookie, getCookie } from "../../utils/cookies";
import {
  registration,
  forgotPassword,
  resetPassword,
  login,
  updateToken,
  getUserInfo,
  updateUserInfo,
  logout,
} from "../thunks/auth-thunks";
import { TUserData } from "../types/types";

type TAuthState = {
  user: TUserData; // Array<{[key: string]: string}>
  registerSuccess: boolean;
  forgotAndResetPass: boolean;
  isLoggedIn: boolean;
  updated: boolean;
  loading: boolean;
  error: string;
};

export const initialState: TAuthState = {
  user: {
    email: "",
    password: "",
    name: "",
  },
  registerSuccess: false,
  forgotAndResetPass: false,
  isLoggedIn: !!getCookie("accessToken"),
  updated: false,

  loading: false,
  error: "",
};

const userRightsSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUpdateMessage: (state) => {
      state.updated = false;
    },
    resetErrors: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder
      // user registration
      .addCase(registration.pending, (state) => {
        state.loading = true;
      })
      .addCase(registration.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        setCookie("accessToken", payload.accessToken, { expires: 20 * 60 });
        setCookie("refreshToken", payload.refreshToken);
        payload.success === true
          ? (state.registerSuccess = true)
          : (state.registerSuccess = false);
      })
      .addCase(registration.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = `Ошибка: ${payload}`;
      })
      // forgot password
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.forgotAndResetPass = true;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.error = `Ошибка: ${payload}`;
        state.forgotAndResetPass = false;
      })
      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.forgotAndResetPass = true;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.loading = false;
        console.log(payload);
        state.error = `Ошибка: ${payload}`;
      })
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.forgotAndResetPass = false;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.isLoggedIn = true;
        state.user.name = payload.user.name;
        state.user.email = payload.user.email;
        state.user.password = payload.user.password;
        setCookie("accessToken", payload.accessToken, { expires: 20 * 60 });
        setCookie("refreshToken", payload.refreshToken);
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.isLoggedIn = false;
        state.loading = false;
        state.error = `Ошибка: ${payload}`;
      })
      // update token
      .addCase(updateToken.fulfilled, (state, { payload }) => {
        setCookie("accessToken", payload.accessToken, { expires: 20 * 60 });
        setCookie("refreshToken", payload.refreshToken);
        state.isLoggedIn = true;
      })
      .addCase(updateToken.rejected, (state, { payload }) => {
        state.error = `Ошибка: ${payload}`;
        state.isLoggedIn = false;
      })
      // getUserInfo
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user.name = payload.user.name;
        state.user.email = payload.user.email;
        state.user.password = payload.user.password;
      })
      .addCase(getUserInfo.rejected, (state, { payload }) => {
        state.error = `Ошибка: ${payload}`;
        // deleteCookie("accessToken");
      })
      // update user information
      .addCase(updateUserInfo.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUserInfo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.updated = true;
      })
      .addCase(updateUserInfo.rejected, (state, { payload }) => {
        state.error = `Ошибка: ${payload}`;
      })
      // logout
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.isLoggedIn = false;
        state.user = initialState.user;
        deleteCookie("accessToken");
        deleteCookie("refreshToken");
      })
      .addCase(logout.rejected, (state, { payload }) => {
        state.error = `Ошибка: ${payload}`;
      });
  },
});

export const { resetUpdateMessage, resetErrors } = userRightsSlice.actions;

export const userSelector = (state: TRootState) => state.auth;

export default userRightsSlice.reducer;
