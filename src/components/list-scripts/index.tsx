"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ReadonlyURLSearchParams } from "next/navigation";
import { FiltersSkeleton } from "@/components/list-scripts/filters/filters-skeleton";
import { DataTable } from "@/components/list-scripts/data-table";
import { DataTableSkeleton } from "@/components/list-scripts/data-table/data-table-skeleton";
import { useListScripts } from "@/hooks/use-list-scripts";

export type ListScriptsProps = {
  searchParams: ReadonlyURLSearchParams;
};

const Filters = dynamic(
  () => import("@/components/list-scripts/filters").then((c) => c.Filters),
  {
    loading: () => <FiltersSkeleton />,
    ssr: false,
  },
);

export const ListScripts: React.FC<ListScriptsProps> = ({ searchParams }) => {
  const { query, mutationDeleteScripts, parsed, updateParams } = useListScripts(
    {
      searchParams: searchParams,
    },
  );

  return (
    <section className="flex flex-1 flex-col gap-4 items-start w-full">
      <Filters parsed={parsed} updateParams={updateParams} />

      {query.status === "success" ? (
        <DataTable
          data={query.data}
          mutationDeleteScripts={mutationDeleteScripts}
          updateParams={updateParams}
        />
      ) : (
        <DataTableSkeleton />
      )}
    </section>
  );
};
