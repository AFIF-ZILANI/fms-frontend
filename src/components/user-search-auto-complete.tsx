"use client";

import { useEffect, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetData } from "@/lib/api-request";
import { cn } from "@/lib/utils";

type Supplier = {
  id: string;
  avatar?: string;
  name: string;
  company?: string;
};

type SupplierSearchProps = {
  value?: string;
  onChange: (value: string) => void;
};

export function SupplierSearch({ onChange }: SupplierSearchProps) {
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [allSuppliers, setAllSuppliers] = useState<Supplier[]>([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Fetch all suppliers once (for initial dropdown)
  const {
    data: allData,
    isLoading: isLoadingAll,
    isSuccess,
  } = useGetData("/suppliers/list");
  const { data: searchData, isLoading: isSearching, isSuccess:isSearched } = useGetData(
    debouncedQuery ? `/suppliers?search=${debouncedQuery}` : ""
  );

  // Initial load
  useEffect(() => {
    if (allData && isSuccess) setAllSuppliers((allData as any).data);
  }, [allData, isSuccess]);

  // Debounce search input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query.trim()), 300);
    return () => clearTimeout(timer);
  }, [query]);

  // Filter local suppliers first
  useEffect(() => {
    if (!query.trim()) {
      setFilteredSuppliers(allSuppliers);
      return;
    }

    const localMatches = allSuppliers.filter((s) =>
      [s.name, s.company].some((field) =>
        field?.toLowerCase().includes(query.toLowerCase())
      )
    );

    if (localMatches.length > 0) {
      setFilteredSuppliers(localMatches);
    } else if (searchData && isSearched) {
      // No local matches → show server results
      setFilteredSuppliers((searchData as any).data);
    }
  }, [query, allSuppliers, searchData, isSearched]);

  const handleSelect = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setQuery(supplier.name);
    setShowList(false);
    onChange(supplier.id);
  };

  const highlightText = (text: string, search: string) => {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="text-blue-600 font-semibold">
          {part}
        </span>
      ) : (
        <span key={i} className="text-gray-700">{part}</span>
      )
    );
  };

  const showDropdown = useMemo(
    () =>
      showList && (isLoadingAll || isSearching || filteredSuppliers.length > 0),
    [showList, isLoadingAll, isSearching, filteredSuppliers]
  );

  return (
    <div className="relative w-full">
      <div className="relative" onClick={() => setShowList(true)}>
        <Input
          placeholder="Select supplier..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setShowList(true)}
          onBlur={() => setTimeout(() => setShowList(false), 200)}
        />
      </div>

      {showDropdown && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200  rounded-md shadow-lg max-h-64 overflow-y-auto">
          {isLoadingAll || isSearching ? (
            <div className="p-3 text-gray-500 text-sm text-center">
              Loading…
            </div>
          ) : filteredSuppliers.length === 0 ? (
            <div className="p-3 text-gray-500 text-sm text-center">
              No suppliers found
            </div>
          ) : (
            filteredSuppliers.map((s) => (
              <div
                key={s.id}
                onClick={() => handleSelect(s)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100",
                  selectedSupplier?.id === s.id && "bg-gray-100"
                )}
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage src={s.avatar} alt={s.name} />
                  <AvatarFallback>{s.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm">
                    {highlightText(s.name, query)}
                  </span>
                  {s.company && (
                    <span className="text-xs text-gray-600">
                      {highlightText(s.company, query)}
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
