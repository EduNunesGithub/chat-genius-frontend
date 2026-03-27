"use client";

import {
  createUserSchema,
  type CreateUserSchema,
} from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export function useCreateUser() {
  const form = useForm<CreateUserSchema>({
    defaultValues: { email: "", name: "", password: "", role: "user" },
    resolver: zodResolver(createUserSchema),
  });

  const queryClient = useQueryClient();
  const router = useRouter();

  const mutationCreateUser = useMutation({
    mutationFn: async (_params: CreateUserSchema) => {},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
      form.reset();
      router.push("/admin/users");
    },
  });

  return { form, mutationCreateUser };
}
