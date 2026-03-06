import { queryOptions } from "@tanstack/react-query";
import * as z from "zod";

export type GetScriptsResponseSchema = z.infer<typeof getScriptsResponseSchema>;

export type GetScriptsSearchParamsSchema = z.infer<
  typeof getScriptsSearchParamsSchema
>;

export type ScriptSchema = z.infer<typeof scriptSchema>;

export const imperatives = [
  "todas",
  "adicionar",
  "alterar",
  "remover",
] as const;

export const layouts = ["todos", "003 nova geração", "fiat", "ram"] as const;

export const scriptSchema = z.object({
  createdAt: z.string(),
  description: z.string(),
  id: z.uuid(),
  imperative: z.string(),
  layout: z.string(),
  semanticDescription: z.string().nullable(),
  src: z.string(),
  title: z.string(),
  updatedAt: z.string(),
});

export const getScriptsResponseSchema = z.object({
  data: z.array(scriptSchema),
  meta: z.object({
    limit: z.number(),
    page: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

export const getScriptsSearchParamsSchema = z.object({
  imperative: z.enum(imperatives).optional().catch(undefined),
  layout: z.enum(layouts).optional().catch(undefined),
  limit: z.coerce.number().min(1).max(100).optional().catch(undefined),
  page: z.coerce.number().min(1).optional().catch(undefined),
  title: z.string().optional().catch(undefined),
});

export async function getScripts(params: GetScriptsSearchParamsSchema) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/scripts`);
  const parsed = getScriptsSearchParamsSchema.parse(params);

  for (const k in parsed) {
    const key = k as keyof typeof parsed;
    const value = parsed[key];
    if (value !== undefined && value !== "todos" && value !== "todas")
      url.searchParams.set(key, String(value));
  }

  const response = await fetch(url.toString());
  const data = await response.json();

  return getScriptsResponseSchema.parse(data);
}

export function getScriptsQueryOptions(params: GetScriptsSearchParamsSchema) {
  const parsed = getScriptsSearchParamsSchema.parse(params);

  return queryOptions({
    queryFn: () => getScripts(parsed),
    queryKey: ["scripts", parsed],
  });
}
