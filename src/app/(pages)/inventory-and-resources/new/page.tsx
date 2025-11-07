"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SupplierSearch } from "@/components/user-search-auto-complete";
import { usePostData } from "@/lib/api-request";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";

// ✅ Schema validation
const itemSchema = z.object({
  name: z.string().min(2, "Item name is required"),
  description: z.string().optional(),
  supplier: z.string().min(1, "Supplier is required"),
  stock_quantity: z
    .string()
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Invalid quantity"),
  unit_price: z
    .string()
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, "Invalid price"),
  reorder_level: z
    .string()
    .refine(
      (v) => !isNaN(Number(v)) && Number(v) >= 0,
      "Invalid reorder level"
    ),
  is_consumeable: z.boolean(),
});

type ItemFormValues = z.infer<typeof itemSchema>;

export default function Page() {
  const router = useRouter();
  const { isSuccess, isError, isPending, error } = usePostData(
    "/inventory/items/add"
  );
  const form = useForm<ItemFormValues>({
    resolver: zodResolver(itemSchema),
    defaultValues: {
      name: "",
      description: "",
      supplier: "",
      stock_quantity: "",
      unit_price: "",
      reorder_level: "",
      is_consumeable: false,
    },
  });

  const onSubmit = async (data: ItemFormValues) => {
    console.log("Form submitted:", data);
    // TODO: call your API endpoint
  };
  useEffect(() => {
    if (isSuccess) {
      toast.success("Item added successfully!");
      form.reset();
      router.push("/inventory-and-resources");
    } else if (isError) {
      toast.error(
        `Error adding item: ${
          (error as any)?.message || "Unknown error occurred"
        }`
      );
    }
  }, [isSuccess, isError, isPending, error]);
  return (
    <div className="w-full flex justify-center p-6">
      <div className="w-full max-w-lg space-y-6 p-8 rounded-2xl shadow-sm border bg-background">
        <h1 className="text-xl font-semibold text-foreground">Add New Item</h1>
        <p className="text-sm text-muted-foreground">
          Fill in the details below to add a new stock item.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Item Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter item name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Optional short description"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Optional note about the item.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Supplier */}
            <FormField
              control={form.control}
              name="supplier"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <FormControl>
                    <SupplierSearch
                      onChange={(value) => field.onChange(value)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Numeric Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stock_quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        pattern="[0-9]*"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          // Allow only digits
                          if (/^\d*$/.test(val)) {
                            field.onChange(val === "" ? "" : Number(val));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unit_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Unit Price (BDT)</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        pattern="[0-9]*"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          // Allow only digits
                          if (/^\d*$/.test(val)) {
                            field.onChange(val === "" ? "" : Number(val));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reorder_level"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reorder Level</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        inputMode="numeric"
                        placeholder="0"
                        pattern="[0-9]*"
                        {...field}
                        value={field.value || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          // Allow only digits
                          if (/^\d*$/.test(val)) {
                            field.onChange(val === "" ? "" : Number(val));
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Checkbox */}
              <FormField
                control={form.control}
                name="is_consumeable"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 mt-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(checked as boolean)
                        }
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      Is Consumable
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="outline"
                type="button"
                onClick={() => {
                  form.reset();
                  router.back();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {isPending ? (
                  <>
                    <Spinner />
                    <span>Submiting...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
