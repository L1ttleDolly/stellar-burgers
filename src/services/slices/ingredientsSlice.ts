import { createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';
import { fetchIngredients } from '../thunks/fetchIngredients';

interface IngredientsState {
  ingredientsArr: TIngredient[];
  status: string | null;
  error: string | null;
}

const initialState: IngredientsState = {
  ingredientsArr: [],
  status: null,
  error: null
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchIngredients.pending, (state, action) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.status = 'done';
      state.ingredientsArr = action.payload;
    });
  }
});

export default ingredientsSlice.reducer;
