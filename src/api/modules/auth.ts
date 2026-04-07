// Proxy client for auth flows against versopaid_backend auth service
import { proxyFetch } from '../clients/proxyClient';
import { getRefreshToken } from '../clients/tokenStorage';
import type {
  AuthTokens,
  LoginRequest,
  RegisterRequest,
  EmailVerificationRequest,
  PasswordResetRequest,
  PasswordResetVerifyRequest,
  LoginResponsePayload,
  UserResponsePayload,
} from '../types';

const USERS_BASE = '/v1/users';

export async function login(payload: LoginRequest) {
  const result = await proxyFetch<LoginResponsePayload>(`${USERS_BASE}/login`, {
    method: 'POST',
    body: { ...payload, rememberMe: payload.rememberMe ?? false },
  });
  return result;
}

export async function register(payload: RegisterRequest) {
  const result = await proxyFetch<UserResponsePayload>(`${USERS_BASE}/register`, {
    method: 'POST',
    body: payload,
  });
  return result;
}

export async function verifyEmail(payload: EmailVerificationRequest) {
  const result = await proxyFetch<LoginResponsePayload>(`${USERS_BASE}/verify-email`, {
    method: 'POST',
    body: payload,
  });
  return result;
}

export async function resendOtp(email: string, purpose: string) {
  const result = await proxyFetch<{ message?: string }>(
    `${USERS_BASE}/resend-otp?email=${encodeURIComponent(email)}&purpose=${encodeURIComponent(purpose)}`,
    { method: 'POST' }
  );
  return result;
}

export async function forgotPassword(payload: PasswordResetRequest) {
  const result = await proxyFetch<{ message?: string }>(
    `${USERS_BASE}/password-reset-request`,
    { method: 'POST', body: payload }
  );
  return result;
}

export async function resetPassword(payload: PasswordResetVerifyRequest) {
  const result = await proxyFetch<{ email?: string }>(
    `${USERS_BASE}/password-reset-verify`,
    { method: 'POST', body: payload }
  );
  return result;
}

/** Revokes refresh token; requires Bearer access token per backend security config */
export async function logoutApi() {
  const refreshToken = getRefreshToken();
  if (!refreshToken) {
    return { success: true as const, data: undefined };
  }
  const result = await proxyFetch<unknown>(
    `${USERS_BASE}/logout?refreshToken=${encodeURIComponent(refreshToken)}`,
    { method: 'POST', auth: true }
  );
  return result;
}

export type { AuthTokens, LoginResponsePayload, UserResponsePayload };
