import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// GET CART
export const fetchCart = createAsyncThunk("cart/fetchCart", async (userId) => {
  const token = localStorage.getItem("token");

  const { data } = await axios.get(
    `http://localhost:4002/cart/${userId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  return data;
});

// ADD PRODUCT
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ userId, productId }) => {
    const token = localStorage.getItem("token");

    await axios.post(
      `http://localhost:4002/cart/${userId}/products`,
      { productId, quantity: 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return userId;
  }
);

// UPDATE PRODUCT
export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ userId, productId, quantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `http://localhost:4002/cart/${userId}/products/${productId}?quantity=${quantity}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return userId;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  }
);

// DELETE PRODUCT
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ userId, productId }) => {
    const token = localStorage.getItem("token");

    await axios.delete(
      `http://localhost:4002/cart/${userId}/products/${productId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return userId;
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
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
        state.error = action.error.message;
      });
  },
});

export default cartSlice.reducer;