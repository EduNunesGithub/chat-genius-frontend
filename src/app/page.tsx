import React from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { ListScripts } from "@/components/list-scripts";
import { FiltersSkeleton } from "@/components/list-scripts/filters/filters-skeleton";

export type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

const Page: React.FC<PageProps> = async ({
  searchParams: searchParamsProp,
}) => {
  const searchParams = await searchParamsProp;

  return (
    <main className="mx-auto max-w-6xl p-8">
      <h1 className="mb-6 text-2xl font-semibold">Scripts</h1>
      <ListScripts searchParams={searchParams} />
    </main>
  );
};

export default Page;
