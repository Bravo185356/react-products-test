import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/types';

interface FavoriteProductsState {
  favorites: Product[];
}

const initialState: FavoriteProductsState = {
  favorites: [],
};

const favoriteProductsSlice = createSlice({
  name: 'favoriteProducts',
  initialState,
  reducers: {
    addFavoriteProduct(state, actions: PayloadAction<Product>) {
      state.favorites.push(actions.payload);
    },
    deleteFromFavorite(state, actions: PayloadAction<number>) {
      const index = state.favorites.findIndex(product => product.id === actions.payload);
      state.favorites.splice(index, 1);
    },
  },
});

export const { addFavoriteProduct, deleteFromFavorite } = favoriteProductsSlice.actions;

export default favoriteProductsSlice.reducer;
