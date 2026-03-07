import "@tanstack/react-query";

type QueryKey = ["scripts", ...ReadonlyArray<unknown>];

declare module "@tanstack/react-query" {
  interface Register {
    queryKey: QueryKey;
    mutationKey: QueryKey;
  }
}
