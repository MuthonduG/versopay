/**
 * Notifications hooks: TanStack Query for notifications.
 * useNotifications fetches list; useMarkAsRead and useMarkAllAsRead update read state.
 * Mutations invalidate notifications query so unread count and list refresh.
 */
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import * as notificationsApi from '../api/modules/notifications';

// Query keys for notifications cache
export const NOTIFICATIONS_QUERY_KEYS = {
  all: ['notifications'] as const,
  list: () => [...NOTIFICATIONS_QUERY_KEYS.all] as const,
};

// Fetch all notifications; returns { data, isLoading, error, refetch }
export function useNotifications() {
  return useQuery({
    queryKey: NOTIFICATIONS_QUERY_KEYS.list(),
    queryFn: () => notificationsApi.getNotifications(),
  });
}

// Mark single notification as read; invalidates list so UI updates
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationsApi.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEYS.all });
    },
  });
}

// Mark all notifications as read; invalidates list
export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationsApi.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: NOTIFICATIONS_QUERY_KEYS.all });
    },
  });
}
