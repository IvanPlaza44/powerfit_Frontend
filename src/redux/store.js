import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./productSlice";
import detailProductReducer from "./detailProductSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    detailProduct: detailProductReducer,
  },
});