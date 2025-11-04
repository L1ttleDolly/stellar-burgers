import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserApi } from '@api';
import { setUserCheck } from '../slices/userSlice';

export const getUser = createAsyncThunk(
  'user/getUser',
  async function (_, { dispatch }) {
    try {
      const user = await getUserApi();
      return user;
    } catch (err) {
      throw err;
    } finally {
      dispatch(setUserCheck(true));
    }
  }
);
