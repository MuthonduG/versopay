// localStorage key used to persist the JWT; shared by proxy and direct clients
const TOKEN_KEY = 'versopaid_token';

// Returns the stored JWT or null if not present; used by directClient for Authorization header
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

// Persists the JWT after successful login, register, verify, or reset; called by proxyClient
export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

// Removes the JWT on logout or 401; ensures user must re-authenticate
export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}
