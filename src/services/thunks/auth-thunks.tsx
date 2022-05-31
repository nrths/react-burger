import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl, headers } from "../../utils/constants";
import { checkResponse } from "../../utils/check-funcs";
import { getCookie } from "../../utils/cookies";
import { TUserData, TLogin, TResetPassword } from "../types/types";

export const registration = createAsyncThunk(
  "auth/registration",
  async (form: TUserData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(form),
      });
      const data = await checkResponse(response);
      return data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (form: TLogin, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/auth/login`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(form),
      });
      const data = await checkResponse(response);
      return data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const updateToken = createAsyncThunk(
  "auth/updateToken",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/auth/token`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ token: getCookie("refreshToken") }),
      });
      console.log(response);
      if (response.status !== 200) {
        updateToken();
      }
      const data = await checkResponse(response);
      return data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const getUserInfo = createAsyncThunk(
  "auth/getUserInfo",
  async (_, { rejectWithValue }) => {
    try {
      
        const response = await fetch(`${baseUrl}/auth/user`, {
          method: "GET",
          headers: {
            ...headers,
            'Authorization': `${getCookie("accessToken")}`,
          },
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          redirect: "follow",
          referrerPolicy: "no-referrer",
        });
        const data = await checkResponse(response);
        return data;
      
    } catch (err) {
        const e = err as Error;
        console.log(e)
      if (e.message === 'jwt expired') {
        updateToken()
      }
      return rejectWithValue(e.message);
    }
  }
);

export const updateUserInfo = createAsyncThunk(
  "auth/updateUserInfo",
  async (form: TUserData, { rejectWithValue }) => {
    try {
      if (getCookie("accessToken")) {
        const response = await fetch(`${baseUrl}/auth/user`, {
          method: "PATCH",
          headers: {
            ...headers,
            'Authorization': `${getCookie("accessToken")}`,
          },
          body: JSON.stringify(form),
          mode: "cors",
          cache: "no-cache",
          credentials: "same-origin",
          redirect: "follow",
          referrerPolicy: "no-referrer",
        });
        const data = await checkResponse(response);
        console.log(data);
        return data.user;
      }
    } catch (err) {
        const e = err as Error;
      if (e.message === 'jwt expired' || e.message === 'Token is invalid') {
          updateToken()
      }
      return rejectWithValue(e.message);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/auth/logout`, {
        method: "POST",
        headers: {
            ...headers,
          'Authorization': `${getCookie("accessToken")}`,
        },
        body: JSON.stringify({ token: getCookie("refreshToken") }),
      });
      const data = await checkResponse(response);
      return data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/password-reset`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email: email }),
      });
      const data = await checkResponse(response);
      return data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (form: TResetPassword, { rejectWithValue }) => {
    try {
      const response = await fetch(`${baseUrl}/password-reset/reset`, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(form),
      });
      const data = await checkResponse(response);
      console.log(data);
      return data;
    } catch (err) {
      return rejectWithValue((err as Error).message);
    }
  }
);
