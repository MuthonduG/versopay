/**
 * Auth hooks: TanStack Query mutations for auth flows.
 * Auth is mutation-only (no queries); on success we dispatch setTokens to Redux.
 * Components use mutate/mutateAsync and handle isLoading, error, data.
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

// Query keys for auth; used if we add auth-related queries later
export const AUTH_QUERY_KEYS = {
  login: ['auth', 'login'] as const,
  register: ['auth', 'register'] as const,
  verifyEmail: ['auth', 'verifyEmail'] as const,
  resendOtp: ['auth', 'resendOtp'] as const,
  forgotPassword: ['auth', 'forgotPassword'] as const,
  resetPassword: ['auth', 'resetPassword'] as const,
};

// Login mutation; on success dispatches setTokens so Redux and tokenStorage are updated
export function useLogin() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: LoginRequest) => authApi.login(payload),
    onSuccess: (result: Awaited<ReturnType<typeof authApi.login>>) => {
      if (result.success && result.data?.token) {
        dispatch(setTokens(result.data));
      }
    },
  });
}

// Register mutation; token stored by proxyClient, Redux updated here
export function useRegister() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: RegisterRequest) => authApi.register(payload),
    onSuccess: (result: Awaited<ReturnType<typeof authApi.register>>) => {
      if (result.success && result.data?.token) {
        dispatch(setTokens(result.data!));
      }
    },
  });
}

// Verify email with OTP; activates account and returns token
export function useVerifyEmail() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: EmailVerificationRequest) =>
      authApi.verifyEmail(payload),
    onSuccess: (result) => {
      if (result.success && result.data?.token) {
        dispatch(setTokens(result.data!));
      }
    },
  });
}

// Resend OTP; no token, no Redux update; just triggers email send
export function useResendOtp() {
  return useMutation({
    mutationFn: ({ email, purpose }: { email: string; purpose: string }) =>
      authApi.resendOtp(email, purpose),
  });
}

// Request password reset; sends OTP to email
export function useForgotPassword() {
  return useMutation({
    mutationFn: (payload: PasswordResetRequest) =>
      authApi.forgotPassword(payload),
  });
}

// Complete password reset with OTP; returns token, dispatch setTokens
export function useResetPassword() {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: (payload: PasswordResetVerifyRequest) =>
      authApi.resetPassword(payload),
    onSuccess: (result: Awaited<ReturnType<typeof authApi.resetPassword>>) => {
      if (result.success && result.data?.token) {
        dispatch(setTokens(result.data!));
      }
    },
  });
}

// Logout: returns a function that dispatches logout; call it on button click
export function useLogout() {
  const dispatch = useAppDispatch();
  return () => dispatch(logout());
}
