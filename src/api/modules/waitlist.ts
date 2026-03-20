import { proxyFetch } from '../clients/proxyClient';
import type {
  CheckWaitlistStatusResponse,
  WaitlistJoinRequest,
  WaitlistRegisterResponse,
} from '../types';

const WAITLIST_BASE = '/api/waitlist';

export async function joinWaitlist(payload: WaitlistJoinRequest) {
  return proxyFetch<WaitlistRegisterResponse>(`${WAITLIST_BASE}/register/`, {
    method: 'POST',
    body: payload,
  });
}

export async function checkWaitlistStatus(email: string) {
  return proxyFetch<CheckWaitlistStatusResponse>(
    `${WAITLIST_BASE}/check/${encodeURIComponent(email)}/`,
    { method: 'GET' }
  );
}

