"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ReadonlyURLSearchParams } from "next/navigation";
import { FiltersSkeleton } from "@/components/list-scripts/filters/filters-skeleton";
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
  const { parsed, updateParams } = useListScripts({
    searchParams: searchParams,
  });

  return (
    <section>
      <span>{JSON.stringify(searchParams)}</span>
      <Filters parsed={parsed} updateParams={updateParams} />
    </section>
  );
};
