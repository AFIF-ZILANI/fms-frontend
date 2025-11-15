"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type Shift = "Morning" | "Evening" | "Night";
type Status = "done" | "in_progress" | "missed";

export interface TaskItem {
  id: string;
  employee: string;
  shift: Shift;
  task: string;
  status: Status;
}

interface ShiftTaskStatusProps {
  data: TaskItem[];
  onViewAll?: () => void;
}

export function ShiftTaskStatus({ data }: ShiftTaskStatusProps) {
  const [filter, setFilter] = useState<Shift | "all">("all");

  const filteredData =
    filter === "all" ? data : data.filter((item) => item.shift === filter);

  const getStatusBadge = (status: Status) => {
    switch (status) {
      case "done":
        return (
          <Badge className="bg-green-500 hover:bg-green-600 w-20 font-semibold">
            Done
          </Badge>
        );
      case "in_progress":
        return (
          <Badge className="bg-yellow-500 hover:bg-yellow-600 w-20 font-semibold">
            In Progress
          </Badge>
        );
      case "missed":
        return (
          <Badge className="bg-red-500 hover:bg-red-600 w-20 font-semibold">
            Missed
          </Badge>
        );
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Shift & Task Status</CardTitle>
        <div className="space-x-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("all")}
          >
            All
          </Button>
          <Button
            variant={filter === "Morning" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("Morning")}
          >
            Morning
          </Button>
          <Button
            variant={filter === "Evening" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("Evening")}
          >
            Evening
          </Button>
          <Button
            variant={filter === "Night" ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter("Night")}
          >
            Night
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Shift</TableHead>
              <TableHead>Task</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center text-muted-foreground py-4"
                >
                  No tasks found.
                </TableCell>
              </TableRow>
            ) : (
              filteredData.slice(0, 8).map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.employee}</TableCell>
                  <TableCell>{item.shift}</TableCell>
                  <TableCell>{item.task}</TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex justify-end pt-3">
          <Link href={"/employee/tasks"}>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
