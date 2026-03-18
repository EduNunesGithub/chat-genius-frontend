import { Field, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";

export const CreateScriptFormSkeleton = () => {
  return (
    <form className="auto-rows-min gap-4 grid grid-cols-1 w-full">
      <div className="flex flex-wrap gap-4 items-center justify-start w-full">
        <Field className="gap-2 max-w-96 w-full">
          <FieldLabel className="relative">
            <span className="opacity-0 select-none whitespace-nowrap">
              Imperativo
            </span>
            <Skeleton className="absolute inset-y-0 left-0 my-auto h-[50%] w-16" />
          </FieldLabel>
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-3 w-48" />
        </Field>

        <Field className="gap-2 max-w-96 w-full">
          <FieldLabel className="relative">
            <span className="opacity-0 select-none whitespace-nowrap">
              Layout
            </span>
            <Skeleton className="absolute inset-y-0 left-0 my-auto h-[50%] w-12" />
          </FieldLabel>
          <Skeleton className="h-9 w-full rounded-md" />
          <Skeleton className="h-3 w-48" />
        </Field>
      </div>

      <Field className="gap-2 w-full">
        <FieldLabel className="relative">
          <span className="opacity-0 select-none whitespace-nowrap">
            Título
          </span>
          <Skeleton className="absolute inset-y-0 left-0 my-auto h-[50%] w-10" />
        </FieldLabel>
        <Skeleton className="h-9 w-full rounded-md" />
        <Skeleton className="h-3 w-56" />
      </Field>

      <Field className="gap-2 w-full">
        <FieldLabel className="relative">
          <span className="opacity-0 select-none whitespace-nowrap">URL</span>
          <Skeleton className="absolute inset-y-0 left-0 my-auto h-[50%] w-8" />
        </FieldLabel>
        <Skeleton className="h-9 w-full rounded-md" />
        <Skeleton className="h-3 w-64" />
      </Field>

      <Field className="gap-2 w-full">
        <FieldLabel className="relative">
          <span className="opacity-0 select-none whitespace-nowrap">
            Descrição
          </span>
          <Skeleton className="absolute inset-y-0 left-0 my-auto h-[50%] w-14" />
        </FieldLabel>
        <Skeleton className="h-24 w-full rounded-md" />
        <Skeleton className="h-3 w-72" />
      </Field>

      <Skeleton className="h-9 w-full rounded-md" />
    </form>
  );
};
