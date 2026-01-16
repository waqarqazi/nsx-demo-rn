/**
 * Auth slice for Redux
 * Manages authentication state
 */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  userId: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: null,
  userId: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{ token: string; userId: string }>) => {
      state.token = action.payload.token;
      state.userId = action.payload.userId;
      state.isAuthenticated = true;
    },
    clearCredentials: state => {
      state.token = null;
      state.userId = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;
