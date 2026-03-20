// Import shared API response and error types
import type { ApiResponse, ApiError } from '../types';
// Import helpers to map HTTP status codes to messages and normalize errors
import { mapStatusToMessage, normalizeError } from '../errors/errorHandler';
// Import token storage helper to persist JWT on successful auth
import { setToken } from './tokenStorage';

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
}

/**
 * Fetch-based client for unauthenticated flows (login, signup, onboarding).
 * Calls /api (proxied by Vite to backend).
 * Uses credentials: "include" for cookie support.
 * Returns { success, data?, error? } instead of throwing.
 */
export async function proxyFetch<T = unknown>(
  path: string,
  options: ProxyClientOptions = {}
): Promise<ApiResponse<T>> {
  // Destructure options with defaults: GET method, no body, empty headers
  const { method = 'GET', body, headers = {} } = options;

  // Build full URL: ensure path has leading slash if missing
  const url = joinUrl(PROXY_BASE, path);

  // Build fetch config: method, credentials for cookies, JSON content-type
  const config: RequestInit = {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  // Add body only for non-GET requests
  if (body && method !== 'GET') {
    config.body = JSON.stringify(body);
  }

  try {
    // Send the request to the proxy (Vite forwards /api to backend)
    const response = await fetch(url, config);
    // Parse JSON; return empty object if response body is invalid JSON
    const json = await response.json().catch(() => ({}));

    // If response status is not 2xx, build error and return
    if (!response.ok) {
      const error: ApiError = {
        message: json?.message ?? mapStatusToMessage(response.status),
        status: response.status,
        data: json,
      };
      return { success: false, error };
    }

    // Store token if present (login, register, verify, reset)
    const token = json?.token;
    if (token && typeof token === 'string') {
      setToken(token);
    }

    // Return success with parsed data; default success to true if omitted
    return {
      success: json?.success ?? true,
      data: json as T,
    };
  } catch (err) {
    // Network or parse error: normalize into ApiError and return
    const error = normalizeError(
      err instanceof Error ? err.message : 'Network request failed'
    );
    return { success: false, error };
  }
}
