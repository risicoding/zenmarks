"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { bookmarkInputSchema } from "@/db/schema";
import { trpc } from "@/trpc/client";

const relaxedURLRegex = new RegExp(
  "^(https?://)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(:\\d+)?(/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
    "(\\#[-a-z\\d_]*)?$",
  "i",
); // fragment locator

const inputSchema = z.object({
  url: z
    .string()
    .refine((val) => relaxedURLRegex.test(val), { message: "Invallid URL" }),
});
const AddBookmarkForm = ({ onClose }: { onClose: () => void }) => {
  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      url: "",
    },
  });

  const { data: res, mutateAsync } = trpc.bookmark.create.useMutation();
  const utils = trpc.useUtils();

  const onSubmit = async(data: z.infer<typeof inputSchema>) => {
    console.log(data);
    await mutateAsync(data, {
      onSuccess: () => {
        utils.bookmark.invalidate();
        onClose();
      },
    });
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
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder="Paste url here"
                  autoCorrect="off"
                  autoCapitalize="none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddBookmarkForm;
