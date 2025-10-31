import { createSlice } from '@reduxjs/toolkit';
import { createOrder } from '../thunks/createOrder';
import { TOrder } from '@utils-types';

interface IOrder {
  order: TOrder | null;
  success: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: IOrder = {
  order: null,
  success: false,
  isLoading: false,
  error: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => initialState
  },
  extraReducers: (builder) => {
    builder.addCase(createOrder.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });

    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.order = action.payload.order;
      state.success = action.payload.success;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(createOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'error';
    });
  }
});

export const { clearOrder } = orderSlice.actions;

export default orderSlice.reducer;
