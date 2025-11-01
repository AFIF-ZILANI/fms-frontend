"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { SupplierSearch } from "@/components/user-search-auto-complete";
import { usePostData } from "@/lib/api-request";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { BirdBreed } from "@/types/enum.type";

// ---- VALIDATION SCHEMA ----
const formSchema = z.object({
  start_date: z.date(),
  expected_end_date: z.date(),
  breed: z.enum(BirdBreed),
  received_quantity: z.number().min(1, "Must be at least 1"),
  supplier_id: z.string(),
  house_no: z.number().min(1, "House number required"),
});

type FormData = z.infer<typeof formSchema>;

export default function BatchForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      start_date: undefined,
      expected_end_date: undefined,
      breed: undefined,
      received_quantity: undefined,
      supplier_id: "",
      house_no: undefined,
    },
  });

  const { mutate, data, isPending, isSuccess, isError, error } =
    usePostData("/batches/add");
  const router = useRouter();

  const onSubmit = (values: FormData) => {
    console.log("Form Data:", JSON.stringify(values));
    mutate(values);
  };

  useEffect(() => {
    console.log("Hello");
    if (isSuccess) {
      toast.success("New Batch Added Successfully!");
      // form.reset();
      router.push("/batch-management");
    }

    if (isError) {
      console.log(error);
      toast.error("Faild to Add New Batch!");
      // form.reset();
    }
  }, [isError, isSuccess, isPending, data]);

  return (
    <div className="flex min-h-screen mt-8 justify-center">
      <div className="container max-w-md mx-auto text-center space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Add New Batch</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to create a new batch.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 max-w-lg"
          >
            {/* Start Date */}
            <FormField
              control={form.control}
              name="start_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="pl-3 text-left font-normal"
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Expected End Date */}
            <FormField
              control={form.control}
              name="expected_end_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Expected End Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className="pl-3 text-left font-normal"
                        >
                          {field.value
                            ? format(field.value, "PPP")
                            : "Pick a date"}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent align="start" className="p-0">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Breed */}
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breed</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Bird Breed" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.values(BirdBreed).map((breed) => (
                        <SelectItem key={breed} value={breed}>
                          {breed.charAt(0) +
                            breed.slice(1).toLowerCase().replace("_", " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Received Quantity */}
            <FormField
              control={form.control}
              name="received_quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Received Quantity</FormLabel>
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

            {/* Supplier */}
            <FormField
              control={form.control}
              name="supplier_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Supplier</FormLabel>
                  <SupplierSearch
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* House No */}
            <FormField
              control={form.control}
              name="house_no"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House No</FormLabel>
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

            <Button type="submit" className="w-full">
              {isPending ? (
                <>
                  <Spinner />
                  Submiting...
                </>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
