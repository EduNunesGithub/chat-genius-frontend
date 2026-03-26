"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { loginSchema, type LoginSchema } from "@/services/auth.service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function LoginForm() {
  const router = useRouter();
  const { formState, handleSubmit, register } = useForm<LoginSchema>({
    defaultValues: { email: "", password: "", rememberMe: false },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async ({ email, password, rememberMe }: LoginSchema) => {
    const { error } = await authClient.signIn.email({
      email,
      password,
      rememberMe,
    });

    if (error) {
      toast.error(error.message ?? "Credenciais inválidas.");
      return;
    }

    router.push("/chat");
    router.refresh();
  };

  return (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Field className="gap-2">
        <FieldLabel htmlFor="email">E-mail</FieldLabel>
        <Input
          {...register("email")}
          autoComplete="email"
          id="email"
          placeholder="admin@internal.chatgenius"
          type="email"
        />
        <FieldError errors={[formState.errors.email]} />
      </Field>

      <Field className="gap-2">
        <FieldLabel htmlFor="password">Senha</FieldLabel>
        <Input
          {...register("password")}
          autoComplete="current-password"
          id="password"
          placeholder="••••••••"
          type="password"
        />
        <FieldError errors={[formState.errors.password]} />
      </Field>

      <label className="flex gap-2 items-center">
        <input
          {...register("rememberMe")}
          className="accent-primary"
          type="checkbox"
        />
        <span className="text-sm">Lembrar de mim</span>
      </label>

      <Button className="mt-2" disabled={formState.isSubmitting} type="submit">
        {formState.isSubmitting ? "Entrando..." : "Entrar"}
      </Button>
    </form>
  );
}
