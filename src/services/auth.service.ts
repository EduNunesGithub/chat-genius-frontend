import * as z from "zod";

export type AdminUser = {
  banExpires: Date | null;
  banned: boolean | null;
  banReason: string | null;
  createdAt: Date;
  email: string;
  id: string;
  image: string | null;
  name: string;
  role: string;
  updatedAt: Date;
};

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;

export const roleOptions = ["admin", "user"] as const;

export const createUserSchema = z.object({
  email: z.email(),
  name: z.string().min(1, "Nome é obrigatório"),
  password: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
  role: z.enum(roleOptions),
});

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Senha deve ter ao menos 8 caracteres"),
  rememberMe: z.boolean(),
});
