import { createAsyncThunk } from '@reduxjs/toolkit';
import { registerUserApi, TRegisterData } from '@api';
import { setCookie } from '../../utils/cookie';

export const fetchRegisterUser = createAsyncThunk(
  'user/fetchRegisterUser',
  async function (userData: TRegisterData) {
    const res = await registerUserApi(userData);
    if (!res.accessToken || !res.refreshToken || !res.user) {
      throw new Error();
    }

    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);

    return res.user;
  }
);
