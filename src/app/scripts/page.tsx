import { AppHeader } from "@/components/app-header";
import { ListScripts } from "@/components/list-scripts";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { type ReadonlyURLSearchParams } from "next/navigation";
import React from "react";

export type PageProps = {
  searchParams: Promise<ReadonlyURLSearchParams>;
};

const Page: React.FC<PageProps> = async ({
  searchParams: searchParamsProp,
}) => {
  const searchParams = await searchParamsProp;

  return (
    <div className="flex flex-col flex-1">
      <AppHeader
        actions={
          <Button asChild size="icon">
            <Link href="/scripts/new">
              <span className="sr-only">Criar novo script.</span>
              <Plus />
            </Link>
          </Button>
        }
        title="Gerenciamento de Scripts"
      />

      <div className="flex flex-col flex-1 overflow-auto p-4">
        <ListScripts searchParams={searchParams} />
      </div>
    </div>
  );
};

export default Page;
