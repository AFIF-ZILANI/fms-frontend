"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ContactMethod, EmployeeRole } from "@/types/enum.type";
import { format } from "date-fns";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Uploadfile from "@/components/upload-file";
import { useDeleteData, usePostData } from "@/lib/api-request";
import toast from "react-hot-toast";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";

const bdPhoneRegex =
  /^(?:01[3-9](?:[\s.-]?\d){8}|(?:\+880|00880|880)1[3-9](?:[\s.-]?\d){8})$/;

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  role: z.nativeEnum(EmployeeRole).refine((val) => val !== EmployeeRole.NONE, {
    message: "Please select a valid role.",
  }),
  mobile: z
    .string()
    .trim()
    .refine((val) => bdPhoneRegex.test(val.replace(/[^\d+]/g, "")), {
      message: "Invalid Bangladesh phone number",
    })
    .transform((val) => {
      // Remove all non-digit characters except '+'
      let digits = val.replace(/[^\d+]/g, "");

      // Normalize different formats
      if (digits.startsWith("00")) digits = digits.slice(2); // 00880 -> 880
      if (digits.startsWith("+")) digits = digits.slice(1); // +880 -> 880

      // Now `digits` should look like "8801XXXXXXXXX" or "01XXXXXXXXX"
      if (digits.startsWith("8801")) {
        return `+${digits}`; // already in correct format
      }
      if (digits.startsWith("01")) {
        return `+88${digits}`; // convert local 01... to +8801...
      }

      // Fallback (should never happen after refine)
      return val;
    }),
  email: z.string().optional(),
  joined_date: z.date(),
  salary: z.number().min(0).max(100000),
  address: z.string(),
  online_contact: z.array(z.nativeEnum(ContactMethod)).optional(),
  photo: z.string().optional(),
});

export default function Page() {
  const router = useRouter();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [publicId, setPublicId] = useState<string | null>(null);
  const uploadedRef = useRef(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      role: EmployeeRole.NONE,
      online_contact: [],
      mobile: "",
      email: "",
      photo: "",
      salary: 0,
      joined_date: undefined,
      address: "",
    },
  });
  const methods = useMemo(() => Object.values(ContactMethod), []);

  function onSubmit(values: z.infer<typeof formSchema>) {
    uploadedRef.current = true;
    submitData.mutate({
      ...values,
      photo: { image_url: values.photo, public_id: publicId },
    });
  }

  //API calls
  const submitData = usePostData("/employee/add");
  const deleteTempImage = useDeleteData("/avatar/delete");

  // 🧹 Cleanup dangling uploads if user leaves before submitting
  useEffect(() => {
    if (uploadedImage && publicId) {
      form.setValue("photo", uploadedImage);
    }

    const handleBeforeUnload = async () => {
      if (uploadedImage && !uploadedRef.current) {
        deleteTempImage.mutate({ id: publicId! });
      }
    };

    if (!uploadedImage || !publicId) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }

    if (submitData.isSuccess) {
      console.log(submitData.data);
      toast.success("Employee Added Successsfully");
      form.reset();
      router.push("/employee");
    }
    if (submitData.isError) {
      console.log(submitData.error);
      toast.error("Faild to Add Employee!");
    }

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      handleBeforeUnload();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [
    uploadedImage,
    publicId,
    isDisabled,
    submitData.data,
    submitData.isError,
    submitData.isSuccess,
    submitData.isPending,
  ]);

  return (
    <div className="flex min-h-screen mt-8 justify-center">
      <div className="container max-w-xl mx-auto text-center space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Add New Employee</h1>
          <p className="text-sm text-muted-foreground">
            Fill in the details below to create a new Employee.
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 text-left"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Employee name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input placeholder="01XXXXXXXXX" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Salary</FormLabel>
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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="example@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Supplier address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="joined_date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Joining Date</FormLabel>
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

            <FormField
              control={form.control}
              name="online_contact"
              render={({ field }) => {
                const allSelected = field.value?.length === methods.length;

                const toggleSelectAll = () => {
                  if (allSelected) {
                    field.onChange([]);
                  } else {
                    field.onChange(methods);
                  }
                };

                return (
                  <FormItem>
                    <div className="flex items-center justify-between mb-1">
                      <FormLabel className="text-base font-semibold">
                        Online Contact
                      </FormLabel>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={toggleSelectAll}
                      >
                        {allSelected ? "Clear All" : "Select All"}
                      </Button>
                    </div>

                    <div className="border rounded-lg p-4  bg-muted/10 space-y-1">
                      {methods.map((method) => {
                        const label =
                          method.charAt(0) + method.slice(1).toLowerCase();
                        const isSelected = field.value?.includes(method);

                        return (
                          <label
                            key={method}
                            className={`
                  flex items-center justify-between py-2 px-3 rounded-md cursor-pointer transition
                  ${
                    isSelected
                      ? "bg-primary/10 border border-primary/40"
                      : "hover:bg-muted"
                  }
                `}
                          >
                            <div className="flex items-center space-x-3">
                              <input
                                type="checkbox"
                                checked={isSelected}
                                onChange={(e) => {
                                  const checked = e.target.checked;
                                  if (checked) {
                                    field.onChange([
                                      ...(field.value || []),
                                      method,
                                    ]);
                                  } else {
                                    field.onChange(
                                      field.value?.filter(
                                        (m) => m !== method
                                      ) || []
                                    );
                                  }
                                }}
                                className="w-4 h-4 accent-primary focus:ring-2 focus:ring-primary rounded"
                              />
                              <span className="font-medium text-sm text-foreground">
                                {label}
                              </span>
                            </div>
                          </label>
                        );
                      })}
                    </div>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="flex w-full justify-between px-2">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Employee Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value={EmployeeRole.NONE}>
                          Select a role
                        </SelectItem>
                        {Object.values(EmployeeRole)
                          .filter((role) => role !== EmployeeRole.NONE)
                          .map((role) => (
                            <SelectItem key={role} value={role}>
                              {role.charAt(0) +
                                role.slice(1).toLowerCase().replace("_", " ")}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="photo"
                render={() => (
                  <FormItem>
                    <FormLabel>Photo</FormLabel>
                    <FormControl>
                      <Uploadfile
                        uploadedImage={uploadedImage}
                        setPublicId={setPublicId}
                        setUploadedImage={setUploadedImage}
                        preset="temp"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              disabled={isDisabled}
              className="w-full flex justify-center items-center gap-2"
            >
              {submitData.isPending && <Spinner />}
              <span>Add Employee</span>
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
