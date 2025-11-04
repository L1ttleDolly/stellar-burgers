import { createAsyncThunk } from '@reduxjs/toolkit';
import { orderBurgerApi } from '@api';
import { clearOrder } from '../slices/orderSlice';
import { clearConstructor } from '../slices/constructorSlice';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async function (data: string[], { dispatch }) {
    const res = await orderBurgerApi(data);
    dispatch(clearConstructor(res.success));
    return res;
  }
);
