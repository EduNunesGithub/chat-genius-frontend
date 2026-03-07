import React from "react";
import { ReadonlyURLSearchParams } from "next/navigation";
import { ListScripts } from "@/components/list-scripts";
import { CreateScriptForm } from "@/components/create-script-form";

export type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

const Page: React.FC<PageProps> = async ({
  searchParams: searchParamsProp,
}) => {
  const searchParams = await searchParamsProp;

  return (
    <main className="flex flex-col h-full p-4 w-full">
      <ListScripts searchParams={searchParams} />

      <CreateScriptForm />
    </main>
  );
};

export default Page;
