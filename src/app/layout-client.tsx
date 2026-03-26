"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { usePathname } from "next/navigation";
import { type ReactNode, useState } from "react";

type LayoutClientProps = {
  children: ReactNode;
};

const NO_SIDEBAR = ["/login"];

export function LayoutClient({ children }: LayoutClientProps) {
  const [queryClient] = useState(() => new QueryClient());
  const pathname = usePathname();
  const hasSidebar = !NO_SIDEBAR.includes(pathname);

  return (
    <QueryClientProvider client={queryClient}>
      {hasSidebar ? (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
      ) : (
        children
      )}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
