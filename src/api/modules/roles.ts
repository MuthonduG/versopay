// Direct client for authenticated requests; token attached automatically
import { directClient } from '../clients/directClient';
// Role and request payload types
import type { Role, CreateRoleRequest, UpdateRoleRequest } from '../types';

// Base path for roles API
const ROLES_BASE = '/api/roles';

// Fetch all roles for the current org; returns empty array if none
export async function getRoles(): Promise<Role[]> {
  const { data } = await directClient.get<Role[]>(ROLES_BASE);
  return data ?? [];
}

// Fetch a single role by ID; throws if not found
export async function getRoleById(id: string): Promise<Role> {
  const { data } = await directClient.get<Role>(`${ROLES_BASE}/${id}`);
  return data!;
}

// Create a new role; returns the created role
export async function createRole(payload: CreateRoleRequest): Promise<Role> {
  const { data } = await directClient.post<Role>(ROLES_BASE, payload);
  return data!;
}

// Update an existing role; id in payload, rest in body
export async function updateRole(payload: UpdateRoleRequest): Promise<Role> {
  const { id, ...body } = payload;
  const { data } = await directClient.put<Role>(`${ROLES_BASE}/${id}`, body);
  return data!;
}

// Delete a role by ID; no response body
export async function deleteRole(id: string): Promise<void> {
  await directClient.delete(`${ROLES_BASE}/${id}`);
}
