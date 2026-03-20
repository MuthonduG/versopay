// Direct client for authenticated notification requests
import { directClient } from '../clients/directClient';
// Notification type
import type { Notification } from '../types';

// Base path for notifications API
const NOTIFICATIONS_BASE = '/api/notifications';

// Fetch all notifications for the current user; returns empty array if none
export async function getNotifications(): Promise<Notification[]> {
  const { data } = await directClient.get<Notification[]>(NOTIFICATIONS_BASE);
  return data ?? [];
}

// Mark a single notification as read; returns updated notification
export async function markAsRead(id: string): Promise<Notification> {
  const { data } = await directClient.patch<Notification>(
    `${NOTIFICATIONS_BASE}/${id}/read`
  );
  return data!;
}

// Mark all notifications as read; no response body
export async function markAllAsRead(): Promise<void> {
  await directClient.post(`${NOTIFICATIONS_BASE}/read-all`);
}
