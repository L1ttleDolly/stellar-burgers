import userReducer, { setUserCheck } from '../services/slices/userSlice';
import { fetchRegisterUser } from '../services/thunks/fetchRegisterUser';
import { fetchLoginUser } from '../services/thunks/fetchLoginUser';
import { userLogout } from '../services/thunks/userLogout';
import { getUser } from '../services/thunks/getUserApi';

import { updateUser } from '../services/thunks/updateUser';

describe('userSlice', () => {
  const initialState = {
    userCheck: false,
    user: null,
    error: undefined,
    isLoading: false
  };

  test('setUserCheck', () => {
    const state = userReducer(initialState, setUserCheck(true));
    expect(state.userCheck).toBe(true);
  });

  test('fetchRegisterUser.pending', () => {
    const state = userReducer(initialState, {
      type: fetchRegisterUser.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  test('fetchRegisterUser.fulfilled', () => {
    const state = userReducer(initialState, {
      type: fetchRegisterUser.fulfilled.type
    });
    expect(state.isLoading).toBe(false);
  });

  test('fetchRegisterUser.rejected', () => {
    const state = userReducer(initialState, {
      type: fetchRegisterUser.rejected.type
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Данный пользователь уже существует');
  });

  test('fetchLoginUser.pending', () => {
    const state = userReducer(initialState, {
      type: fetchLoginUser.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  test('fetchLoginUser.fulfilled', () => {
    const payload = { user: { email: 'jo1jo@mail.ru', name: 'vitaliya kujo' } };
    const state = userReducer(initialState, {
      type: fetchLoginUser.fulfilled.type,
      payload
    });
    expect(state.user).toEqual(payload.user);
    expect(state.isLoading).toBe(false);
  });

  test('fetchLoginUser.rejected', () => {
    const state = userReducer(initialState, {
      type: fetchLoginUser.rejected.type
    });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Неверный email или пароль');
  });

  test('userLogout.pending', () => {
    const state = userReducer(initialState, {
      type: userLogout.pending.type
    });
    expect(state.isLoading).toBe(true);
  });

  test('userLogout.fulfilled', () => {
    const prevState = {
      ...initialState,
      email: 'jo1jo@mail.ru',
      name: 'vitaliya kujo'
    };
    const state = userReducer(prevState, { type: userLogout.fulfilled.type });
    expect(state.user).toBeNull();
    expect(state.isLoading).toBe(false);
  });

  test('userLogout.rejected', () => {
    const state = userReducer(initialState, {
      type: userLogout.fulfilled.type
    });
    expect(state.isLoading).toBe(false);
  });

  test('updateUser.pending', () => {
    const state = userReducer(initialState, { type: updateUser.pending.type });
    expect(state.isLoading).toBe(true);
  });

  test('updateUser.fulfilled', () => {
    const payload = {
      user: { email: 'jo1jo@mail.ru', name: 'Vitaliya Joestar' }
    };
    const state = userReducer(initialState, {
      type: updateUser.fulfilled.type,
      payload
    });
    expect(state.isLoading).toBe(false);
    expect(state.user).toBe(payload.user);
  });

  test('updateUser.rejected', () => {
    const state = userReducer(initialState, { type: updateUser.rejected.type });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ой, произошла ошибка!');
  });

  test('getUser.pending', () => {
    const state = userReducer(initialState, { type: getUser.pending.type });
    expect(state.isLoading).toBe(true);
  });

  test('getUser.fulfilled', () => {
    const payload = {
      user: { email: 'jo1jo@mail.ru', name: 'Vitaliya Joestar' }
    };
    const state = userReducer(initialState, {
      type: getUser.fulfilled.type,
      payload
    });
    expect(state.isLoading).toBe(false);
    expect(state.user).toBe(payload.user);
  });

  test('getUser.rejected', () => {
    const state = userReducer(initialState, { type: getUser.rejected.type });
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка при получение данных пользователя');
  });
});
