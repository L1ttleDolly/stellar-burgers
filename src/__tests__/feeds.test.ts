import { ingredientsSlice } from '../services/slices/ingredientsSlice';
import feedsSlice from '../services/slices/feedsSlice';
import { fetchFeeds } from '../services/thunks/fetchFeeds';
import { fetchGetOrderByNumber } from '../services/thunks/fetchGetOrderByNumber';
import { fetchUserOrders } from '../services/thunks/fetchUserOrders';

describe('Тестирование extraReducers слайса feedsSlice', function () {
  const initialState = {
    feedsArr: { orders: [], total: 0, totalToday: 0 },
    currentOrder: { order: [] },
    userOrders: [],
    status: false,
    error: null
  };

  test('fetchFeeds.pending', () => {
    const state = feedsSlice(initialState, { type: fetchFeeds.pending.type });
    expect(state.status).toBe(false);
    expect(state.error).toBe('null');
  });
  test('fetchFeeds.fulfilled', () => {
    const payload = {
      success: true,
      orders: [{ id: 1 }],
      total: 10,
      totalToday: 5
    };

    const state = feedsSlice(initialState, {
      type: fetchFeeds.fulfilled.type,
      payload
    });

    expect(state.status).toBe(true);
    expect(state.feedsArr).toEqual(payload);
  });

  test('fetchFeeds.rejected', () => {
    const state = feedsSlice(initialState, { type: fetchFeeds.rejected.type });
    expect(state.error).toBe('error');
  });

  test('fetchGetOrderByNumber.fulfilled', () => {
    const payload = {
      success: true,
      orders: [{ number: 123 }]
    };
    const state = feedsSlice(initialState, {
      type: fetchGetOrderByNumber.fulfilled.type,
      payload
    });
    expect(state.currentOrder.order).toEqual(payload.orders);
    expect(state.status).toBe(true);
  });

  test('fetchUserOrders.fulfilled', () => {
    const payload = [{ id: 1 }];
    const state = feedsSlice(initialState, {
      type: fetchUserOrders.fulfilled.type,
      payload
    });
    expect(state.userOrders).toEqual(payload);
  });
});
