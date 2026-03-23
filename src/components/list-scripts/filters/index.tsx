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
import { type FC, useId, useRef } from "react";

export type FiltersProps = {
  parsed: GetScriptsSearchParamsSchema;
  updateParams: (next: Partial<GetScriptsSearchParamsSchema>) => void;
};

export const Filters: FC<FiltersProps> = ({ parsed, updateParams }) => {
  const id = useId();
  const titleTimeout = useRef<ReturnType<typeof setTimeout>>(null);

  return (
    <form className="flex flex-wrap gap-2 items-center justify-start w-full">
      <Field className="gap-1 max-w-48 w-full">
        <FieldLabel>Ação</FieldLabel>
        <Select
          value={parsed.imperative}
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
              {imperatives.map((imperative) => (
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
          value={parsed.layout}
          onValueChange={(value) =>
            updateParams({
              layout: value as (typeof layouts)[number],
              page: 1,
            })
          }
        >
          <SelectTrigger className="capitalize">
            <SelectValue placeholder="Escolher layout" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {layouts.map((layout) => (
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
          placeholder="Buscar por título..."
          type="text"
        />
      </Field>
    </form>
  );
};
