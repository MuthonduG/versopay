import { directClient } from '../clients/directClient';
import { proxyFetch } from '../clients/proxyClient';
import type {
  CheckWaitlistStatusResponse,
  WaitlistJoinRequest,
  WaitlistListResponse,
  WaitlistRegisterResponse,
} from '../types';

const WAITLIST_BASE = 'api/waitlist';

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

/** Dashboard: full waitlist from CMS (requires same-origin or CORS + auth as configured). */
export async function fetchWaitlistAll() {
  const { data } = await directClient.get<WaitlistListResponse>('/api/waitlist/all/');
  return data;
}

