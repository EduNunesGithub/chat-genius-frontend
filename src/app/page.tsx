import React from "react";
import { Plus } from "lucide-react";
import Link from "next/link";
import { ReadonlyURLSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
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
      <header className="flex gap-6 items-center justify-between mb-6 w-full">
        <h1 className="font-bold text-foreground text-2xl uppercase">
          Gerenciamento de Scripts
        </h1>

        <Button asChild size="icon">
          <Link className="shrink-0" href="/scripts/new">
            <span className="sr-only">Criar novo script.</span>
            <Plus />
          </Link>
        </Button>
      </header>

      <ListScripts searchParams={searchParams} />
    </main>
  );
};

export default Page;
