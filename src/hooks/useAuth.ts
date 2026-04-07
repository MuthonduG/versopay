/**
 * Auth hooks: TanStack Query mutations for auth flows.
 * On success we dispatch setTokens to Redux when the backend returns JWT (login, verify-email).
 */
import { useMutation } from '@tanstack/react-query';
import * as authApi from '../api/modules/auth';
import { setTokens, logout } from '../store/authSlice';
import { useAppDispatch } from '../store';
import type {
  LoginRequest,
  RegisterRequest,
  EmailVerificationRequest,
  PasswordResetRequest,
  PasswordResetVerifyRequest,
} from '../api/types';

export const AUTH_QUERY_KEYS = {
  login: ['auth', 'login'] as const,
  register: ['auth', 'register'] as const,
  verifyEmail: ['auth', 'verifyEmail'] as const,
  resendOtp: ['auth', 'resendOtp'] as const,
  forgotPassword: ['auth', 'forgotPassword'] as const,
  resetPassword: ['auth', 'resetPassword'] as const,
};

export function useLogin() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (result) => {
      if (!result.success || !result.data?.token) return;
      const d = result.data;
      dispatch(
        setTokens({
          token: d.token,
          refreshToken: d.refreshToken,
          user: d.user,
        })
      );
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: (payload: RegisterRequest) => authApi.register(payload),
  });
}

export function useVerifyEmail() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: EmailVerificationRequest) =>
      authApi.verifyEmail(payload),
    onSuccess: (result) => {
      if (!result.success || !result.data?.token) return;
      const d = result.data;
      dispatch(
        setTokens({
          token: d.token,
          refreshToken: d.refreshToken,
          user: d.user,
        })
      );
    },
  });
}

export function useResendOtp() {
  return useMutation({
    mutationFn: ({ email, purpose }: { email: string; purpose: string }) =>
      authApi.resendOtp(email, purpose),
  });
}

export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: PasswordResetRequest) =>
      authApi.forgotPassword(payload),
  });
}

export function useResetPassword() {
  return useMutation({
    mutationFn: (payload: PasswordResetVerifyRequest) =>
      authApi.resetPassword(payload),
  });
}

export function useLogout() {
  const dispatch = useAppDispatch();
  return async () => {
    try {
      await authApi.logoutApi();
    } finally {
      dispatch(logout());
    }
  };
}
