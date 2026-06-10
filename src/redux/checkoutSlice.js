import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  form: {
    fullName: "",
    email: "",
    address: "",
    city: "",
  },
  shipping: {
    method: "pickup", // pickup | moto | delivery
    cost: 0,
  },
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setForm: (state, action) => {
      state.form = {
        ...state.form,
        ...action.payload,
      };
    },

    setShipping: (state, action) => {
      state.shipping = action.payload;
    },

    resetCheckout: () => initialState,
  },
});

export const { setForm, setShipping, resetCheckout } =
  checkoutSlice.actions;

export default checkoutSlice.reducer;