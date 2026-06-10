import { configureStore } from "@reduxjs/toolkit";
import favoritesSlice from './favoritesSlice'
import registerSlice from './registerSlice'

export const store = configureStore(
    {
        reducer: {
            favorites: favoritesSlice,
            register: registerSlice,
        }
    }
);
