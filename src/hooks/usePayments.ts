/**
 * Payments hooks: TanStack Query for payments and payment links.
 * usePayments fetches list; useCreatePaymentLink creates a link (e.g. M-Pesa).
 * Mutations invalidate payments query so list refetches.
 */
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import * as paymentsApi from '../api/modules/payments';
import type { CreatePaymentLinkRequest } from '../api/types';

// Query keys for payments cache
export const PAYMENTS_QUERY_KEYS = {
  all: ['payments'] as const,
  list: () => [...PAYMENTS_QUERY_KEYS.all] as const,
};

// Fetch all payments; returns { data, isLoading, error, refetch }
export function usePayments() {
  return useQuery({
    queryKey: PAYMENTS_QUERY_KEYS.list(),
    queryFn: () => paymentsApi.getPayments(),
  });
}

// Create payment link mutation; invalidates payments so list refreshes
export function useCreatePaymentLink() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePaymentLinkRequest) =>
      paymentsApi.createPaymentLink(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PAYMENTS_QUERY_KEYS.all });
    },
  });
}
