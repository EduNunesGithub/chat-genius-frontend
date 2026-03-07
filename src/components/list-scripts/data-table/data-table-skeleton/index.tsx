import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const rows = Array.from({ length: 24 });

export const DataTableSkeleton = () => {
  return (
    <div className="flex flex-col flex-1 gap-4 items-end w-full">
      <div className="border flex h-full overflow-hidden rounded-md w-full">
        <Table className="h-full truncate" skeleton>
          <colgroup>
            <col style={{ minWidth: 96, width: 96 }} />
            <col style={{ minWidth: 96, width: 96 }} />
            <col style={{ minWidth: "100%", width: "100%" }} />
            <col style={{ minWidth: 160, width: 160 }} />
            <col style={{ minWidth: 24, width: 24 }} />
          </colgroup>

          <TableHeader>
            <TableRow>
              <TableHead className="px-3">
                <Skeleton className="h-4 w-16" />
              </TableHead>

              <TableHead className="px-3">
                <Skeleton className="h-4 w-12" />
              </TableHead>

              <TableHead className="px-3">
                <Skeleton className="h-4 w-24" />
              </TableHead>

              <TableHead className="px-3">
                <Skeleton className="h-4 w-20" />
              </TableHead>

              <TableHead className="px-3">
                <Skeleton className="h-4 w-4" />
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.map((_, i) => (
              <TableRow key={i}>
                <TableCell className="px-3">
                  <Skeleton className="h-4 w-16" />
                </TableCell>

                <TableCell className="px-3">
                  <Skeleton className="h-4 w-16" />
                </TableCell>

                <TableCell className="px-3">
                  <Skeleton className="h-4 w-[60%]" />
                </TableCell>

                <TableCell className="px-3">
                  <Skeleton className="h-4 w-20" />
                </TableCell>

                <TableCell className="px-3">
                  <Skeleton className="h-6 w-6 rounded-sm" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap gap-2 items-center justify-end max-w-full w-fit">
        <Skeleton className="h-8 w-24 rounded-md" />
        <Skeleton className="h-8 w-24 rounded-md" />
      </div>
    </div>
  );
};

export default DataTableSkeleton;
