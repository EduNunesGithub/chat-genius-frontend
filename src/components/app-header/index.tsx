"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

type AppHeaderProps = {
  actions?: React.ReactNode;
  title: string;
};

export function AppHeader({ actions, title }: AppHeaderProps) {
  return (
    <header className="border-b flex gap-2 h-14 items-center px-4 shrink-0">
      <SidebarTrigger className="-ml-1" />
      <Separator className="h-4" orientation="vertical" />
      <h1 className="font-semibold text-sm tracking-wide uppercase">{title}</h1>
      {actions && (
        <div className="flex gap-2 items-center ml-auto">{actions}</div>
      )}
    </header>
  );
}
