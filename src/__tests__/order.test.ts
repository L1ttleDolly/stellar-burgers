import orderSlice, { clearOrder } from '../services/slices/orderSlice';
import { createOrder } from '../services/thunks/createOrder';
import { TOrder } from '@utils-types';

describe('Тестирование  reducers слайса orderSlice ', () => {
  const initialState = {
    order: null,
    success: false,
    isLoading: false,
    clearConstructor: false,
    error: null
  };

  test('Тестирование очищения заказа - clearOrder', () => {
    const stateWithOrder = {
      ...initialState,
      order: {
        _id: '643d69a5c3f7b9001cfa093f',
        number: 99999,
        status: 'done',
        name: 'Мясо бессмертных моллюсков Protostomia',
        createdAt: '2025-11-07T18:00:00Z',
        updatedAt: '2025-11-07T18:00:00Z',
        ingredients: ['ingredient1', 'ingredient2']
      },
      success: true
    };
    const state = orderSlice(stateWithOrder, clearOrder());
    expect(state).toEqual(initialState);
  });

  test('createOrder.pending', () => {
    const state = orderSlice(initialState, { type: createOrder.pending.type });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  test('createOrder.fulfilled', () => {
    const payload = {
      order: {
        _id: '643d69a5c3f7b9001cfa093f',
        number: 99999,
        status: 'done',
        name: 'Мясо бессмертных моллюсков Protostomia',
        createdAt: '2025-11-07T18:00:00Z',
        updatedAt: '2025-11-07T18:00:00Z',
        ingredients: ['ingredient1', 'ingredient2']
      },
      success: true
    };

    const state = orderSlice(initialState, {
      type: createOrder.fulfilled.type,
      payload
    });

    expect(state.order).toEqual(payload.order);
    expect(state.success).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  test('createOrder.rejected', () => {
    const state = orderSlice(initialState, { type: createOrder.rejected.type });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('error');
  });
});
