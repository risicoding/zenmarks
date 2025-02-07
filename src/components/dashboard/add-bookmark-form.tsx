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
import { bookmarkSchema } from "@/lib/schema";
import { useBookmarkMutation } from "@/lib/mutations";

const AddBookmarkForm = () => {
  const form = useForm<z.infer<typeof bookmarkSchema>>({
    resolver: zodResolver(bookmarkSchema),
    defaultValues: {
      url: "",
    },
  });

  const { mutateAsync, status } = useBookmarkMutation();

  const onSubmit = async (data: z.infer<typeof bookmarkSchema>) => {
    const res = await mutateAsync(data);
    console.log(res);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Url</FormLabel>
              <FormControl>
                <Input placeholder="Paste url here" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={status === "pending"}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddBookmarkForm;
