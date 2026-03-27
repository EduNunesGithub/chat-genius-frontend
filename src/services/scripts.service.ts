import { queryOptions } from "@tanstack/react-query";
import * as z from "zod";

export type ApiError = z.infer<typeof apiErrorSchema>;

export type CreateScriptSchema = z.infer<typeof createScriptSchema>;

export type DeleteScriptParamsSchema = z.infer<typeof deleteScriptParamsSchema>;

export type GetScriptsResponseSchema = z.infer<typeof getScriptsResponseSchema>;

export type GetScriptsSearchParamsSchema = z.infer<
  typeof getScriptsSearchParamsSchema
>;

export type ScriptSchema = z.infer<typeof scriptSchema>;

export type ScriptStreamEvent = z.infer<typeof scriptStreamEventSchema>;

export const imperativeOptions = ["adicionar", "alterar", "remover"] as const;

export const imperatives = ["todas", ...imperativeOptions] as const;

export const layoutOptions = ["003 nova geração", "fiat", "ram"] as const;

export const layouts = ["todos", ...layoutOptions] as const;

export const apiErrorSchema = z.object({
  statusCode: z.number(),
  message: z.union([z.string(), z.array(z.string())]),
});

export const createScriptSchema = z.object({
  description: z.string().min(1, "Descrição é obrigatória"),
  imperative: z.enum(imperativeOptions),
  layout: z.enum(layoutOptions),
  src: z.url("URL inválida"),
  title: z.string().min(1, "Título é obrigatório"),
});

export const deleteScriptParamsSchema = z.object({
  id: z.uuid(),
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

export const getScriptsResponseSchema = z.object({
  data: z.array(scriptSchema),
  meta: z.object({
    limit: z.number(),
    page: z.number(),
    total: z.number(),
    totalPages: z.number(),
  }),
});

export const scriptStreamEventSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("done"), data: scriptSchema }),
  z.object({ type: z.literal("error"), message: z.string() }),
  z.object({ type: z.literal("progress"), message: z.string() }),
]);

export const defaultSearchParams = {
  imperative: "todas" as const,
  layout: "todos" as const,
  limit: 10,
  page: 1,
};

export const getScriptsSearchParamsSchema = z.object({
  imperative: z.enum(imperatives).catch(defaultSearchParams.imperative),
  layout: z.enum(layouts).catch(defaultSearchParams.layout),
  limit: z.coerce.number().min(1).max(100).catch(defaultSearchParams.limit),
  page: z.coerce.number().min(1).catch(defaultSearchParams.page),
  title: z.string().optional().catch(undefined),
});

async function throwApiError(response: Response): Promise<never> {
  const json = await response.json();
  const { message } = apiErrorSchema.parse(json);
  throw new Error(Array.isArray(message) ? message.join(", ") : message);
}

export async function* createScriptStream(
  params: CreateScriptSchema,
): AsyncGenerator<ScriptStreamEvent> {
  const body = createScriptSchema.parse(params);
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/scripts/stream`);

  const response = await fetch(url.toString(), {
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });

  if (!response.ok) await throwApiError(response);
  if (!response.body) throw new Error("Stream sem corpo de resposta");

  const reader = response.body.getReader();
  const decoder = new TextDecoder();

  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n\n");
    buffer = lines.pop() ?? "";

    for (const line of lines) {
      if (!line.startsWith("data: ")) continue;
      yield scriptStreamEventSchema.parse(JSON.parse(line.slice(6)));
    }
  }
}

export async function deleteScript(params: DeleteScriptParamsSchema) {
  const { id } = deleteScriptParamsSchema.parse(params);
  const url = new URL(`${process.env.NEXT_PUBLIC_API_BASE_URL}/scripts/${id}`);

  const response = await fetch(url.toString(), {
    method: "DELETE",
  });

  if (!response.ok) await throwApiError(response);
}

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
  if (!response.ok) await throwApiError(response);
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
