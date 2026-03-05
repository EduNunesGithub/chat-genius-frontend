"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Script } from "@/types/script";

export const columns: ColumnDef<Script>[] = [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "imperative",
    header: "Imperativo",
  },
  {
    accessorKey: "layout",
    header: "Layout",
  },
  {
    accessorKey: "description",
    cell: ({ row }) => (
      <p className="line-clamp-2 max-w-xs text-sm">
        {row.getValue("description")}
      </p>
    ),
    header: "Descrição",
  },
  {
    accessorKey: "createdAt",
    cell: ({ row }) =>
      new Date(row.getValue("createdAt")).toLocaleDateString("pt-BR"),
    header: "Criado em",
  },
];
