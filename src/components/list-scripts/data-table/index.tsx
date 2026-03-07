import { UseMutationResult } from "@tanstack/react-query";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { MoreHorizontal, Trash2 } from "lucide-react";
import { twMerge } from "tailwind-merge";
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
  DeleteScriptParamsSchema,
  GetScriptsResponseSchema,
  getScriptsSearchParamsSchema,
  ScriptSchema,
} from "@/services/scripts.service";

type Columns = (arg0: {
  mutationDeleteScripts: DataTableProps["mutationDeleteScripts"];
}) => ColumnDef<ScriptSchema>[];

type DataTableProps = {
  data: GetScriptsResponseSchema;
  mutationDeleteScripts: UseMutationResult<
    void,
    Error,
    DeleteScriptParamsSchema,
    unknown
  >;
  updateParams: (
    next: Partial<z.input<typeof getScriptsSearchParamsSchema>>,
  ) => void;
};

const columns: Columns = ({ mutationDeleteScripts }) => [
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
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => mutationDeleteScripts.mutate({ id: id })}
            >
              <span className="sr-only">Excluir script.</span>
              <Trash2 className="h-3 text-destructive w-3" />
            </DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    size: 24,
  },
];

export function DataTable({
  data,
  mutationDeleteScripts,
  updateParams,
}: DataTableProps) {
  const table = useReactTable({
    data: data.data,
    columns: columns({ mutationDeleteScripts }),
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
      <div className="border flex flex-col flex-1 items-start rounded-md w-full">
        <Table
          className={twMerge(
            "flex-1 truncate",
            !table.getRowModel().rows.length && "h-full",
          )}
        >
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
                  colSpan={columns({ mutationDeleteScripts }).length}
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
