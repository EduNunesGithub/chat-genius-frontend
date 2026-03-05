"use client";

import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useScriptsFilters } from "@/hooks/use-scripts-filters";
import { scriptsQueryOptions } from "@/services/scripts";
import { columns } from "./columns";

export function ScriptsTable() {
  const { form, onFilterChange, params, updateParams } = useScriptsFilters();

  const { data, isFetching } = useQuery(scriptsQueryOptions(params));
  const meta = data?.meta;

  const table = useReactTable({
    columns,
    data: data?.data ?? [],
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: meta?.totalPages ?? 0,
    state: {
      pagination: {
        pageIndex: params.page - 1,
        pageSize: params.limit,
      },
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <form className="flex flex-wrap gap-2" onChange={onFilterChange}>
        <Input
          className="max-w-xs"
          placeholder="Imperativo (ex: remove)"
          {...form.register("imperative")}
        />
        <Input
          className="max-w-xs"
          placeholder="Layout (ex: home)"
          {...form.register("layout")}
        />
        <Input
          className="max-w-xs"
          placeholder="Buscar por título..."
          {...form.register("title")}
        />
      </form>
      <div
        className="overflow-hidden rounded-md border transition-opacity duration-200"
        style={{ opacity: isFetching ? 0.6 : 1 }}
      >
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                    <TableCell key={cell.id}>
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
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  {isFetching
                    ? "Carregando..."
                    : "Nenhum resultado encontrado."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          {meta?.total ?? 0} resultado{(meta?.total ?? 0) !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <Button
            disabled={params.page <= 1 || isFetching}
            onClick={() => updateParams({ page: params.page - 1 })}
            size="sm"
            variant="outline"
          >
            Anterior
          </Button>
          <span className="text-sm">
            {params.page} / {meta?.totalPages ?? 1}
          </span>
          <Button
            disabled={params.page >= (meta?.totalPages ?? 1) || isFetching}
            onClick={() => updateParams({ page: params.page + 1 })}
            size="sm"
            variant="outline"
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
}
