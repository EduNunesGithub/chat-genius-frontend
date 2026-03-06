import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  GetScriptsResponseSchema,
  getScriptsSearchParamsSchema,
  ScriptSchema,
} from "@/services/scripts.service";

type DataTableProps = {
  data: GetScriptsResponseSchema;
  updateParams: (
    next: Partial<z.input<typeof getScriptsSearchParamsSchema>>,
  ) => void;
};

const columns: ColumnDef<ScriptSchema>[] = [
  {
    accessorKey: "layout",
    header: "Layout",
    size: 96,
  },
  {
    accessorKey: "imperative",
    header: "Ação",
    size: 96,
  },
  {
    accessorKey: "title",
    header: "Título",
    size: 0,
  },
  {
    accessorKey: "updatedAt",
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt);
      return new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
        timeStyle: "short",
      }).format(date);
    },
    header: "Atualizado",
    size: 160,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const id = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-6 p-0 w-6">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(id)}>
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 24,
  },
];

export function DataTable({ data, updateParams }: DataTableProps) {
  const table = useReactTable({
    data: data.data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: data.meta.totalPages,
    rowCount: data.meta.limit,
    state: {
      pagination: {
        pageIndex: data.meta.page - 1,
        pageSize: data.meta.limit,
      },
    },
  });

  return (
    <div className="flex flex-col flex-1 gap-4 items-end w-full">
      <div className="border flex flex-1 items-start rounded-md w-full">
        <Table className="flex-1 truncate">
          <colgroup>
            {table.getAllLeafColumns().map((column) => (
              <col
                key={column.id}
                style={{
                  minWidth: column.columnDef.size
                    ? column.columnDef.size
                    : `${100}%`,
                  width: column.columnDef.size
                    ? column.columnDef.size
                    : `${100}%`,
                }}
              />
            ))}
          </colgroup>

          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="capitalize px-3" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="capitalize px-3" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="capitalize h-24 px-3 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-end max-w-full w-fit">
        <Button
          disabled={!table.getCanPreviousPage()}
          onClick={() => updateParams({ page: data.meta.page - 1 })}
          size="sm"
          variant="outline"
        >
          Anterior
        </Button>
        <Button
          disabled={!table.getCanNextPage()}
          onClick={() => updateParams({ page: data.meta.page + 1 })}
          size="sm"
          variant="outline"
        >
          Próximo
        </Button>
      </div>
    </div>
  );
}
