"use client";

import { useMemo } from "react";
import { flexRender } from "@tanstack/react-table";
import { Truck, Package } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/string-utils";
import { ColumnDef, Table as TableType } from "@tanstack/react-table";
import { DisplayItem } from "./detail-stock-column";
import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";

export interface DisplayUrgentItem extends DisplayItem {
  shortfall: number;
  suggested_order: number;
}

interface DataTableProps<TData extends { id: string }, TValue = any> {
  columns: ColumnDef<TData, TValue>[];
  table: TableType<TData>;
  isLoading: boolean;
  tableData: DisplayUrgentItem[];
}

export function UrgentDataTable<TData extends DisplayUrgentItem>({
  columns,
  table,
  isLoading,
  tableData,
}: DataTableProps<TData>) {
  // ✅ Compute urgent reorder items
  const itemsToReorder = useMemo(() => {
    return (
      tableData &&
      tableData.filter((item) => item.stock_quantity <= item.reorder_level)
    );
  }, [tableData]);

  // ✅ Total suggested purchase cost
  const totalOrderCost = useMemo(() => {
    return (
      itemsToReorder &&
      itemsToReorder.reduce(
        (sum, item) => sum + item.suggested_order * item.unit_price,
        0
      )
    );
  }, [itemsToReorder]);

  return (
    <Card className="py-6 px-4">
      <div>
        {/* Header */}
        <div className="flex flex-col gap-3 mb-4">
          <h2 className="text-xl font-semibold flex items-center">
            <Truck className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
            Urgent Purchase List ({itemsToReorder && itemsToReorder.length}{" "}
            Items)
          </h2>
          <p className="text-sm text-muted-foreground">
            Recommended orders for items at or below reorder level. Estimated
            Cost:{" "}
            <span className="font-bold text-red-600 dark:text-red-400">
              {typeof totalOrderCost === "number" &&
                formatCurrency(totalOrderCost)}
            </span>
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-md border">
          {isLoading ? (
            <div className="flex justify-center  items-center gap-2 py-8">
              <Spinner />
              <span>Loading...</span>
            </div>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="bg-red-100 dark:bg-red-900/20"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        className="text-muted-foreground"
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>

              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const item = row.original;
                    const isOutOfStock = item.stock_quantity === 0;

                    return (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && "selected"}
                        className={
                          isOutOfStock
                            ? "bg-red-100 dark:bg-red-900/40 text-red-800 dark:text-red-300 font-medium transition-all"
                            : ""
                        }
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="text-center text-green-600 dark:text-green-400 py-8 text-lg font-medium"
                    >
                      <Package className="w-6 h-6 inline-block mr-2" />
                      All items are above their reorder threshold!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
    </Card>
  );
}
