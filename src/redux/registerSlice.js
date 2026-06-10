import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const registerUser = createAsyncThunk(
  "register/registerUser",
  async (newUser, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4002/auth/register",
        newUser
      );

      return data;

    } catch (error) {
      console.log("BACKEND ERROR:");
      console.log(error.response?.data);

      return thunkAPI.rejectWithValue(
        error.response?.data
      );
    }
  }
);

const registerSlice = createSlice({
  name: "register",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })

      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default registerSlice.reducer;