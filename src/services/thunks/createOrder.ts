import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async function (data: string[]) {
    const res = await orderBurgerApi(data);
    return res;
  }
);
