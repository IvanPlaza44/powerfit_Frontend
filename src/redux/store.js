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
import sellerReducer from "./sellerSlice";
import pointsReducer from "./pointsSlice"

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
    seller: sellerReducer,
    points: pointsReducer,
    community : communityReducer
  },
});
