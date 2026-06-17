import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from './favoritesSlice'
import registerSlice from './registerSlice'
import productReducer from "./productSlice";
import detailProductReducer from "./detailProductSlice";
import cartReducer from "./cartSlice";
import checkoutReducer from "./checkoutSlice";
import loginReducer from "./loginSlice"
import filterReducer from "./filterSlice";
import communityReducer from "./communitySlice";


export const store = configureStore({
  reducer: {
    login: loginReducer,
    favorites: favoritesSlice,
    register: registerSlice,
    products: productReducer,
    detailProduct: detailProductReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    filter: filterReducer, 
    community: communityReducer,
  },
});
