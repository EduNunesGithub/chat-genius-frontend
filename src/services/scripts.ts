import { queryOptions } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import {
  ListScriptsParams,
  ListScriptsResponse,
  listScriptsResponseSchema,
  ScriptsSearchParams,
} from "@/types/script";

export function scriptsQueryOptions(params: ScriptsSearchParams) {
  return queryOptions({
    queryFn: () => listScripts(params),
    queryKey: ["scripts", params],
  });
}

export async function listScripts(
  params?: ListScriptsParams,
): Promise<ListScriptsResponse> {
  const sp = new URLSearchParams();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") sp.set(key, String(value));
    }
  }
  const query = sp.toString();
  const raw = await apiFetch<unknown>(`/scripts${query ? `?${query}` : ""}`);
  return listScriptsResponseSchema.parse(raw);
}
