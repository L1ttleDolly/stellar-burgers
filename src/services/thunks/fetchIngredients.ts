import { createAsyncThunk } from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async function () {
    try {
      return await getIngredientsApi();
    } catch (error) {
      throw error;
    }
  }
);
