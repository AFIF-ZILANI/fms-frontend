"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { BirdBreed } from "@/types/enum.type";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DisplayBatch = {
  id: string;
  batch_name: string;
  start_date: Date;
  expected_end_date: Date;
  breed: BirdBreed;
  received_quantity: number;
  house_no: number;
  supplier: string;
  is_from_registerd_supplier: boolean;
};

export const columns: ColumnDef<DisplayBatch>[] = [
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
    accessorKey: "batch_name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Batch Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "breed",
    header: "Breed",
  },
  {
    accessorKey: "recevied_quantity",
    header: "Recevied Quantity",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
  },
  {
    accessorKey: "expected_end_date",
    header: "Estimated End Date",
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
  },
  {
    accessorKey: "is_from_registerd_suppler",
    header: "Registerd Suppler",
  },
];
