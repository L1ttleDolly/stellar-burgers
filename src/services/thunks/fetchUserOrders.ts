import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersApi } from '@api';

export const fetchUserOrders = createAsyncThunk(
  'feeds/fetchUserOrders',
  getOrdersApi
);
