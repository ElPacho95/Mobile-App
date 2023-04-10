import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { IForm } from "../../Screens/LogInScreen";

import axios from "axios";

export interface Root {
  subscribers: number;
  view: number;
  coverage: number;
  favourites: number;
  postsForwarding: number;
  uniqueChats: number;
  geography: Geography[];
  orders: number;
}

export interface Geography {
  city: string;
  count: number;
}

interface AdminState {
  loading: boolean;
  data: Root;
  error: any;
}

const initialState: AdminState = {
  loading: false,
  data: {} as Root,
  error: "",
};

export const signIn = createAsyncThunk(
  "token/getToken",
  async (admin: IForm, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "https://api.quickclick.online/auth/tokens/create/",
        admin
      );
      await AsyncStorage.setItem("token", `${data.accessToken}`);
    } catch (e) {
      console.log("Error saving data: ", e);
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const getData = createAsyncThunk(
  "data/getData",
  async (body: any, thunkAPI) => {
    try {
      const value = await AsyncStorage.getItem("token");
      if (value !== null) {
        const response = await axios.get(
          "https://api.quickclick.online/content/statistics/",
          {
            headers: {
              accept: "application/json",
              Authorization: `Bearer ${value}`,
              "Content-Type": "application/json",
            },
            params: body,
          }
        );
        return response.data;
      } else {
        console.log("data not found");
      }
    } catch (e: any) {
      console.log("Error retrieving data: ", e.message);
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
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

export default adminSlice.reducer;
