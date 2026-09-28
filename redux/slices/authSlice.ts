import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthUser {
  email: string;
}

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  errorMessage: string | null;
  user: AuthUser | null;
}

const initialState: AuthState = {
  token: null,
  isAuthenticated: false,
  errorMessage: null,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ token: string; user: AuthUser }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.errorMessage = null;

      if (typeof window !== 'undefined') {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },

    logOut: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.errorMessage = null;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },

    setAuthError: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },

    clearAuthError: (state) => {
      state.errorMessage = null;
    },

    restoreAuth: (
      state,
      action: PayloadAction<{ token: string; user: AuthUser }>,
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      state.errorMessage = null;
    },
  },
});

export const {
  setCredentials,
  logOut,
  setAuthError,
  clearAuthError,
  restoreAuth,
} = authSlice.actions;

export default authSlice.reducer;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthUser = (state: RootState) => state.auth.user;
export const selectAuthError = (state: RootState) => state.auth.errorMessage;
