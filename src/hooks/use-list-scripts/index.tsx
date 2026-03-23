"use client";

import {
  defaultSearchParams,
  deleteScript,
  getScriptsQueryOptions,
  getScriptsSearchParamsSchema,
} from "@/services/scripts.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
} from "next/navigation";
import { useCallback } from "react";
import { toast } from "sonner";
import * as z from "zod";

export type UseListScriptsProps = {
  searchParams: ReadonlyURLSearchParams;
};

export const useListScripts = ({ searchParams }: UseListScriptsProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const parsed = getScriptsSearchParamsSchema.parse(searchParams);

  const query = useQuery(getScriptsQueryOptions(parsed));
  const queryClient = useQueryClient();
  const mutationDeleteScript = useMutation({
    mutationFn: deleteScript,
    onError: ({ message }) => toast.error(message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scripts"] });
      toast.success("Script excluído com sucesso.");
    },
  });

  const updateParams = useCallback(
    (next: Partial<z.input<typeof getScriptsSearchParamsSchema>>) => {
      const params = new URLSearchParams();
      const current = { ...parsed, ...next };
      for (const k in current) {
        const key = k as keyof typeof current;
        const value = current[key];
        const def =
          defaultSearchParams[key as keyof typeof defaultSearchParams];
        if (value !== undefined && value !== def)
          params.set(key, String(value));
      }
      const qs = params.toString();
      router.push(qs ? `${pathname}?${qs}` : pathname);
    },
    [parsed, pathname, router],
  );

  return {
    mutationDeleteScript,
    parsed,
    query,
    updateParams,
  };
};
