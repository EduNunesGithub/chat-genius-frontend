export const IMPERATIVE_OPTIONS = [
  { label: "Adicionar", value: "add" },
  { label: "Atualizar", value: "update" },
  { label: "Remover", value: "remove" },
] as const;

export const LAYOUT_OPTIONS = [
  { label: "Dashboard", value: "dashboard" },
  { label: "Home", value: "home" },
  { label: "Perfil", value: "profile" },
] as const;

export type Imperative = (typeof IMPERATIVE_OPTIONS)[number]["value"];
export type Layout = (typeof LAYOUT_OPTIONS)[number]["value"];
