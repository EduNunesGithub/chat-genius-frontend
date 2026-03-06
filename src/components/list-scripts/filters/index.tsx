import React from "react";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GetScriptsSearchParamsSchema,
  imperatives,
  layouts,
} from "@/services/scripts.service";

export type FiltersProps = {
  parsed: GetScriptsSearchParamsSchema;
  updateParams: (next: Partial<GetScriptsSearchParamsSchema>) => void;
};

export const Filters: React.FC<FiltersProps> = ({ parsed, updateParams }) => {
  const id = React.useId();
  const titleTimeout = React.useRef<ReturnType<typeof setTimeout>>(null);

  return (
    <form className="flex flex-wrap gap-2 items-center justify-start w-full">
      <Field className="gap-1 max-w-48 w-full">
        <FieldLabel>Ação</FieldLabel>
        <Select
          defaultValue={parsed.imperative}
          onValueChange={(value) =>
            updateParams({
              imperative: value as (typeof imperatives)[number],
              page: 1,
            })
          }
        >
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Escolher ação" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {imperatives.filter(Boolean).map((imperative) => (
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
      </Field>

      <Field className="gap-1 max-w-48 w-full">
        <FieldLabel>Layout</FieldLabel>
        <Select
          defaultValue={parsed.layout}
          onValueChange={(value) =>
            updateParams({
              layout: value as (typeof layouts)[number],
              page: 1,
            })
          }
        >
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Escolher o layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {layouts.filter(Boolean).map((layout) => (
                <SelectItem className="capitalize" key={layout} value={layout}>
                  {layout}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Field>

      <Field className="gap-1 max-w-90 w-full">
        <FieldLabel htmlFor={`title-${id}`}>Título</FieldLabel>
        <Input
          className="capitalize"
          defaultValue={parsed.title}
          id={`title-${id}`}
          onChange={(e) => {
            clearTimeout(titleTimeout.current ?? undefined);
            titleTimeout.current = setTimeout(() => {
              updateParams({ title: e.target.value, page: 1 });
            }, 1000);
          }}
          placeholder="Alterar cor..."
          type="text"
        />
      </Field>
    </form>
  );
};
