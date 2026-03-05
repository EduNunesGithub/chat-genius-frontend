import { z } from "zod";

export const listScriptsParamsSchema = z.object({
  imperative: z.string().optional(),
  layout: z.string().optional(),
  limit: z.number().min(1).max(100).optional(),
  page: z.number().min(1).optional(),
  title: z.string().optional(),
});

export const paginationMetaSchema = z.object({
  limit: z.number(),
  page: z.number(),
  total: z.number(),
  totalPages: z.number(),
});

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

export const listScriptsResponseSchema = z.object({
  data: z.array(scriptSchema),
  meta: paginationMetaSchema,
});

export const scriptsSearchParamsSchema = z.object({
  imperative: z.string().optional(),
  layout: z.string().optional(),
  limit: z.coerce.number().min(1).max(100).catch(1),
  page: z.coerce.number().min(1).catch(1),
  title: z.string().optional(),
});

export const scriptsFiltersSchema = scriptsSearchParamsSchema.pick({
  imperative: true,
  layout: true,
  title: true,
});

export type ListScriptsParams = z.infer<typeof listScriptsParamsSchema>;
export type ListScriptsResponse = z.infer<typeof listScriptsResponseSchema>;
export type PaginationMeta = z.infer<typeof paginationMetaSchema>;
export type Script = z.infer<typeof scriptSchema>;
export type ScriptsFilters = z.infer<typeof scriptsFiltersSchema>;
export type ScriptsSearchParams = z.infer<typeof scriptsSearchParamsSchema>;
