// Shared API types for VersoPaid

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
  data?: unknown;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
}

export interface AuthTokens {
  token: string;
  message?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  success?: boolean;
}

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailVerifiedAt?: string;
  phoneVerifiedAt?: string;
  isActive: boolean;
}

// Auth request payloads
export interface LoginRequest {
  loginData: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
}

export interface EmailVerificationRequest {
  email: string;
  otpCode: string;
}

export interface PasswordResetRequest {
  email: string;
}

export interface PasswordResetVerifyRequest {
  email: string;
  otpCode: string;
  newPassword: string;
  confirmPassword: string;
}

// Role types (aligned with backend)
export interface Role {
  id: string;
  name: string;
  description: string;
  permissions?: string;
  isSystemRole: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissions?: string;
}

export interface UpdateRoleRequest extends Partial<CreateRoleRequest> {
  id: string;
}

// Payment types (placeholder for future Payment Service)
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  reference?: string;
  createdAt: string;
}

export interface CreatePaymentLinkRequest {
  amount: number;
  currency?: string;
  reference?: string;
}

// Notification types (placeholder for future Notification Service)
export interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

// Waitlist types (public onboarding flow)
export type BusinessType = 'ISP' | 'GYM' | 'SACCO' | 'CHAMA' | 'OTHER';

export interface WaitlistJoinRequest {
  email: string;
  phone_number: string;
  business_name: string;
  business_type: BusinessType;
  other_business_description?: string;
}

export interface WaitlistEntry {
  id: string | number;
  email: string;
  phone_number: string;
  business_name: string;
  business_type: BusinessType;
  other_business_description?: string | null;
  business_type_label: string;
  created_at: string;
  updated_at: string;
}

export interface WaitlistRegisterResponse {
  message: string;
  data: WaitlistEntry;
}

export interface CheckWaitlistStatusResponse {
  email: string;
  registered: boolean;
  message: string;
}

export interface WaitlistListResponse {
  count: number;
  results: WaitlistEntry[];
}

export type WaitlistFieldErrors = Partial<
  Record<
    'email' | 'phone_number' | 'business_name' | 'business_type' | 'other_business_description',
    string
  >
>;
