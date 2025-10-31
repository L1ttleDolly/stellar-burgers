import { createSlice } from '@reduxjs/toolkit';
import { fetchRegisterUser } from '../thunks/fetchRegisterUser';
import { fetchLoginUser } from '../thunks/fetchLoginUser';
import { TUser } from '@utils-types';
import { userLogout } from '../thunks/userLogout';
import { getUser } from '../thunks/getUserApi';
import { updateUser } from '../thunks/updateUser';

export interface IUserState {
  user: TUser | null;
  userCheck: boolean;
  error: string | undefined;
  isLoading: boolean;
}

const initialState: IUserState = {
  userCheck: false,
  user: null,
  error: undefined,
  isLoading: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserCheck: (state, action) => {
      state.userCheck = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRegisterUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchRegisterUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(fetchRegisterUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'Данный пользователь уже существует';
    });

    builder.addCase(fetchLoginUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLoginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(fetchLoginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'Неверный email или пароль';
    });
    builder.addCase(userLogout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(userLogout.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = null;
    });
    builder.addCase(userLogout.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'Ой, произошла ошибка!';
    });

    builder.addCase(getUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'Ошибка при получение данных пользователя';
    });
  }
});
export const { setUserCheck } = userSlice.actions;
export default userSlice.reducer;
