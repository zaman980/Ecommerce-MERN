import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./Api/apiSlice";
// import authReducer from "./features/Auth/AuthSlice";
import favoritesReducer from "../redux/features/favourites/favouriteSlice";
import cartSliceReducer from "../redux/features/cart/cartSlice";
import shopReducer from "../redux/features/shop/shopSlice";
import { getFavoritesFromLocalStorage } from "../Utils/localStorage";
const initialFavorites = getFavoritesFromLocalStorage() || [];
// import  { initializeAuthState } from '../redux/features/Auth/AuthSlice';

// const preloadedState = {
//   auth: initializeAuthState(),
// };
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // auth: authReducer,
    favorites: favoritesReducer,
    cart: cartSliceReducer,
    shop: shopReducer
  },

  preloadedState: {
    favorites: initialFavorites
  },

  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true
});

setupListeners(store.dispatch);
export default store;
