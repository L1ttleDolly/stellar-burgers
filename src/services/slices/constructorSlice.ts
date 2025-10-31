import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient } from '@utils-types';

type TItems = {
  constructorItems: {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
  };
};

const initialState: TItems = {
  constructorItems: {
    bun: null,
    ingredients: []
  }
};

export const constructorSlice = createSlice({
  name: 'constructor',
  initialState,
  reducers: {
    addItem(state, action) {
      const ingredient = {
        ...action.payload,
        id: new Date().toISOString()
      };

      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(ingredient);
      }
    },

    deleteItem(state, action) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },

    clearConstructor(state, action) {
      state.constructorItems.ingredients = [];
      state.constructorItems.bun = null;
    },

    updateIngredientsPosition(state, action) {
      state.constructorItems.ingredients = action.payload;
    }
  }
});
export const {
  addItem,
  deleteItem,
  clearConstructor,
  updateIngredientsPosition
} = constructorSlice.actions;

export default constructorSlice.reducer;
