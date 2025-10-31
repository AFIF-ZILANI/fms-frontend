"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ReferenceLine } from "recharts"
import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

const chartData = [
  { batch: "2501", bird_count: 15000, mortality: 280, sold_first_class: 14690, sold_second_cllass: 30 },
  { batch: "2502", bird_count: 15000, mortality: 310, sold_first_class: 14660, sold_second_cllass: 30 },
  { batch: "2503", bird_count: 15000, mortality: 290, sold_first_class: 14680, sold_second_cllass: 30 },
  { batch: "2504", bird_count: 15000, mortality: 260, sold_first_class: 14710, sold_second_cllass: 30 },
  { batch: "2505", bird_count: 15000, mortality: 320, sold_first_class: 14650, sold_second_cllass: 30 },
  { batch: "2506", bird_count: 15000, mortality: 270, sold_first_class: 14700, sold_second_cllass: 30 },
  { batch: "2507", bird_count: 15000, mortality: 300, sold_first_class: 14670, sold_second_cllass: 30 },
  { batch: "2508", bird_count: 15000, mortality: 280, sold_first_class: 14690, sold_second_cllass: 30 },
  { batch: "2509", bird_count: 15000, mortality: 260, sold_first_class: 14710, sold_second_cllass: 30 },
  { batch: "2510", bird_count: 15000, mortality: 300, sold_first_class: 14670, sold_second_cllass: 30 },
]

type MetricKey = "mortality" | "sold_first_class" | "sold_second_cllass" | "bird_count";

const chartConfig: Record<MetricKey, { label: string; color: string }> = {
  mortality: { label: "Mortality", color: "#EF4444" },
  sold_first_class: { label: "Sold (1st Class)", color: "#10B981" },
  sold_second_cllass: { label: "Sold (2nd Class)", color: "#F59E0B" },
  bird_count: { label: "Bird Count", color: "#3B82F6" },
};


export function ProductionAnalyticsChart() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("1y")

  // mock filter by time range
  const filteredData = React.useMemo(() => {
    if (timeRange === "6m") return chartData.slice(-6)
    if (timeRange === "1y") return chartData.slice(-10)
    return chartData
  }, [timeRange])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Production Analytics</CardTitle>
        <CardDescription>Batch-wise performance overview</CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden @[767px]/card:flex"
          >
            <ToggleGroupItem value="6m">Last 6 months</ToggleGroupItem>
            <ToggleGroupItem value="1y">Last 1 year</ToggleGroupItem>
            <ToggleGroupItem value="3y">Last 3 years</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40 @[767px]/card:hidden" size="sm">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last 1 year</SelectItem>
              <SelectItem value="3y">Last 3 years</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillMortality" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.05} />
              </linearGradient>
              <linearGradient id="fillFirstClass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" opacity={0.4} />
            <XAxis
              dataKey="batch"
              tickMargin={10}
              tickFormatter={(v) => `Batch ${v}`}
            />
            <YAxis domain={['dataMin - 200', 'dataMax + 200']} />
            <ChartTooltip
  cursor={{ strokeDasharray: "3 3" }}
  content={
    <ChartTooltipContent
      indicator="dot"
      formatter={(val, name) => {
        const key = name as MetricKey;
        return [`${val}`, chartConfig[key].label];
      }}
    />
  }
/>

            {/* Reference line for total capacity */}
            <ReferenceLine
              y={15000}
              stroke={chartConfig.bird_count.color}
              strokeDasharray="4 4"
              label={{
                position: "right",
                value: "Total Capacity",
                fill: chartConfig.bird_count.color,
                fontSize: 12,
              }}
            />
            <Area
              dataKey="sold_first_class"
              type="monotone"
              fill="url(#fillFirstClass)"
              stroke="hsl(var(--primary))"
              strokeWidth={2.5}
              fillOpacity={0.25}
            />
            <Area
              dataKey="mortality"
              type="monotone"
              fill="url(#fillMortality)"
              stroke="hsl(var(--destructive))"
              strokeWidth={2.5}
              fillOpacity={0.25}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
