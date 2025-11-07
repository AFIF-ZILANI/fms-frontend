"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, AlertTriangle, BarChart3 } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { IItem } from "@/types";
import { ResourceCategory } from "@/types/enum.type";

const categoryColors: Record<ResourceCategory, string> = {
  [ResourceCategory.FEED]: "#4F46E5",
  [ResourceCategory.MEDICINE]: "#10B981",
  [ResourceCategory.CHICKS]: "#F59E0B",
  [ResourceCategory.HUSK]: "#FB7185",
  [ResourceCategory.EQUIPMENT]: "#8B5CF6",
  [ResourceCategory.UTILITIES]: "#0EA5E9",
  [ResourceCategory.SALARY]: "#EF4444",
  [ResourceCategory.TRANSPORTATION]: "#14B8A6",
  [ResourceCategory.MAINTENANCE]: "#A855F7",
  [ResourceCategory.CLEANING_SUPPLIES]: "#84CC16",
  [ResourceCategory.OTHER]: "#9CA3AF",
};

export function StockDistribution({ data }: { data: IItem[] }) {
  const [viewMode, setViewMode] = useState<"category" | "item">("category");
  const [metricMode, setMetricMode] = useState<"quantity" | "value" | "both">(
    "quantity"
  );
  const [selectedCategory, setSelectedCategory] = useState<
    ResourceCategory | "ALL"
  >("ALL");

  // --- Data Aggregation ---
  const aggregatedByCategory = useMemo(() => {
    const grouped: Record<
      string,
      { quantity: number; value: number; fill: string }
    > = {};

    for (const item of data) {
      const cat = item.category;
      const qty = item.stock_quantity;
      const val = item.stock_quantity * item.unit_price;

      if (!grouped[cat]) {
        grouped[cat] = { quantity: 0, value: 0, fill: categoryColors[cat] };
      }
      grouped[cat].quantity += qty;
      grouped[cat].value += val;
    }

    return Object.entries(grouped).map(([cat, { quantity, value, fill }]) => ({
      name: cat.replaceAll("_", " "),
      quantity,
      value,
      fill,
    }));
  }, [data]);

  const detailedByItem = useMemo(() => {
    const filtered =
      selectedCategory === "ALL"
        ? data
        : data.filter((d) => d.category === selectedCategory);

    return filtered
      .map((item) => ({
        name: item.name,
        quantity: item.stock_quantity,
        value: item.stock_quantity * item.unit_price,
        category: item.category,
        fill: categoryColors[item.category],
      }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 30);
  }, [data, selectedCategory]);

  const chartData =
    viewMode === "category" ? aggregatedByCategory : detailedByItem;
  const noData = chartData.length === 0;

  return (
    <Card className="w-full bg-card shadow-md p-6">
      <CardHeader className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div>
          <CardTitle className="font-semibold text-lg flex items-center gap-2">
            <BarChart3 className="w-5 h-5 mr-2 text-indigo-600 dark:text-indigo-400" />
            Stock Distribution (Quantity & Value)
          </CardTitle>
          <CardDescription>
            Explore current stock distribution by category or item.
          </CardDescription>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* View Mode */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {viewMode === "category" ? "By Category" : "By Item"}
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <DropdownMenuItem
                onClick={() => setViewMode("category")}
                className={
                  viewMode === "category" ? "font-semibold bg-muted" : ""
                }
              >
                📊 By Category
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setViewMode("item")}
                className={viewMode === "item" ? "font-semibold bg-muted" : ""}
              >
                📦 By Item
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Metric Mode */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                {metricMode === "quantity"
                  ? "Show Quantity"
                  : metricMode === "value"
                  ? "Show Value"
                  : "Show Both"}
                <ChevronDown className="h-4 w-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-44">
              <DropdownMenuItem
                onClick={() => setMetricMode("quantity")}
                className={
                  metricMode === "quantity" ? "font-semibold bg-muted" : ""
                }
              >
                📦 Quantity
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setMetricMode("value")}
                className={
                  metricMode === "value" ? "font-semibold bg-muted" : ""
                }
              >
                💰 Value
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setMetricMode("both")}
                className={
                  metricMode === "both" ? "font-semibold bg-muted" : ""
                }
              >
                ⚖️ Both
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Category Filter */}
          {viewMode === "item" && (
            <Select
              value={selectedCategory}
              onValueChange={(val) =>
                setSelectedCategory(val as ResourceCategory | "ALL")
              }
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Categories</SelectItem>
                {Object.keys(ResourceCategory).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat.replaceAll("_", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </CardHeader>

      {noData ? (
        <div className="flex flex-col items-center justify-center h-[400px] text-center text-muted-foreground">
          <AlertTriangle className="h-12 w-12 mb-3 text-yellow-500" />
          <p className="text-base font-medium">No stock data available.</p>
          <p className="text-sm opacity-80">
            Try changing category, view, or metric filters.
          </p>
        </div>
      ) : (
        <CardContent className="h-[600px] flex">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              layout="vertical"
              data={chartData}
              barCategoryGap="30%"
              margin={{ right: 40 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#e5e7eb"
              />

              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "var(--foreground)" }}
                tickFormatter={(v) =>
                  metricMode === "value" || metricMode === "both"
                    ? `৳${v.toLocaleString()}`
                    : v.toLocaleString()
                }
              />

              <YAxis
                dataKey="name"
                type="category"
                width={200}
                tickLine={false}
                tick={({ x, y, payload }) => {
                  const name = payload.value;
                  const truncated =
                    name.length > 22 ? `${name.slice(0, 22)}…` : name;
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <title>{name}</title>
                      <text
                        x={0}
                        y={0}
                        dy={5}
                        textAnchor="end"
                        fontSize={13}
                        fontWeight={500}
                        fill="var(--foreground)"
                      >
                        {truncated}
                      </text>
                    </g>
                  );
                }}
              />

              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0].payload;
                  return (
                    <div className="bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-600">
                      <div className="font-semibold text-base">{item.name}</div>
                      {item.category && (
                        <div className="text-sm mb-1">
                          Category: {item.category.replaceAll("_", " ")}
                        </div>
                      )}
                      <div className="text-sm font-medium">
                        Quantity: {item.quantity.toLocaleString()}
                      </div>
                      <div className="text-sm font-medium">
                        Value: ৳{item.value.toLocaleString()}
                      </div>
                    </div>
                  );
                }}
              />

              {metricMode !== "value" && (
                <Bar
                  dataKey="quantity"
                  name="Quantity"
                  fill="#3B82F6"
                  radius={[0, 4, 4, 0]}
                >
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} />
                  ))}
                </Bar>
              )}

              {metricMode !== "quantity" && (
                <Bar
                  dataKey="value"
                  name="Value (৳)"
                  fill="rgba(99,102,241,0.7)"
                  radius={[0, 4, 4, 0]}
                >
                  {chartData.map((entry, i) => (
                    <Cell key={i} fill={entry.fill} opacity={0.8} />
                  ))}
                </Bar>
              )}

              {metricMode === "both" && <Legend />}
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      )}
    </Card>
  );
}
