/**
 * Auth slice: manages authentication state across the app.
 * Holds the current user, JWT token, and whether the user is logged in.
 * Used by protected routes, navbar, and auth hooks (useLogin, useRegister, etc.).
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User, AuthTokens, LoginUserInfo } from '../api/types';
import { getToken, clearToken } from '../api/clients/tokenStorage';

const USER_KEY = 'versopaid_user';

function readPersistedUser(): User | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as User) : null;
  } catch {
    return null;
  }
}

function mapLoginUserToUser(u: LoginUserInfo): User {
  return {
    id: u.id,
    email: u.email,
    firstName: u.firstName,
    lastName: u.lastName,
    phoneNumber: u.phoneNumber ?? '',
    isActive: true,
  };
}

// Shape of the auth slice state
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// Hydrate from localStorage on load so refresh keeps user logged in
const token = getToken();
const initialState: AuthState = {
  user: token ? readPersistedUser() : null,
  token,
  isAuthenticated: !!token,
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
    // Called by auth hooks when login/verify succeed; includes nested user from backend
    setTokens: (state, action: PayloadAction<AuthTokens>) => {
      const p = action.payload;
      state.token = p.token;
      state.isAuthenticated = true;
      if (p.user) {
        state.user = mapLoginUserToUser(p.user);
        localStorage.setItem(USER_KEY, JSON.stringify(state.user));
      } else if (p.firstName && p.lastName) {
        state.user = {
          ...state.user,
          id: 0,
          email: p.email ?? '',
          firstName: p.firstName,
          lastName: p.lastName,
          phoneNumber: '',
          isActive: true,
        } as User;
        localStorage.setItem(USER_KEY, JSON.stringify(state.user));
      }
    },
    // Clear auth: remove token from storage and reset state; redirect handled elsewhere
    logout: (state) => {
      clearToken();
      localStorage.removeItem(USER_KEY);
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAuth, setUser, setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
