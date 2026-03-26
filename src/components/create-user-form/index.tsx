"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateUser } from "@/hooks/use-create-user";
import { roleOptions } from "@/services/auth.service";
import { useId } from "react";
import { Controller } from "react-hook-form";

export function CreateUserForm() {
  const id = useId();
  const { form, mutationCreateUser } = useCreateUser();

  return (
    <form
      className="auto-rows-min gap-4 grid grid-cols-1 w-full"
      onSubmit={form.handleSubmit((data) => mutationCreateUser.mutate(data))}
    >
      <Field className="gap-2 w-full">
        <FieldLabel htmlFor={`name-${id}`}>Nome</FieldLabel>
        <Input
          {...form.register("name")}
          id={`name-${id}`}
          placeholder="Ex: João Silva"
          type="text"
        />
        <FieldError errors={[form.formState.errors.name]} />
      </Field>

      <Field className="gap-2 w-full">
        <FieldLabel htmlFor={`email-${id}`}>E-mail</FieldLabel>
        <Input
          {...form.register("email")}
          id={`email-${id}`}
          placeholder="usuario@exemplo.com"
          type="email"
        />
        <FieldError errors={[form.formState.errors.email]} />
      </Field>

      <Field className="gap-2 w-full">
        <FieldLabel htmlFor={`password-${id}`}>Senha</FieldLabel>
        <Input
          {...form.register("password")}
          id={`password-${id}`}
          placeholder="Mínimo 8 caracteres"
          type="password"
        />
        <FieldError errors={[form.formState.errors.password]} />
      </Field>

      <Controller
        control={form.control}
        name="role"
        render={({ field: { onChange, ...other } }) => (
          <Field className="gap-2 w-full">
            <FieldLabel>Função</FieldLabel>
            <Select {...other} onValueChange={onChange}>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Escolher função" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {roleOptions.map((role) => (
                    <SelectItem className="capitalize" key={role} value={role}>
                      {role}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldDescription>
              Admin tem acesso total. Usuário tem acesso de leitura e chat.
            </FieldDescription>
            <FieldError errors={[form.formState.errors.role]} />
          </Field>
        )}
      />

      <Button disabled={!mutationCreateUser.isIdle} type="submit">
        Criar usuário
      </Button>
    </form>
  );
}
