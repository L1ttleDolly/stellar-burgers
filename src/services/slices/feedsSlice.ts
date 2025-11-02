import { createSlice } from '@reduxjs/toolkit';
import { TOrdersData, TOrder } from '@utils-types';
import { fetchFeeds } from '../thunks/fetchFeeds';
import { fetchGetOrderByNumber } from '../thunks/fetchGetOrderByNumber';
import { fetchUserOrders } from '../thunks/fetchUserOrders';

interface IFeedsState {
  feedsArr: TOrdersData;
  currentOrder: {
    order: TOrder[];
  };
  userOrders: TOrder[];
  status: boolean;
  error: string | null;
}

const initialState: IFeedsState = {
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
};

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchFeeds.pending, (state) => {
      (state.status = false), (state.error = 'null');
    });
    builder.addCase(fetchFeeds.fulfilled, (state, action) => {
      (state.status = action.payload.success),
        (state.feedsArr = action.payload);
    });
    builder.addCase(fetchFeeds.rejected, (state) => {
      state.error = 'error';
    });

    builder.addCase(fetchGetOrderByNumber.pending, (state) => {
      state.status = false;
    });
    builder.addCase(fetchGetOrderByNumber.fulfilled, (state, action) => {
      state.currentOrder.order = action.payload.orders;
      state.status = action.payload.success;
    });
    builder.addCase(fetchGetOrderByNumber.rejected, (state) => {
      state.error = 'error';
    });

    builder.addCase(fetchUserOrders.pending, (state) => {
      state.status = false;
    });
    builder.addCase(fetchUserOrders.fulfilled, (state, action) => {
      state.userOrders = action.payload;
    });
    builder.addCase(fetchUserOrders.rejected, (state) => {
      state.error = 'error';
    });
  }
});

export default feedsSlice.reducer;
