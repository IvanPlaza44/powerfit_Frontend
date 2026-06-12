import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk para traer favoritos de la BD
export const fetchFavorites = createAsyncThunk(
  "favorites/fetchFavorites",
  async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const { data } = await axios(
      `http://localhost:4002/favorites/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return Array.isArray(data) ? data : [];
  }
);


// Thunk para agregar un favorito
export const addFavoriteAsync = createAsyncThunk('favorites/addFavorite',
  async (product) => {
        console.log("PRODUCTO RECIBIDO:", product);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const payload = {
        userId: Number(userId),      // ¿En tu FavoriteRequest se llama userId?
        productId: Number(product.id) // ¿O tal vez se llama idProducto / productoId?
      };
    console.log("PAYLOAD:", payload);

    const response = await axios.post(
        "http://localhost:4002/favorites",
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        }
      );
    console.log("RESPUESTA FAVORITO:", response.data);

    return response.data; // Devuelve el registro creado
  }

  
);

export const removeFavoriteAsync = createAsyncThunk(
  "favorites/removeFavorite",
  async (favoriteId, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:4002/favorites/${favoriteId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return favoriteId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Error al eliminar favorito"
      );
    }
  }
);



//

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: { 
    favorites: [], 
    error: null,
    loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // TRAER TODOS LOS FAVORITES
      .addCase(fetchFavorites.pending, (state)=>{
        state.loading = true, //aca puedo mostarr un spinner despues
        state.error = null
      })
      .addCase(fetchFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = Array.isArray(action.payload)
          ? action.payload
          : [];
      })
      .addCase(fetchFavorites.rejected, (state, action)=>{
        state.loading = false,
        state.error = action.error.message
      })
      // AGREGAR FAVORITOS

      .addCase(addFavoriteAsync.fulfilled, (state, action) => {
        state.loading = false;
        // Se añade al array correcto definido en tu initialState
        state.favorites.push(action.payload); 
      })
      .addCase(addFavoriteAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })



      //eLIMINAR FAVORITOS
      .addCase(removeFavoriteAsync.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(
          fav => fav.id !== action.payload
        );
      })

      .addCase(removeFavoriteAsync.rejected, (state, action) => {
        state.error = action.payload;
      })




  },
});

export default favoritesSlice.reducer;