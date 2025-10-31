"use client";

import { ColumnDef } from "@tanstack/react-table";

import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ContactMethod, EmployeeRole } from "@/types/enum.type";
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
  role: EmployeeRole;
  salary: number;
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
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "salary",
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="flex items-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Salary
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
    cell: ({ row }) => {
      const salary = row.getValue("salary");
      if (salary == null || salary === "")
        return <div className="text-right">—</div>;

      const salaryString = Number(salary).toLocaleString("en-BD", {
        style: "currency",
        currency: "BDT",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });

      const formatted = salaryString.replace("BDT", "৳");

      return <div className="text-right font-medium">{formatted}</div>;
    },
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
