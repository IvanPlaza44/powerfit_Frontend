import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPoints = createAsyncThunk(
  "points/fetchPoints",
  async (userId, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return 0;

      const { data } = await axios.get(
        `http://localhost:4002/users/${userId}/points`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data; // Debe retornar un número directo, ej: 150
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error al obtener puntos");
    }
  }
);

export const redeemPoints = createAsyncThunk(
  "points/redeemPoints",
  async ({ userId, pointsCost, benefitName }, { rejectWithValue }) => {
    try {
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
      return data; // Retorna el nuevo balance numérico de puntos tras el canje
    } catch (error) {
      return rejectWithValue(error.response?.data || "No se pudo procesar el canje");
    }
  }
);

const pointsSlice = createSlice({
  name: "points",
  initialState: {
    points: 0, // Inicia limpiamente en cero
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