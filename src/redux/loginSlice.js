import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "login/loginUser",
  async (loginData, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4002/auth/authenticate",
        loginData
      );

      return data;

    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al iniciar sesión"
      );
    }
  }
);

const loginSlice = createSlice({
  name: "login",

  initialState: {
    user: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.user = {
          token: action.payload.access_token,
          role: action.payload.role,
        };
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;