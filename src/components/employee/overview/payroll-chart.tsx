"use client";

import { TrendingDown, TrendingUp } from "lucide-react";
import { Label, Pie, PieChart, Sector } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

const chartConfig = {
  value: {
    label: "Value",
  },
  paid: {
    label: "Paid",
    color: "var(--chart-1)",
  },
  pending: {
    label: "Pending",
    color: "var(--chart-2)",
  },
  total: {
    label: "Total",
    color: "var(--chart-3)",
  },
} satisfies ChartConfig;

export function PayrollDonutChart({
  data,
  time,
}: {
  data: {
    paid: number;
    unpaid: number;
    total: number;
    pending: number;
    growth: number;
    type: "MONTH" | "YEAR";
  };
  time: string;
}) {
  const chartData = [
    { label: "Paid", value: data.paid, fill: "#8EC5FF" },
    { label: "Pending", value: data.pending, fill: "#2B7FFF" },
    { label: "Unpaid", value: data.unpaid, fill: "#193CB9 " },
    { label: "Total", value: data.total, fill: "#1447E6" },
  ];
  const title =
    data.type === "MONTH"
      ? "Monthly Payroll Overview"
      : "Yearly Payroll Overview";
  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{time}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
              activeIndex={0}
              activeShape={({
                outerRadius = 0,
                ...props
              }: PieSectorDataItem) => (
                <Sector {...props} outerRadius={outerRadius + 10} />
              )}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col gap-2 text-sm">
        <div
          className={`flex items-center gap-2 leading-none font-medium ${
            data.growth >= 0 ? "text-emerald-600" : "text-red-500"
          }`}
        >
          {data.growth >= 0 ? (
            <>
              Payroll up by {data.growth}% this {data.type.toLowerCase()}
              <TrendingUp className="h-4 w-4" />
            </>
          ) : (
            <>
              Payroll down by {Math.abs(data.growth)}% this{" "}
              {data.type.toLowerCase()}
              <TrendingDown className="h-4 w-4" />
            </>
          )}
        </div>
        <div className="text-muted-foreground text-center leading-none">
          Showing payroll performance for <br/>{time}
        </div>
      </CardFooter>
    </Card>
  );
}

export default function PayrollChart() {
  return (
    <div className="max-w-xs">
      <Tabs defaultValue="MONTH">
        <TabsList>
          <TabsTrigger value="MONTH">Month</TabsTrigger>
          <TabsTrigger value="YEAR">Year</TabsTrigger>
        </TabsList>
        <TabsContent value="MONTH">
          <PayrollDonutChart
            time="January - June 2024"
            data={{
              paid: 1000,
              unpaid: 500,
              pending: 400,
              total: 1900,
              growth: 10,
              type: "MONTH",
            }}
          />
        </TabsContent>
        <TabsContent value="YEAR">
          <PayrollDonutChart
            time="2024 - 2025"
            data={{
              paid: 10000,
              unpaid: 5000,
              pending: 4000,
              total: 19000,
              growth: -3,
              type: "YEAR",
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
