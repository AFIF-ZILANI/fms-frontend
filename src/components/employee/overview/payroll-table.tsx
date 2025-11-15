"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { columns } from "./payroll-column";
import { DisplayPayroll } from "./payroll-column";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { Label } from "../../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";

interface DataTableProps {
  tableData: DisplayPayroll[];
}

export function PayrollTable({ tableData }: DataTableProps) {
  const table = useReactTable<DisplayPayroll>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Card className="overflow-hidden rounded-md border p-6">
      <CardContent>
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
      </CardContent>
    </Card>
  );
}

export default function Payroll({
  tableData,
}: {
  tableData: { month: DisplayPayroll[]; year: DisplayPayroll[] };
}) {
  const [type, setType] = useState<"MONTH" | "YEAR">("MONTH");
  const title =
    type === "MONTH" ? "Monthly Payroll Overview" : "Yearly Payroll Overview";
  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="MONTH">
          <CardHeader className="flex justify-between">
            <CardTitle>{title}</CardTitle>
            <TabsList>
              <TabsTrigger value="MONTH" onClick={() => setType("MONTH")}>
                Month
              </TabsTrigger>
              <TabsTrigger value="YEAR" onClick={() => setType("YEAR")}>
                Year
              </TabsTrigger>
            </TabsList>
          </CardHeader>
          <TabsContent value="MONTH">
            <PayrollTable tableData={tableData.month} />
          </TabsContent>
          <TabsContent value="YEAR">
            <PayrollTable tableData={tableData.year} />
          </TabsContent>
        </Tabs>
      </CardContent>
        <CardFooter className="flex justify-end">
          <Link href="/employee/payroll">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardFooter>
    </Card>
  );
}
