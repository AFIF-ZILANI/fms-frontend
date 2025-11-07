"use client";
import { columns, DisplayBatch } from "./columns";
import { DataTableComp } from "@/components/table-data";
import { useGetData } from "@/lib/api-request";
import { useEffect, useState } from "react";
import {
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import React from "react";

export default function Page() {
  const [skip, setSkip] = useState(0);
  const [tableData, setTableData] = useState<DisplayBatch[]>([]);
  const { data, isPending, isSuccess, refetch, isFetching } = useGetData(
    `/get-table-data?category=batch&skip=${skip * 20}`
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<DisplayBatch>({
    data: tableData,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setTableData((data as any).data);
    }
  }, [data, isPending, isSuccess]);
  return (
    <div className="max-w-[70rem] mx-auto">
      <DataTableComp
      table={table}
      isFetching={isFetching}
      isPending={isPending}
      setTableData={setTableData}
      columns={columns}
      setSkip={setSkip}
      refetchFn={refetch}
      removeRowEndpoint="/batches/remove"
    />
    </div>
  );
}
