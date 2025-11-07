"use client";
import React, { useEffect, useState } from "react";
import { CardsComp } from "@/components/stock-inventory/cards-comp";
import { DataTableComp } from "@/components/table-data";
import { useGetData } from "@/lib/api-request";
import { columns, DisplayItem } from "./detail-stock-column";
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import { StockDistribution } from "@/components/chart/stock-distribution";
import { UrgentDataTable } from "./urgent-data-table";
import {
  DisplayUrgentItem,
  columns as urgentColumn,
} from "./urgent-stock-column";
import { StockSummary } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table2 } from "lucide-react";

// --- 5. MAIN APP COMPONENT ---

const App: React.FC = () => {
  const [skip, setSkip] = useState(0);
  const [cardSummaryData, setCardSummaryData] = useState<StockSummary>({
    total_stock_value: 0,
    total_items_in_stock: 0,
    low_stock_alerts: 0,
    total_purchases: 0,
    total_sales: 0,
    critical_items: 0,
  });
  const [tableData, setTableData] = useState<DisplayItem[]>([]);
  const [urgentTableData, setUrgentTableData] = useState<DisplayUrgentItem[]>(
    []
  );
  const [sortingMain, setSortingMain] = useState<SortingState>([]);
  const [sortingUrgent, setSortingUrgent] = useState<SortingState>([]);
  const [filtersMain, setFiltersMain] = useState<ColumnFiltersState>([]);
  const [filtersUrgent, setFiltersUrgent] = useState<ColumnFiltersState>([]);

  const {
    data: detailStockData,
    isPending: detailStockIsPending,
    isSuccess: detailStockIsSuccess,
    refetch: detailStockRefetch,
    isError: detailStockIsError,
    isFetching: detailStockIsFetching,
    error: detailStockError,
  } = useGetData(
    `/get-table-data?category=inventory&skip=${
      skip * 20
    }&item=detail-stock-ledger`
  );
  const {
    data: urgentReorderData,
    isSuccess: urgentReorderIsSuccess,
    isPending: urgentReorderIsPending,
    isError: urgentReorderIsError,
    error: urgentReorderError,
  } = useGetData(`/get-table-data?category=inventory&item=urgent-reorder-list`);
  const {
    data: stockSummaryCardData,
    isSuccess: stockSummaryCardIsSuccess,
    isPending: stockSummaryCardIsPending,
    isError: stockSummaryCardIsError,
    error: stockSummaryCardError,
  } = useGetData(`/get-table-data?category=inventory&item=stock-summary`);
  const [columnVisibilityMain, setColumnVisibilityMain] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable<DisplayItem>({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSortingMain,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setFiltersMain,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibilityMain,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting: sortingMain,
      columnFilters: filtersMain,
      columnVisibility: columnVisibilityMain,
      rowSelection,
    },
  });

  const urgentTable = useReactTable<DisplayUrgentItem>({
    data: urgentTableData,
    columns: urgentColumn,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSortingUrgent,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setFiltersUrgent,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sortingUrgent,
      columnFilters: filtersUrgent,
    },
  });

  useEffect(() => {
    if (detailStockIsSuccess && detailStockData) {
      console.log("Details Stock Data:", detailStockData);
      setTableData((detailStockData as any).data);
    }
    if (!detailStockIsSuccess && detailStockIsError) {
      console.error("Error fetching detail stock data:", detailStockError);
    }
  }, [
    detailStockData,
    detailStockIsSuccess,
    detailStockIsError,
    detailStockError,
  ]);

  useEffect(() => {
    if (urgentReorderIsSuccess && urgentReorderData) {
      setUrgentTableData((urgentReorderData as any).data);
    }
    if (!urgentReorderIsSuccess && urgentReorderIsError) {
      console.error("Error fetching urgent reorder data:", urgentReorderError);
    }
  }, [
    urgentReorderData,
    urgentReorderIsSuccess,
    urgentReorderIsError,
    urgentReorderError,
  ]);

  useEffect(() => {
    console.log("Stock Summary Data:", stockSummaryCardData);
    if (stockSummaryCardIsSuccess && stockSummaryCardData) {
      setCardSummaryData((stockSummaryCardData as any).data[0] as StockSummary);
    }

    if (!stockSummaryCardIsSuccess && stockSummaryCardIsError) {
      console.error(
        "Error fetching stock summary card data:",
        stockSummaryCardError
      );
    }
  }, [
    stockSummaryCardData,
    stockSummaryCardIsSuccess,
    stockSummaryCardIsError,
    stockSummaryCardError,
  ]);
  return (
    // Apply the 'dark' class conditionally for the CSS variable override
    <div className={`min-h-screen`}>
      <div className="min-h-screen p-4 sm:p-8 font-sans transition-colors duration-300 bg-background text-foreground">
        <header className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-border pb-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Poultry Farm Inventory & Resource Management
            </h1>
          </div>
        </header>

        {/* 1. Metric Cards Grid */}

        <CardsComp
          data={cardSummaryData}
          isLoading={stockSummaryCardIsPending}
        />

        {/* 2. Main Content: Charts and Table */}
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardContent>
              <CardHeader>
                <div className="flex flex-col gap-3 mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Table2 className="w-5 h-5 mr-2 text-red-600 dark:text-red-400" />
                    Detailed Stock Ledger
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive list of all inventory items with current stock
                    levels.
                  </p>
                </div>
              </CardHeader>
              <DataTableComp
                table={table}
                columns={columns}
                setSkip={setSkip}
                refetchFn={detailStockRefetch}
                setTableData={setTableData}
                isFetching={detailStockIsFetching}
                removeRowEndpoint={"/inventory/remove-items"}
              />
            </CardContent>
          </Card>

          <StockDistribution data={tableData} />
          <UrgentDataTable
            columns={urgentColumn}
            table={urgentTable}
            tableData={urgentTableData}
            isLoading={urgentReorderIsPending}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
