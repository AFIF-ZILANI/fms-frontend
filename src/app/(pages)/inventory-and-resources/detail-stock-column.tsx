"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResourceCategory, Unit } from "@/types/enum.type";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DisplayItem = {
  id: string;
  name: string;
  description?: string;
  category: ResourceCategory;
  unit_name: Unit;
  unit_price: number;
  stock_quantity: number;
  reorder_level: number;
  is_consumable: boolean;
  supplier?: {
    id: string;
    name: string;
  };
};

const getStatusBadge = (item: DisplayItem) => {
  const isLow =
    item.stock_quantity <= item.reorder_level && item.stock_quantity > 0;
  const isCritical = item.stock_quantity === 0;

  if (isCritical) {
    return (
      <span className="px-3 py-1 text-xs font-semibold rounded-full dark:text-red-400 text-red-600 dark:bg-red-900/30 bg-red-900/20">
        CRITICAL
      </span>
    );
  }
  if (isLow) {
    return (
      <span className="px-3 py-1 text-xs font-semibold rounded-full dark:text-orange-400 text-orange-600  dark:bg-orange-900/30 bg-orange-900/20">
        LOW STOCK
      </span>
    );
  }
  return (
    <span className="px-3 py-1 text-xs font-semibold rounded-full text-green-600 dark:text-green-400 dark:bg-green-900/30 bg-green-900/20">
      IN STOCK
    </span>
  );
};

export const columns: ColumnDef<DisplayItem>[] = [
  {
    id: "select",
    header: ({ table }) => {
      return (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      );
    },
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
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
  },
  {
    accessorKey: "category",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Category
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
          Quantity
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
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
          Per Unit (৳)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell({ row }) {
      return (
        <Label>
          {row.original.unit_price} / {row.original.unit_name}
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return getStatusBadge(row.original);
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
        return <Label>N/A</Label>;
      }
    },
  },

  {
    accessorKey: "is_consumable",
    header: "Consumable",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
];
