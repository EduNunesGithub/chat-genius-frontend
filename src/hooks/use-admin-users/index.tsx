"use client";

import { authClient } from "@/lib/auth-client";
import { type AdminUser } from "@/services/auth.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useAdminUsers() {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryFn: async () => {
      const { data, error } = await authClient.admin.listUsers({
        query: { limit: 100, offset: 0 },
      });
      if (error) throw new Error(error.message);
      return data as { total: number; users: AdminUser[] };
    },
    queryKey: ["admin-users"],
  });

  const mutationBanUser = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await authClient.admin.banUser({ userId });
      if (error) throw new Error(error.message);
    },
    onError: ({ message }) => toast.error(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Usuário banido.");
    },
  });

  const mutationRevokeSessions = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await authClient.admin.revokeUserSessions({ userId });
      if (error) throw new Error(error.message);
    },
    onError: ({ message }) => toast.error(message),
    onSuccess: () => toast.success("Sessões revogadas."),
  });

  const mutationSetRole = useMutation({
    mutationFn: async ({
      role,
      userId,
    }: {
      role: "admin" | "user";
      userId: string;
    }) => {
      const { error } = await authClient.admin.setRole({ role, userId });
      if (error) throw new Error(error.message);
    },
    onError: ({ message }) => toast.error(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Função atualizada.");
    },
  });

  const mutationUnbanUser = useMutation({
    mutationFn: async (userId: string) => {
      const { error } = await authClient.admin.unbanUser({ userId });
      if (error) throw new Error(error.message);
    },
    onError: ({ message }) => toast.error(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Usuário desbanido.");
    },
  });

  return {
    mutationBanUser,
    mutationRevokeSessions,
    mutationSetRole,
    mutationUnbanUser,
    query,
  };
}
