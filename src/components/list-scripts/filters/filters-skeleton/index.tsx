import { Field, FieldLabel } from "@/components/ui/field";
import { Skeleton } from "@/components/ui/skeleton";

export const FiltersSkeleton = () => {
  return (
    <form className="flex flex-wrap gap-2 items-center justify-start w-full">
      <Field className="gap-1 max-w-48 w-full">
        <FieldLabel className="relative">
          <span className="opacity-0 select-none whitespace-nowrap">Ação</span>
          <Skeleton className="absolute inset-y-0 left-0 my-auto h-[50%] w-10" />
        </FieldLabel>

        <Skeleton className="h-9 w-full rounded-md" />
      </Field>

      <Field className="gap-1 max-w-48 w-full">
        <FieldLabel className="relative">
          <span className="opacity-0 select-none whitespace-nowrap">
            Layout
          </span>
          <Skeleton className="absolute inset-y-0 left-0 my-auto h-[50%] w-12" />
        </FieldLabel>

        <Skeleton className="h-9 w-full rounded-md" />
      </Field>

      <Field className="gap-1 max-w-90 w-full">
        <FieldLabel className="relative">
          <span className="opacity-0 select-none whitespace-nowrap">
            Título
          </span>
          <Skeleton className="absolute inset-y-0 left-0 my-auto h-[50%] w-16" />
        </FieldLabel>

        <Skeleton className="h-9 w-full rounded-md" />
      </Field>
    </form>
  );
};

export default FiltersSkeleton;
