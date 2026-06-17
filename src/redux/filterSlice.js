import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  category: null,
  search: "",
  sortOrder: "",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },

    clearCategory: (state) => {
      state.category = null;
    },

    setSearch: (state, action) => {
      state.search = action.payload;
    },

    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },

    clearFilters: (state) => {
      state.category = null;
      state.search = "";
      state.sortOrder = "";
    },
  },
});

export const {
  setCategory,
  clearCategory,
  setSearch,
  setSortOrder,
  clearFilters,
} = filterSlice.actions;


export default filterSlice.reducer;