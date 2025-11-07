"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ContactMethod,
  SupplierRole,
  SupplierSupplyCategory,
} from "@/types/enum.type";
import { HoverAvatarEditButton } from "@/components/hover-avatar-edit-button";
import { Label } from "@/components/ui/label";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DisplaySupplier = {
  id: string;
  name: string;
  avatar: {
    public_id: string;
    image_url: string;
  };
  address: string;
  online_contact: ContactMethod[];
  email: string;
  mobile: string;
  company: string;
  type: SupplierSupplyCategory;
  role: SupplierRole;
  rating: number;
};

export const columns: ColumnDef<DisplaySupplier>[] = [
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
    accessorKey: "avatar",
    header: "Avatar",
    cell({ row }) {
      const data = row.original;
      return <HoverAvatarEditButton data={data} />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant={"ghost"}
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "mobile",
    header: "Mobile Number",
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "company",
    header: "Company",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "type",
    header: "Category",
  },
  {
    accessorKey: "online_contact",
    header: "Online Connectivity",
    cell: ({ row }) => (
      <div className="space-y-2">
        {row.original.online_contact &&
          row.original.online_contact.map((item) => (
            <Label key={item}>{item}</Label>
          ))}
      </div>
    ),
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
];
