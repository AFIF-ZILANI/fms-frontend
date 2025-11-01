"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { BirdBreed } from "@/types/enum.type";
import { Label } from "@/components/ui/label";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DisplayBatch = {
  id: string;
  batch_id: string;
  start_date: Date;
  expected_end_date: Date;
  breed: BirdBreed;
  received_quantity: number;
  house_no: number;
  farm_code: string;
  product_code: string;
  sector_code: string;
  supplier: {
    id: string;
    name: string;
  };
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
    accessorKey: "batch_id",
    header: "Batch ID",
  },
  {
    accessorKey: "breed",
    header: "Breed",
    cell: ({ row }) => {
      const breedLabel =
        row.original.breed.charAt(0) +
        row.original.breed.slice(1).toLowerCase().replace("_", " ");
      return <Label>{breedLabel}</Label>;
    },
  },
  {
    accessorKey: "received_quantity",
    header: "Recevied Quantity",
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell({ row }) {
      const endDate = new Date(row.original.expected_end_date);
      return <Label>{endDate.toLocaleDateString()}</Label>;
    },
  },
  {
    accessorKey: "expected_end_date",
    header: "Estimated End Date",
    cell({ row }) {
      const endDate = new Date(row.original.expected_end_date);
      return <Label>{endDate.toLocaleDateString()}</Label>;
    },
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
    cell: ({ row }) => {
      return (
        <Label>
          {row.original.supplier ? row.original.supplier.name : "N/A"}
        </Label>
      );
    },
  },
  {
    accessorKey: "farm_code",
    header: "Farm Code"
  },
  {
    accessorKey: "sector_code",
    header: "Sector Code"
  },
  {
    accessorKey: "product_code",
    header: "Product Code"
  }
];
