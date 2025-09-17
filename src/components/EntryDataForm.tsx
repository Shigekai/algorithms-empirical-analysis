"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
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

export enum EntryType {
  RANDOM = "random",
  ASCENDING = "ascending",
  DESCENDING = "descending",
}

const formSchema = z.object({
  entrySize: z
    .number({
      error: (issue) => {
        if (issue.input === undefined) {
          return "Entry size is required";
        }
        if (issue.code === "invalid_type") {
          return "Entry size must be a number";
        }
        return "Invalid entry size";
      },
    })
    .int("Entry size must be an integer")
    .min(1, "Entry size must be at least 1")
    .max(50000, "Entry size cannot exceed 50,000"),
  entryType: z.enum(EntryType, {
    error: (issue) => {
      if (issue.input === undefined) {
        return "Please select an entry type";
      }
      return "Invalid entry type selected";
    },
  }),
});

export type FormData = z.infer<typeof formSchema>;

interface EntryDataFormProps {
  onSubmit: (data: FormData) => void;
  isLoading?: boolean;
}

export function EntryDataForm({
  onSubmit,
  isLoading = false,
}: EntryDataFormProps) {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      entrySize: 1000,
      entryType: EntryType.RANDOM,
    },
  });

  const handleSubmit = (data: FormData) => {
    onSubmit(data);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-black  text-white border border-gray-800 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Algorithm Analysis Setup
        </h2>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="entrySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Entry Size</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter number of elements"
                    className="bg-[#171717] border-gray-700 text-white placeholder-gray-500 focus:border-gray-600 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription className="text-gray-500">
                  Number of elements to analyze (1 - 50,000)
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="entryType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-200">Entry Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-[#171717]  border-gray-700 text-white">
                      <SelectValue placeholder="Select data arrangement" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-[#171717]  border-gray-700">
                    <SelectItem
                      value={EntryType.RANDOM}
                      className="text-white focus:bg-gray-700"
                    >
                      Random Order
                    </SelectItem>
                    <SelectItem
                      value={EntryType.ASCENDING}
                      className="text-white focus:bg-gray-700"
                    >
                      Ascending Order
                    </SelectItem>
                    <SelectItem
                      value={EntryType.DESCENDING}
                      className="text-white focus:bg-gray-700"
                    >
                      Descending Order
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription className="text-gray-500">
                  Initial arrangement of data for analysis
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-white text-black  cursor-pointer border border-gray-600 transition-colors"
          >
            {isLoading ? "Running Analysis..." : "Start Analysis"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
