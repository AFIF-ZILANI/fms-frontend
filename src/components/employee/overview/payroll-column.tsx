"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/string-utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DisplayPayroll = {
  category: string;
  count: number;
  ammount: number;
};

export const columns: ColumnDef<DisplayPayroll>[] = [
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "count",
    header: "Count",
  },
  {
    accessorKey: "ammount",
    header: "Ammount",
    cell({ row }) {
      return <Label>{formatCurrency(row.original.ammount)}</Label>;
    },
  },
];
