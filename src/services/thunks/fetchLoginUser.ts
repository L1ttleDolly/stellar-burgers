import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginUserApi, TLoginData } from '@api';
import { setCookie } from '../../utils/cookie';

export const fetchLoginUser = createAsyncThunk(
  'user/fetchLoginUser',
  async function (userData: TLoginData) {
    const res = await loginUserApi(userData);
    if (!res.accessToken || !res.refreshToken || !res.user) {
      throw new Error('Invalid response');
    }

    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res;
  }
);
