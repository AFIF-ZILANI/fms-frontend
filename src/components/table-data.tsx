"use client";

import {
  Table as TableTye,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { LuRefreshCcw } from "react-icons/lu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { Dispatch, SetStateAction } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { DeleteDialog } from "@/components/table-delete-button";
import { useDeleteBulkData } from "@/lib/api-request";
import { Spinner } from "./ui/spinner";
import toast from "react-hot-toast";

interface DataTableProps<TData extends { id: string }, TValue = any> {
  columns: ColumnDef<TData, TValue>[]; // ✅ TData here
  table: TableTye<TData>; // ✅ Table uses the same TData
  isPending?: boolean;
  removeRowEndpoint: string;
  refetchFn: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<unknown, Error>>;
  isFetching: boolean;
  setSkip: Dispatch<SetStateAction<number>>;
  setTableData: React.Dispatch<React.SetStateAction<TData[]>>;
}

export function DataTable<TData extends { id: string }, TValue>({
  columns,
  refetchFn,
  isFetching,
  setTableData,
  table,
  removeRowEndpoint,
}: DataTableProps<TData, TValue>) {
  const deleteFunc = useDeleteBulkData(removeRowEndpoint);
  function handleDelete() {
    const selectedRows = table.getSelectedRowModel().rows;

    if (selectedRows.length === 0) {
      toast.error("No rows selected");
      return [];
    }

    const selectedIds = selectedRows.map((row) => row.original.id);
    setTableData((prev) => prev.filter((row) => !selectedIds.includes(row.id)));
    return selectedIds;
  }
  return (
    <div>
      <div className="flex items-center py-4">
        <div className="flex gap-2">
          <DeleteDialog
            refetchFn={refetchFn}
            handleDelete={handleDelete}
            deleteFunc={deleteFunc}
          />
          <Button
            variant={"outline"}
            className="cursor-pointer"
            onClick={() => refetchFn()}
            disabled={isFetching}
          >
            <LuRefreshCcw />
          </Button>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
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
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-muted-foreground flex-1 text-sm mt-2">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
    </div>
  );
}

export function DataTableComp<TData extends { id: string }, TValue>({
  isPending,
  table,
  columns,
  refetchFn,
  setSkip,
  setTableData,
  isFetching,
  removeRowEndpoint,
}: DataTableProps<TData, TValue>) {
  return (
    <div className="py-6 px-4">
      <div className="mx-auto w-[70rem]">
        {isPending ? (
          <div className="flex items-center gap-3">
            <Spinner width={200} height={200} />
            Loading...
          </div>
        ) : (
          <>
            <DataTable
              table={table}
              columns={columns}
              setSkip={setSkip}
              refetchFn={refetchFn}
              setTableData={setTableData}
              isFetching={isFetching}
              removeRowEndpoint={removeRowEndpoint}
            />
            {isFetching && (
              <div className="absolute bottom-1 right-4 flex items-center gap-2 text-sm text-gray-500 bg-white/70 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
                <Spinner width={16} height={16} />
                Refreshing...
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
