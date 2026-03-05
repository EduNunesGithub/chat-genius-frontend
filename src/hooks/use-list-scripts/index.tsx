"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import {
  getScriptsQueryOptions,
  getScriptsSearchParamsSchema,
} from "@/services/scripts.service";
import * as z from "zod";

export type UseListScriptsProps = {
  searchParams: ReadonlyURLSearchParams;
};

export const useListScripts = ({ searchParams }: UseListScriptsProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const parsed = getScriptsSearchParamsSchema.parse(searchParams);
  const query = useQuery(getScriptsQueryOptions(parsed));

  const updateParams = React.useCallback(
    (next: Partial<z.input<typeof getScriptsSearchParamsSchema>>) => {
      const params = new URLSearchParams();
      const current = { ...parsed, ...next };
      for (const k in current) {
        const key = k as keyof typeof current;
        const value = current[key];
        if (value !== undefined) params.set(key, String(value));
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [parsed, pathname, router],
  );

  return {
    parsed,
    query,
    updateParams,
  };
};
