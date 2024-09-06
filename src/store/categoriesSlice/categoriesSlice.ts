import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CategoriesState {
  categories: string[];
}

const initialState: CategoriesState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, actions: PayloadAction<string[]>) {
      state.categories = actions.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
