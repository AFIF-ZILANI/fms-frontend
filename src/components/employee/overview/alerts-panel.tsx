import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { AlertItem, AlertList } from "./alert-list";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";

const alerts: AlertItem[] = [
  {
    id: "1",
    type: "ABSENCE",
    message: "2 workers absent without notice",
    date: new Date("2025-11-07"),
    status: "ACTIVE",
  },
  {
    id: "2",
    type: "PAYROLL",
    message: "3 payrolls pending for October",
    date: new Date("2025-11-05"),
    status: "ACTIVE",
  },
  {
    id: "6",
    type: "ABSENCE",
    message: "3 payrolls pending for October",
    date: new Date("2025-11-05"),
    status: "RESOLVED",
  },
  {
    id: "7",
    type: "PAYROLL",
    message: "3 payrolls pending for October",
    date: new Date("2025-11-05"),
    status: "ACTIVE",
  },
  {
    id: "3",
    type: "CONTRACT",
    message: "Contract for Supervisor Hasan ends in 5 days",
    date: new Date("2025-11-02"),
    status: "RESOLVED",
  },
  {
    id: "4",
    type: "SHIFT",
    message: "Shift swap requests pending approval",
    date: new Date("2025-11-10"),
    status: "RESOLVED",
  },
];

export default function AlertsPanel() {
  console.log(alerts.filter((alert) => alert.status === "RESOLVED"));
  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="ACTIVE">
          <CardHeader className="flex justify-between">
            <CardTitle>Employee Alert Pannel</CardTitle>
            <TabsList>
              <TabsTrigger value="ACTIVE">Active</TabsTrigger>
              <TabsTrigger value="RESOLVED">Resolved</TabsTrigger>
              <TabsTrigger value="ALL">All</TabsTrigger>
            </TabsList>
          </CardHeader>
          <TabsContent value="ACTIVE">
            <AlertList
              alerts={alerts.filter((alert) => alert.status === "ACTIVE")}
            />
          </TabsContent>
          <TabsContent value="RESOLVED">
            <AlertList
              alerts={alerts.filter((alert) => alert.status === "RESOLVED")}
            />
          </TabsContent>
          <TabsContent value="ALL">
            <AlertList alerts={alerts} />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href="/employees/alerts">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
