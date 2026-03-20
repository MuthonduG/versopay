// Axios for HTTP requests; AxiosError type for typed error handling
import axios, { type AxiosError } from 'axios';
// Token helpers: getToken for requests, clearToken on 401
import { getToken, clearToken } from './tokenStorage';
// Converts raw errors into normalized ApiError shape
import { parseApiError } from '../errors/errorHandler';

// Backend base URL from env; fallback for local dev
const BASE_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
// Request timeout in milliseconds (30 seconds)
const TIMEOUT = 30_000;

// Create axios instance with shared config for all authenticated requests
export const directClient = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor: attach Authorization header
directClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: store token, handle 401, normalize errors
directClient.interceptors.response.use(
  (response) => {
    // Some endpoints return token in body; persist it for future requests
    const data = response.data;
    const token = data?.token;
    if (token && typeof token === 'string') {
      import('./tokenStorage').then(({ setToken }) => setToken(token));
    }
    return response;
  },
  (error: AxiosError) => {
    // 401: clear token and redirect to login
    if (error.response?.status === 401) {
      clearToken();
      window.location.href = '/oauth/login';
    }
    // Reject with normalized ApiError so callers get consistent shape
    return Promise.reject(parseApiError(error));
  }
);

export default directClient;
