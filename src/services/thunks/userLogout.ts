import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutApi } from '@api';
import { deleteCookie } from '../../utils/cookie';

export const userLogout = createAsyncThunk(
  'user/userLogout',
  async function () {
    logoutApi()
      .then((res) => {
        localStorage.clear();
        deleteCookie('accessToken');
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
