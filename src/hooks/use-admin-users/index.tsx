"use client";

import { type AdminUser } from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useAdminUsers() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryFn: async (): Promise<{ total: number; users: AdminUser[] }> => ({
      total: 0,
      users: [],
    }),
    queryKey: ["admin-users"],
  });

  const mutationBanUser = useMutation({
    mutationFn: async (_userId: string) => {},
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  const mutationRevokeSessions = useMutation({
    mutationFn: async (_userId: string) => {},
  });

  const mutationSetRole = useMutation({
    mutationFn: async (_: { role: "admin" | "user"; userId: string }) => {},
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  const mutationUnbanUser = useMutation({
    mutationFn: async (_userId: string) => {},
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-users"] }),
  });

  return {
    mutationBanUser,
    mutationRevokeSessions,
    mutationSetRole,
    mutationUnbanUser,
    query,
  };
}
