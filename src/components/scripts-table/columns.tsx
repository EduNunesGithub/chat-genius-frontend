"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Script } from "@/types/script";

export const columns: ColumnDef<Script>[] = [
  {
    accessorKey: "title",
    header: "Título",
    size: 200,
  },
  {
    accessorKey: "imperative",
    header: "Imperativo",
    size: 120,
  },
  {
    accessorKey: "layout",
    header: "Layout",
    size: 120,
  },
  {
    accessorKey: "description",
    cell: ({ row }) => (
      <p className="line-clamp-2 text-sm">{row.getValue("description")}</p>
    ),
    header: "Descrição",
    size: 380,
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleDateString("pt-BR"),
    header: "Criado em",
    size: 100,
  },
];
