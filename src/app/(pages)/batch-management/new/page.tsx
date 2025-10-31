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
import { toast } from "sonner";

// ---- ENUM ----
const birdBreeds = [
  "Classic Cock",
  "Hibreed",
  "Pakisthani",
  "Kedarnath",
  "Faomi",
  "Tiger",
] as const;

// ---- VALIDATION SCHEMA ----
const formSchema = z.object({
  batch_name: z.string().min(1, "Batch name is required"),
  start_date: z.date(),
  expected_end_date: z.date(),
  breed: z.enum(birdBreeds),
  received_quantity: z.number().min(1, "Must be at least 1"),
  supplier_id: z.string().min(1, "Supplier ID is required"),
  house_no: z.number().min(1, "House number required"),
});

type FormData = z.infer<typeof formSchema>;

export default function BatchForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      batch_name: "",
      start_date: new Date(),
      expected_end_date: new Date(),
      breed: "Classic Cock",
      received_quantity: 0,
      supplier_id: "",
      house_no: 1,
    },
  });

  const { mutate, data, isPending, isSuccess, isError } =
    usePostData("/batches/add");
  const router = useRouter();

  const onSubmit = (values: FormData) => {
    console.log("Form Data:", values);
    mutate(values);
  };

  useEffect(() => {
    if (isSuccess) {
      toast("New Batch Added Successfully!");
      form.reset();
      router.push("/batch-management");
    }

    if (isError) {
      toast("Faild to Add New Batch!");
      form.reset();
    }
  }, [isError, isSuccess]);

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
            {/* Batch Name */}
            <FormField
              control={form.control}
              name="batch_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Batch Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter batch name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                        initialFocus
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
                        <SelectValue placeholder="Select breed" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {birdBreeds.map((b) => (
                        <SelectItem key={b} value={b}>
                          {b}
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
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
