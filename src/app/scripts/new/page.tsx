import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CreateScriptForm } from "@/components/create-script-form";
import { Button } from "@/components/ui/button";

const Page = () => (
  <main className="flex flex-col h-full p-4 w-full">
    <header className="flex gap-6 items-center justify-start mb-6 w-full">
      <Button asChild className="shrink-0" size="icon">
        <Link href="/scripts">
          <span className="sr-only">Voltar para lista de scripts.</span>
          <ArrowLeft />
        </Link>
      </Button>

      <h1 className="font-bold text-foreground text-2xl uppercase">
        Criar Novo Script
      </h1>
    </header>

    <CreateScriptForm />
  </main>
);

export default Page;
