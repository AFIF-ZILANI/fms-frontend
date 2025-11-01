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
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showList, setShowList] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

  const { data, isLoading } = useGetData(
    debouncedQuery ? `/suppliers?search=${debouncedQuery}` : ""
  );

  // Debounce input (300ms)
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(query), 300);
    if (data) {
      setSuppliers((data as any).data);
      console.log(data);
    }
    return () => clearTimeout(timer);
  }, [query, data]);

  const handleSelect = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setQuery(supplier.name);
    onChange(supplier.id);
    setShowList(false);
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
        <span className="text-black" key={i}>{part}</span>
      )
    );
  };

  const showDropdown = useMemo(
    () =>
      showList &&
      (isLoading || suppliers.length > 0 || debouncedQuery.length > 0),
    [showList, isLoading, suppliers, debouncedQuery]
  );

  return (
    <div className="relative w-full">
      <Input
        placeholder="Search supplier..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowList(true);
        }}
        onFocus={() => setShowList(true)}
        onBlur={() => setTimeout(() => setShowList(false), 200)}
      />

      {showDropdown && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-gray-500 text-sm text-center">
              Searching…
            </div>
          ) : suppliers.length === 0 ? (
            <div className="p-3 text-gray-500 text-sm text-center">
              No suppliers found
            </div>
          ) : (
            suppliers.length &&
            suppliers.map((s) => (
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
                <div className="flex items-center justify-around gap-8">
                  <span className="text-sm">
                    {highlightText(s.name, debouncedQuery)}
                  </span>
                  {s.company && (
                    <span className="text-xs text-gray-600">
                      {highlightText(s.company, debouncedQuery)}
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
