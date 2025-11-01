"use client";
import { columns, DisplayEmployee } from "./columns";
import { DataTableComp } from "@/components/table-data";
import { useGetData } from "@/lib/api-request";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
import React from "react";

export default function Page() {
  const [skip, setSkip] = useState(0);
  const [tableData, setTableData] = useState<DisplayEmployee[]>([]);
  const { data, isPending, isSuccess, refetch, isFetching } = useGetData(
    `/get-table-data?category=employee&skip=${skip * 20}`
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<DisplayEmployee>({
    data: tableData,
    columns,
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
    <DataTableComp
      table={table}
      isFetching={isFetching}
      isPending={isPending}
      columns={columns}
      setSkip={setSkip}
      setTableData={setTableData}
      refetchFn={refetch}
      removeRowEndpoint="/employee/remove"
    />
  );
}
