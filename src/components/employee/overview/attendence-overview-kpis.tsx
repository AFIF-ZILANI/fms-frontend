"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { UserCheck, UserX, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import CountUp from "../../effects/count-up";
import { Label } from "../../ui/label";

type AttendanceData = {
  best_attendence: {
    name: string;
    attendence: number;
  };
  worst_attendence: {
    name: string;
    attendence: number;
  };
  avarage_attendence: number;
};

export function AttendanceCards({ data }: { data: AttendanceData }) {
  const cards = [
    {
      title: "Best Attendance",
      value: data.best_attendence.attendence,
      description: data.best_attendence.name,
      icon: UserCheck,
      color: "text-emerald-600",
    },
    {
      title: "Worst Attendance",
      value: data.worst_attendence.attendence,
      description: data.worst_attendence.name,
      icon: UserX,
      color: "text-red-500",
    },
    {
      title: "Average Attendance",
      value: data.avarage_attendence,
      description: "Overall average across all employees",
      icon: Users,
      color: "text-blue-500",
    },
  ];

  return (
    <div className="w-full">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {cards.map((item, index) => (
          <Card
            key={index}
            className={cn(
              "border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-all duration-200 bg-white/80 dark:bg-neutral-900/60 backdrop-blur"
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <CardTitle className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {item.title}
              </CardTitle>
              <item.icon className={cn("h-5 w-5", item.color)} />
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
                <CountUp
                  from={0}
                  to={item.value}
                  duration={1.2}
                  separator=","
                  className="count-up-text"
                />
                <span className="text-base ml-1 text-gray-500">%</span>
              </div>
              <CardDescription className="text-sm mt-1 text-gray-500 dark:text-gray-400">
                {item.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import Link from "next/link";
import { Button } from "../../ui/button";

export default function AttendenceKPIs() {
  return (
    <Card>
      <CardContent>
        <Tabs defaultValue="WEEK">
          <CardHeader className="flex justify-between">
            <CardTitle>Attendence Overview</CardTitle>
            <TabsList className=" inline">
              <TabsTrigger value="TODAY">Toady</TabsTrigger>
              <TabsTrigger value="WEEK">Week</TabsTrigger>
              <TabsTrigger value="MONTH">Month</TabsTrigger>
              <TabsTrigger value="YEAR">Year</TabsTrigger>
            </TabsList>
          </CardHeader>
          <TabsContent value="TODAY">
            <AttendanceCards
              data={{
                avarage_attendence: 91,
                best_attendence: { name: "AFIF ZILANI", attendence: 99 },
                worst_attendence: {
                  name: "Dholu Vai",
                  attendence: 45,
                },
              }}
            />
          </TabsContent>
          <TabsContent value="WEEK">
            <AttendanceCards
              data={{
                avarage_attendence: 80,
                best_attendence: { name: "Nairobi", attendence: 88 },
                worst_attendence: {
                  name: "Dholu",
                  attendence: 40,
                },
              }}
            />
          </TabsContent>
          <TabsContent value="MONTH">
            <AttendanceCards
              data={{
                avarage_attendence: 71,
                best_attendence: { name: "AFIF ZILANI", attendence: 89 },
                worst_attendence: {
                  name: "Moga Vai",
                  attendence: 50,
                },
              }}
            />
          </TabsContent>
          <TabsContent value="YEAR">
            <AttendanceCards
              data={{
                avarage_attendence: 90,
                best_attendence: { name: "Bandorni", attendence: 90 },
                worst_attendence: {
                  name: "Dholu Vai",
                  attendence: 40,
                },
              }}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href="/employees/attendence">
          <Button variant="outline" size="sm">
            View All
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
