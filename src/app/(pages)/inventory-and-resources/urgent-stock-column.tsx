"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResourceCategory, Unit } from "@/types/enum.type";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { DisplayItem } from "./detail-stock-column";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export interface DisplayUrgentItem extends DisplayItem {
  shortfall: number;
  suggested_order: number;
}

export const columns: ColumnDef<DisplayUrgentItem>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Item Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Label className="flex flex-col items-start">
          <span>{row.original.name}</span>
          <span className="text-muted-foreground text-sm">
            {row.original.category}
          </span>
        </Label>
      );
    },
  },
  {
    accessorKey: "stock_quantity",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Current Stock
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Label className="flex flex-col items-start text-red-700 dark:text-red-400 font-bold text-sm">
          {row.original.stock_quantity} {row.original.unit_name}
        </Label>
      );
    },
  },
  {
    accessorKey: "reorder_level",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Reorder Level
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "suggested_order",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Suggested Order
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <Label className="flex flex-col items-start text-blue-600 dark:text-blue-400 font-bold text-sm">
          {row.original.suggested_order} {row.original.unit_name}
        </Label>
      );
    },
  },
  {
    accessorKey: "unit_price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unit Cost (৳)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },

  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => {
      if (row.original.supplier) {
        return (
          <Label>
            <Link href={`/suppliers/${row.original.supplier.id}`}>
              {row.original.supplier.name}
            </Link>
          </Label>
        );
      } else {
        return <Label>Unknown Supplier</Label>;
      }
    },
  },
];
