"use client";

import { Controller } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { IMPERATIVE_OPTIONS, LAYOUT_OPTIONS } from "@/constants/script";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useScriptsFilters } from "@/hooks/use-scripts-filters";
import { scriptsQueryOptions } from "@/services/scripts.service";
import { columns } from "./columns";

const ALL_VALUE = "all";

export function ScriptsTable() {
  const { form, onFilterChange, params, updateParams } = useScriptsFilters();

  const { data, isFetching, isPending } = useQuery(scriptsQueryOptions(params));
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
        <Controller
          control={form.control}
          name="imperative"
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                const filter = value === ALL_VALUE ? undefined : value;
                field.onChange(filter ?? "");
                updateParams({ imperative: filter, page: 1 });
              }}
              value={field.value || undefined}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Imperativo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VALUE}>Todos</SelectItem>
                {IMPERATIVE_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Controller
          control={form.control}
          name="layout"
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                const filter = value === ALL_VALUE ? undefined : value;
                field.onChange(filter ?? "");
                updateParams({ layout: filter, page: 1 });
              }}
              value={field.value || undefined}
            >
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Layout" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_VALUE}>Todos</SelectItem>
                {LAYOUT_OPTIONS.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <Input
          className="max-w-xs"
          placeholder="Buscar por título..."
          {...form.register("title")}
        />
      </form>
      {isPending ? (
        <div className="flex min-h-96 items-center justify-center overflow-hidden rounded-md border">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <div className="overflow-hidden rounded-md border">
          <Table style={{ tableLayout: "fixed", width: "100%" }}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={{ width: header.getSize() }}
                    >
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
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
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
