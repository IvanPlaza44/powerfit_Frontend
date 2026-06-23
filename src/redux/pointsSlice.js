import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPoints = createAsyncThunk(
  "points/fetchPoints",
  async (userId) => {

    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      `http://localhost:4002/users/${userId}/points`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  }
);

export const redeemPoints = createAsyncThunk(
  "points/redeemPoints",
  async ({ userId, pointsCost, benefitName }) => {

    const token = localStorage.getItem("token");

    const { data } = await axios.post(
      `http://localhost:4002/users/${userId}/redeem`,
      {
        pointsCost,
        benefitName,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  }
);

const pointsSlice = createSlice({
  name: "points",

  initialState: {
    points: 0,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchPoints.fulfilled, (state, action) => {
        state.points = action.payload;
      })

      .addCase(redeemPoints.fulfilled, (state, action) => {
        state.points = action.payload;
      });
  },
});

export default pointsSlice.reducer;