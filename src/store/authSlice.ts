/**
 * Auth slice: manages authentication state across the app.
 * Holds the current user, JWT token, and whether the user is logged in.
 * Used by protected routes, navbar, and auth hooks (useLogin, useRegister, etc.).
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthTokens } from '../api/types';
import { getToken, clearToken } from '../api/clients/tokenStorage';

// Shape of the auth slice state
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Hydrate from localStorage on load so refresh keeps user logged in
const initialState: AuthState = {
  user: null,
  token: getToken(),
  isAuthenticated: !!getToken(),
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Full auth update: token + optional user; use when you have both
    setAuth: (
      state,
      action: PayloadAction<{ token: string; user?: User | null }>
    ) => {
      state.token = action.payload.token;
      state.user = action.payload.user ?? state.user;
      state.isAuthenticated = true;
    },
    // Update only the user object; token unchanged (e.g. after profile fetch)
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    // Called by auth hooks when login/register/verify/reset succeed; AuthTokens has token + optional user fields
    setTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      if (action.payload.firstName && action.payload.lastName) {
        state.user = {
          ...state.user,
          id: 0,
          email: action.payload.email ?? '',
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          phoneNumber: '',
          isActive: true,
        } as User;
      }
    },
    // Clear auth: remove token from storage and reset state; redirect handled elsewhere
    logout: (state) => {
      clearToken();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, setUser, setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
