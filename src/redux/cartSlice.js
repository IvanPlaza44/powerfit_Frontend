import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET CART
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (userId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return thunkAPI.rejectWithValue("No token");
      }

      const { data } = await axios.get(
        `http://localhost:4002/cart/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error fetching cart"
      );
    }
  }
);

// ADD PRODUCT
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `http://localhost:4002/cart/${userId}/products`,
        { productId, quantity: 1 },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// UPDATE PRODUCT
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:4002/cart/${userId}/products/${productId}?quantity=${quantity}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return userId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

// DELETE PRODUCT
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:4002/cart/${userId}/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;