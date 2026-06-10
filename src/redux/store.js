import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import detailProductReducer from "./detailProductSlice";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    detailProduct: detailProductReducer,
    cart: cartReducer,
    checkout: checkoutReducer,

  },
});