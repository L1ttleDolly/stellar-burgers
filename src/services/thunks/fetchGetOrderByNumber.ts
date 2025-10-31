import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderByNumberApi } from '@api';

export const fetchGetOrderByNumber = createAsyncThunk(
  'feeds/fetchGetOrderByNumber',

  async function (orderNumber: number) {
    try {
      return await getOrderByNumberApi(orderNumber);
    } catch (error) {
      throw error;
    }
  }
);
