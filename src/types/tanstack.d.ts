import "@tanstack/react-query";

type QueryKey =
  | ["admin-users", ...ReadonlyArray<unknown>]
  | ["scripts", ...ReadonlyArray<unknown>];

declare module "@tanstack/react-query" {
  interface Register {
    mutationKey: QueryKey;
    queryKey: QueryKey;
  }
}
