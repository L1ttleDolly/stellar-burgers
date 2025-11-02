import { createAsyncThunk } from '@reduxjs/toolkit';
import { TRegisterData, updateUserApi } from '@api';

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async function (userData: TRegisterData) {
    return await updateUserApi(userData);
  }
);
