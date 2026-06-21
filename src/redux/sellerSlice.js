import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



export const fetchMyProducts = createAsyncThunk(
  "seller/fetchMyProducts",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        "http://localhost:4002/products/seller",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data.content || data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al cargar productos"
      );
    }
  }
);



export const deleteProduct = createAsyncThunk(
  "seller/deleteProduct",
  async (productId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:4002/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al eliminar"
      );
    }
  }
);



export const updateProduct = createAsyncThunk(
  "seller/updateProduct",
  async ({ id, productData }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.put(
        `http://localhost:4002/products/${id}`,
        productData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al actualizar"
      );
    }
  }
);



export const becomeSeller = createAsyncThunk(
  "seller/becomeSeller",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        "http://localhost:4002/users/become-seller",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return true;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al cambiar rol"
      );
    }
  }
);

const sellerSlice = createSlice({
  name: "seller",

  initialState: {
    products: [],
    loading: false,
    error: null,
    isSeller: false,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      //fetch

      .addCase(fetchMyProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchMyProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchMyProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // borrar

      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => p.id !== action.payload
        );
      })

      // update

      .addCase(updateProduct.fulfilled, (state, action) => {
        state.products = state.products.map((p) =>
          p.id === action.payload.id
            ? action.payload
            : p
        );
      })

      // convertiser en vendendor

      .addCase(becomeSeller.pending, (state) => {
        state.loading = true;
      })

      .addCase(becomeSeller.fulfilled, (state) => {
        state.loading = false;
        state.isSeller = true;
      })

      .addCase(becomeSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default sellerSlice.reducer;