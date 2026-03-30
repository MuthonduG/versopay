/**
 * Roles hooks: TanStack Query for roles CRUD.
 * useQuery for fetching (list, single); useMutation for create/update/delete.
 * Mutations invalidate queries so the UI refetches and stays in sync.
 */
import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import * as rolesApi from '../api/modules/roles';
import type { CreateRoleRequest, UpdateRoleRequest } from '../api/types';

// Query keys for roles; list() and detail(id) build cache keys for invalidation
export const ROLES_QUERY_KEYS = {
  all: ['roles'] as const,
  list: () => [...ROLES_QUERY_KEYS.all] as const,
  detail: (id: string) => [...ROLES_QUERY_KEYS.all, id] as const,
};

// Fetch all roles; returns { data, isLoading, error, refetch }
export function useRoles() {
  return useQuery({
    queryKey: ROLES_QUERY_KEYS.list(),
    queryFn: () => rolesApi.getRoles(),
  });
}

// Fetch single role by id; disabled when id is null to avoid unnecessary requests
export function useRole(id: string | null) {
  return useQuery({
    queryKey: ROLES_QUERY_KEYS.detail(id ?? ''),
    queryFn: () => rolesApi.getRoleById(id!),
    enabled: !!id,
  });
}

// Create role mutation; invalidates roles list so useRoles refetches
export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateRoleRequest) => rolesApi.createRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEYS.all });
    },
  });
}

// Update role mutation; invalidates list and the specific role detail
export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateRoleRequest) => rolesApi.updateRole(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEYS.all });
      queryClient.invalidateQueries({
        queryKey: ROLES_QUERY_KEYS.detail(variables.id),
      });
    },
  });
}

// Delete role mutation; invalidates list
export function useDeleteRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => rolesApi.deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ROLES_QUERY_KEYS.all });
    },
  });
}
