// Proxy client for unauthenticated flows; no token required
import { proxyFetch } from '../clients/proxyClient';
// Request/response types for auth endpoints
import type {
  AuthTokens,
  LoginRequest,
  RegisterRequest,
  EmailVerificationRequest,
  PasswordResetRequest,
  PasswordResetVerifyRequest,
} from '../types';

// Base path for auth endpoints; full URL is /api/auth (proxy base + this)
const AUTH_BASE = '/auth';

// Authenticate with email/phone and password; returns token on success
export async function login(payload: LoginRequest) {
  const result = await proxyFetch<AuthTokens>(`${AUTH_BASE}/login`, {
    method: 'POST',
    body: payload,
  });
  return result;
}

// Create new user account; requires email verification before activation
export async function register(payload: RegisterRequest) {
  const result = await proxyFetch<AuthTokens>(`${AUTH_BASE}/register`, {
    method: 'POST',
    body: payload,
  });
  return result;
}

// Verify email with OTP sent after registration; activates account
export async function verifyEmail(payload: EmailVerificationRequest) {
  const result = await proxyFetch<AuthTokens>(`${AUTH_BASE}/verify-email`, {
    method: 'POST',
    body: payload,
  });
  return result;
}

// Resend OTP for email verification or password reset; purpose identifies which flow
export async function resendOtp(email: string, purpose: string) {
  const result = await proxyFetch<{ message?: string }>(
    `${AUTH_BASE}/resend-otp?email=${encodeURIComponent(email)}&purpose=${encodeURIComponent(purpose)}`,
    { method: 'POST' }
  );
  return result;
}

// Request password reset; sends OTP to email
export async function forgotPassword(payload: PasswordResetRequest) {
  const result = await proxyFetch<{ message?: string }>(
    `${AUTH_BASE}/forgot-password`,
    { method: 'POST', body: payload }
  );
  return result;
}

// Complete password reset with OTP and new password; returns token on success
export async function resetPassword(payload: PasswordResetVerifyRequest) {
  const result = await proxyFetch<AuthTokens>(
    `${AUTH_BASE}/reset-password`,
    { method: 'POST', body: payload }
  );
  return result;
}
