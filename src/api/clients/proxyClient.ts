// Import shared API response and error types
import type { ApiResponse, ApiError } from '../types';
// Import helpers to map HTTP status codes to messages and normalize errors
import { mapStatusToMessage, normalizeError } from '../errors/errorHandler';
// Import token storage helper to persist JWT on successful auth responses
import { setToken, setRefreshToken, getToken } from './tokenStorage';

// Base path for proxy requests; falls back to /api if env var is missing
const PROXY_BASE = import.meta.env.VITE_API_GATEWAY ?? '/api';

function joinUrl(base: string, path: string): string {
  const normalizedBase = base.replace(/\/+$/, '');
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

// Options passed to proxyFetch for configuring the request
export interface ProxyClientOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  headers?: Record<string, string>;
  /** When true, sends Authorization: Bearer <access token> (for logout, etc.) */
  auth?: boolean;
}

type BackendEnvelope<T> = {
  success?: boolean;
  message?: string;
  data?: T;
  errorCode?: string;
};

/**
 * Unwraps VersoPaid auth API responses (ApiResponseDTO: success, message, data).
 * Persists access + refresh tokens when present on the inner payload.
 */
export async function proxyFetch<T = unknown>(
  path: string,
  options: ProxyClientOptions = {}
): Promise<ApiResponse<T>> {
  const { method = 'GET', body, headers = {}, auth = false } = options;

  const url = joinUrl(PROXY_BASE, path);

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };
  if (auth) {
    const token = getToken();
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }
  }

  const config: RequestInit = {
    method,
    credentials: 'include',
    headers: requestHeaders,
  };

  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, config);
    const json = (await response.json().catch(() => ({}))) as BackendEnvelope<T> & Record<string, unknown>;

    if (!response.ok) {
      const error: ApiError = {
        message: (typeof json?.message === 'string' && json.message) || mapStatusToMessage(response.status),
        status: response.status,
        data: json,
      };
      return { success: false, error };
    }

    const inner = json?.data !== undefined ? json.data : json;
    const payload = inner as Record<string, unknown>;

    const token = typeof payload?.token === 'string' ? payload.token : undefined;
    if (token) {
      setToken(token);
    }
    const refreshToken = typeof payload?.refreshToken === 'string' ? payload.refreshToken : undefined;
    if (refreshToken) {
      setRefreshToken(refreshToken);
    }

    const success = json?.success !== false;
    return {
      success,
      data: inner as T,
    };
  } catch (err) {
    const error = normalizeError(
      err instanceof Error ? err.message : 'Network request failed'
    );
    return { success: false, error };
  }
}
