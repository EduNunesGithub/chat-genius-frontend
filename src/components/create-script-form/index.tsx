"use client";

import React from "react";
import { Controller } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { useCreateScript } from "@/hooks/use-create-script";
import { imperativeOptions, layoutOptions } from "@/services/scripts.service";

export const CreateScriptForm = () => {
  const id = React.useId();

  const { form, mutationCreateScript } = useCreateScript();

  return (
    <form
      className="auto-rows-min gap-4 grid grid-cols-1 w-full"
      onSubmit={form.handleSubmit((data) => mutationCreateScript.mutate(data))}
    >
      <div className="flex flex-wrap gap-4 items-center justify-start w-full">
        <Controller
          control={form.control}
          name="imperative"
          render={({ field: { onChange, ...other } }) => (
            <Field className="gap-2 max-w-48 w-full">
              <FieldLabel>Imperativo</FieldLabel>
              <Select {...other} onValueChange={onChange}>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Escolher imperativo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {imperativeOptions.map((imperative) => (
                      <SelectItem
                        className="capitalize"
                        key={imperative}
                        value={imperative}
                      >
                        {imperative}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>A ação que o script executa.</FieldDescription>
              <FieldError errors={[form.formState.errors.imperative]} />
            </Field>
          )}
        />

        <Controller
          control={form.control}
          name="layout"
          render={({ field: { onChange, ...other } }) => (
            <Field className="gap-2 max-w-48 w-full">
              <FieldLabel>Layout</FieldLabel>
              <Select {...other} onValueChange={onChange}>
                <SelectTrigger className="capitalize">
                  <SelectValue placeholder="Escolher layout" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {layoutOptions.map((layout) => (
                      <SelectItem
                        className="capitalize"
                        key={layout}
                        value={layout}
                      >
                        {layout}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FieldDescription>
                O layout onde o script será aplicado.
              </FieldDescription>
              <FieldError errors={[form.formState.errors.layout]} />
            </Field>
          )}
        />
      </div>

      <Field className="flex-1 gap-2 w-full">
        <FieldLabel htmlFor={`title-${id}`}>Título</FieldLabel>
        <Input
          {...form.register("title")}
          className="capitalize"
          id={`title-${id}`}
          placeholder="Alterar cor..."
          type="text"
        />
        <FieldDescription>
          Um nome curto para identificar este script.
        </FieldDescription>
        <FieldError errors={[form.formState.errors.title]} />
      </Field>

      <Field className="flex-1 gap-2 w-full">
        <FieldLabel htmlFor={`src-${id}`}>URL</FieldLabel>
        <Input
          {...form.register("src")}
          className="lowercase"
          id={`src-${id}`}
          placeholder="https://example.com"
          type="url"
        />
        <FieldDescription>
          URL do código JavaScript que será executado.
        </FieldDescription>
        <FieldError errors={[form.formState.errors.src]} />
      </Field>

      <Field className="flex-1 gap-2 w-full">
        <FieldLabel htmlFor={`description-${id}`}>Descrição</FieldLabel>
        <Textarea
          {...form.register("description")}
          id={`description-${id}`}
          placeholder="Descreva o script..."
          rows={4}
        />
        <FieldDescription>
          Descreva o que o script faz e quando deve ser usado. A IA usará isso
          para gerar uma descrição semântica para busca.
        </FieldDescription>
        <FieldError errors={[form.formState.errors.description]} />
      </Field>

      <Button disabled={!mutationCreateScript.isIdle} type="submit">
        Enviar
      </Button>
    </form>
  );
};
