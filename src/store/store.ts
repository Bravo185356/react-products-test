import { configureStore } from '@reduxjs/toolkit';
import favoriteProductsReducer from './favoriteProductsSlice/favoriteProductsSlice';
import productsSlice from './productsSlice/productsSlice';
import categoriesSlice from './categoriesSlice/categoriesSlice';

export const store = configureStore({
  reducer: {
    favoriteProducts: favoriteProductsReducer,
    products: productsSlice,
    categories: categoriesSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
