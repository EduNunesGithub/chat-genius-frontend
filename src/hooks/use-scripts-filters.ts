"use client";

import { useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
  scriptsFiltersSchema,
  ScriptsFilters,
  scriptsSearchParamsSchema,
  ScriptsSearchParams,
} from "@/types/script";

export function useScriptsFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const params = scriptsSearchParamsSchema.parse(
    Object.fromEntries(searchParams.entries()),
  );

  const form = useForm<ScriptsFilters>({
    defaultValues: {
      imperative: params.imperative,
      layout: params.layout,
      title: params.title,
    },
    resolver: zodResolver(scriptsFiltersSchema),
  });

  const updateParams = useCallback(
    (updates: Partial<ScriptsSearchParams>) => {
      const current = scriptsSearchParamsSchema.parse(
        Object.fromEntries(
          new URLSearchParams(window.location.search).entries(),
        ),
      );
      const next = scriptsSearchParamsSchema.parse({ ...current, ...updates });
      const sp = new URLSearchParams();
      for (const [key, value] of Object.entries(next)) {
        if (value !== undefined && value !== "") sp.set(key, String(value));
      }
      router.replace(`?${sp.toString()}`, { scroll: false });
    },
    [router],
  );

  const onFilterChange = form.handleSubmit((values: ScriptsFilters) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(
      () => updateParams({ ...values, page: 1 }),
      400,
    );
  });

  return { form, onFilterChange, params, updateParams };
}
