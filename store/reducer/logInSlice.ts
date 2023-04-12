import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { attachAuthToken, baseService, fillToken } from "../../api/api";

import { IForm } from "../../screens/LogInScreen";
import { Root, Body } from "../../types/types";

interface LogInState {
  loading: boolean;
  data: Root;
  error: unknown;
}

const initialState: LogInState = {
  loading: false,
  data: {} as Root,
  error: "",
};

export const signIn = createAsyncThunk(
  "token/getToken",
  async (admin: IForm, thunkAPI) => {
    try {
      const { data } = await baseService.post("/auth/tokens/create/", admin);
      fillToken(data.accessToken);
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getData = createAsyncThunk(
  "data/getData",
  async (body: Body, thunkAPI) => {
    try {
      const value = await AsyncStorage.getItem("authorization");
      attachAuthToken(value as string);
      if (value !== null) {
        const { data } = await baseService.get("/content/statistics/", {
          params: body,
        });
        return data;
      }
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const logInSlice = createSlice({
  name: "logIn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(signIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
    });
  },
});

export default logInSlice.reducer;
