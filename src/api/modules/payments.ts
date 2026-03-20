// Direct client for authenticated payment requests
import { directClient } from '../clients/directClient';
// Payment and request types
import type { Payment, CreatePaymentLinkRequest } from '../types';

// Base path for payments API
const PAYMENTS_BASE = '/api/payments';

// Fetch all payments for the current context; returns empty array if none
export async function getPayments(): Promise<Payment[]> {
  const { data } = await directClient.get<Payment[]>(PAYMENTS_BASE);
  return data ?? [];
}

// Create a payment link (e.g. M-Pesa); returns URL and expiry
export async function createPaymentLink(
  payload: CreatePaymentLinkRequest
): Promise<{ link: string; expiresAt: string }> {
  const { data } = await directClient.post<{ link: string; expiresAt: string }>(
    `${PAYMENTS_BASE}/links`,
    payload
  );
  return data!;
}
