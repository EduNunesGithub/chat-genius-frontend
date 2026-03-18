"use client";

import { AppHeader } from "@/components/app-header";
import { CreateScriptFormSkeleton } from "@/components/create-script-form/create-script-form-skeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";

const CreateScriptForm = dynamic(
  () =>
    import("@/components/create-script-form").then((c) => c.CreateScriptForm),
  {
    ssr: false,
    loading: () => <CreateScriptFormSkeleton />,
  },
);

const Page = () => (
  <div className="flex flex-col flex-1">
    <AppHeader
      actions={
        <Button asChild size="icon" variant="outline">
          <Link href="/scripts">
            <span className="sr-only">Voltar para lista de scripts.</span>
            <ArrowLeft />
          </Link>
        </Button>
      }
      title="Criar Novo Script"
    />

    <div className="flex flex-col flex-1 overflow-auto p-4">
      <CreateScriptForm />
    </div>
  </div>
);

export default Page;
