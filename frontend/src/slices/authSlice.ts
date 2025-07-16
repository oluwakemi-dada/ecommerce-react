import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AuthState } from '../types/auth';
import type { User } from '../types';

const userInfo = localStorage.getItem('userInfo');

const initialState: AuthState = {
  userInfo: userInfo ? JSON.parse(userInfo) : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state: AuthState, action: PayloadAction<User>) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state: AuthState) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
