"use client";

import { authClient } from "@/lib/auth-client";
import {
  createUserSchema,
  type CreateUserSchema,
} from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function useCreateUser() {
  const form = useForm<CreateUserSchema>({
    defaultValues: { email: "", name: "", password: "", role: "user" },
    resolver: zodResolver(createUserSchema),
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const mutationCreateUser = useMutation({
    mutationFn: async (params: CreateUserSchema) => {
      const { error } = await authClient.admin.createUser(params);
      if (error) throw new Error(error.message);
    },
    onError: ({ message }) => toast.error(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      toast.success("Usuário criado com sucesso.");
      form.reset();
      router.push("/admin/users");
    },
  });

  return { form, mutationCreateUser };
}
