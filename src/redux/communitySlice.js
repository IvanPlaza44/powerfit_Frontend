import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:4002/community";

export const fetchPosts = createAsyncThunk(
  "community/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(API_URL);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al cargar publicaciones"
      );
    }
  }
);

export const addPost = createAsyncThunk(
  "community/addPost",
  async (postData) => {

    const token = localStorage.getItem("token");

    const { data } = await axios.post(
      API_URL,
      postData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  }
);

export const deletePost = createAsyncThunk(
  "community/deletePost",
  async (id) => {

    const token = localStorage.getItem("token");

    await axios.delete(
      `${API_URL}/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return id;
  }
);

const communitySlice = createSlice({
  name: "community",

  initialState: {
    posts: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload || [];
      })

      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.unshift(action.payload);
      })

      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.id !== action.payload
        );
      });
  },
});

export default communitySlice.reducer;