import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

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
    addItem: {
      prepare: (item: TIngredient) => {
        const id = new Date().toISOString();
        return { payload: { ...item, id } };
      },

      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.constructorItems.bun = action.payload;
        } else {
          state.constructorItems.ingredients.push(action.payload);
        }
      }
    },
    deleteItem(state, action) {
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload.id
        );
    },

    clearConstructor(state, action) {
      if (action.payload === true) {
        state.constructorItems.ingredients = [];
        state.constructorItems.bun = null;
      }
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
