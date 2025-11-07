import { rootReducer } from '../services/store';

describe('rootReducer', function () {
  test('Должен корректно инициализироваться', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state.ingredients).toEqual({
      ingredientsArr: [],
      status: null,
      error: null
    });

    expect(state.constructorSlice).toEqual({
      constructorItems: {
        bun: null,
        ingredients: []
      }
    });

    expect(state.feeds).toEqual({
      feedsArr: {
        orders: [],
        total: 0,
        totalToday: 0
      },
      currentOrder: {
        order: []
      },
      userOrders: [],
      status: false,
      error: null
    });

    expect(state.user).toEqual({
      userCheck: false,
      user: null,
      error: undefined,
      isLoading: false
    });

    expect(state.order).toEqual({
      order: null,
      success: false,
      isLoading: false,
      clearConstructor: false,
      error: null
    });
  });
});
