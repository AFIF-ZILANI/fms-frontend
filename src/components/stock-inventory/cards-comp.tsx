/**
 *
 * -------------- Dashboard Cards -------------------
 * 🧱 Total Stock Value — sum of all current stock × unit price
 * 📦 Total Items in Stock — number of unique items
 * ⚠️ Low Stock Alerts — count of items below reorder level
 * 🛒 Total Purchases (This Month)
 * 💸 Total Sales (This Month)
 */

import React from "react";
import { DashboardCard } from "../dashboard-card";
import {
  DollarSign,
  Archive,
  AlertTriangle,
  ShoppingCart,
  TrendingUp,
} from "lucide-react";
import { formatCurrency } from "@/lib/string-utils";
import { StockSummary } from "@/types";

export function CardsComp<T>({
  data,
  isLoading,
}: {
  data: StockSummary;
  isLoading: boolean;
}) {
  const {
    total_stock_value,
    total_items_in_stock,
    low_stock_alerts,
    total_purchases,
    total_sales,
    critical_items,
  } = data;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {/* 💰 Total Stock Value */}
      <DashboardCard
        title="Total Stock Value"
        value={formatCurrency(total_stock_value)}
        icon={<DollarSign className="w-5 h-5 text-green-600" />}
        description="Total worth of all current inventory based on unit prices."
        isLoading={isLoading}
      />

      {/* ⚠️ Low Stock Alerts */}
      <DashboardCard
        title="Low Stock Alerts"
        value={low_stock_alerts.toString()}
        icon={<AlertTriangle className="w-5 h-5 text-orange-500" />}
        isLoading={isLoading}
        description={
          low_stock_alerts > 0
            ? "Items running low, consider reordering soon."
            : "All stock levels are healthy."
        }
        className={low_stock_alerts > 0 ? "ring-2 ring-orange-500/50" : ""}
      />

      {/* 🚨 Critical Items */}
      <DashboardCard
        title="Critical Items (Zero Stock)"
        value={critical_items.toString()}
        icon={<AlertTriangle className="w-5 h-5 text-red-600" />}
        isLoading={isLoading}
        description={
          critical_items > 0
            ? "Immediate purchase required for these items."
            : "No items at zero stock."
        }
        className={
          critical_items > 0
            ? "ring-4 ring-red-500/50"
            : "ring-2 ring-green-500/50"
        }
      />

      {/* 📦 Total Items in Stock */}
      <DashboardCard
        title="Total Items in Stock"
        value={total_items_in_stock.toLocaleString()}
        icon={<Archive className="w-5 h-5 text-blue-600" />}
        isLoading={isLoading}
        description="Number of unique items currently available in inventory."
      />

      {/* 🛒 Total Purchases */}
      <DashboardCard
        title="Total Purchases (This Month)"
        value={formatCurrency(total_purchases)}
        isLoading={isLoading}
        icon={<ShoppingCart className="w-5 h-5 text-indigo-600" />}
        description="Total value of purchases made this month."
      />

      {/* 💸 Total Sales */}
      <DashboardCard
        title="Total Sales (This Month)"
        value={formatCurrency(total_sales)}
        isLoading={isLoading}
        icon={<TrendingUp className="w-5 h-5 text-emerald-600" />}
        description="Total value of sales completed this month."
      />
    </div>
  );
}
