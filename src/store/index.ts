/**
 * Redux store configuration and typed hooks.
 * Combines all slices into a single store; components use useAppDispatch and useAppSelector.
 */
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import uiReducer from './uiSlice';
import organisationReducer from './organisationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    organisation: organisationReducer,
  },
  // Relax serializable check for auth: AuthTokens and User may have non-serializable values
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/setAuth', 'auth/setTokens'],
        ignoredPaths: ['auth.user'],
      },
    }),
});

// Infer RootState from store for useAppSelector; AppDispatch for useAppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed hooks: use these instead of plain useDispatch/useSelector for correct TypeScript inference
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
