import { fetchIngredients } from '../services/thunks/fetchIngredients';
import { ingredientsSlice } from '../services/slices/ingredientsSlice';

describe('Тестирование extraReducers слайса ingredientsSlice', function () {
  const initialState = {
    ingredientsArr: [],
    status: null,
    error: null
  };

  test('fetchIngredients.pending', function () {
    const action = { type: fetchIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.status).toBe('loading');
    expect(state.error).toBeNull();
  });
  test('fetchIngredients.fulfilled', function () {
    const mockData = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0
      }
    ];
    const action = { type: fetchIngredients.fulfilled.type, payload: mockData };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.status).toBe('done');
    expect(state.ingredientsArr).toEqual(mockData);
    expect(state.error).toBeNull();
  });
  test('fetchIngredients.rejected', function () {
    const action = { type: fetchIngredients.rejected.type };
    const state = ingredientsSlice.reducer(initialState, action);

    expect(state.status).toBe('Произошла ошибка');
    expect(state.error).toBe('Произошла ошибка');
  });
});
