import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, ResponseProduct } from '../../types/types';
import { LIMIT_ITEMS_PER_PAGE } from '../../constants';

interface FavoriteProductsState {
  products: Product[];
  skip: number;
  limit: number;
  total: number;
}

const initialState: FavoriteProductsState = {
  products: [],
  skip: 0,
  limit: LIMIT_ITEMS_PER_PAGE,
  total: 0,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProductList(state, actions: PayloadAction<ResponseProduct>) {
      state.products = actions.payload.products;
      state.skip = actions.payload.skip;
      state.total = actions.payload.total;
    },
    addNewProduct(state, actions: PayloadAction<Product>) {
      state.products.push(actions.payload);
    },
    deleteProduct(state, actions: PayloadAction<number>) {
        const index = state.products.findIndex(product => product.id === actions.payload)
        state.products.splice(index, 1)
    },
    editProductItem(state, actions: PayloadAction<Product>) {
      const index = state.products.findIndex(product => product.id === actions.payload.id)
      state.products[index] = actions.payload
    },
    setNextPage(state) {
      state.skip += state.limit;
    },
    setPrevPage(state) {
      state.skip -= state.limit;
    },
    resetPage(state) {
      state.skip = 0;
    },
  },
});

export const { 
  setProductList, 
  addNewProduct, 
  deleteProduct, 
  editProductItem, 
  setNextPage, 
  setPrevPage, 
  resetPage 
} = productsSlice.actions;

export default productsSlice.reducer;
