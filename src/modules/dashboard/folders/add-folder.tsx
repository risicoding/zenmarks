"use client";

import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
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
import { trpc } from "@/trpc/client";
import { DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { useRef } from "react";

const AddFolder = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="w-3/4">
        <DialogTitle>Add new folder</DialogTitle>
        <AddFolderForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddFolder;

const inputSchema = z.object({
  name: z.string(),
});

const AddFolderForm = () => {
  const closeRef = useRef<HTMLButtonElement>(null);
  const form = useForm<z.infer<typeof inputSchema>>({
    resolver: zodResolver(inputSchema),
    defaultValues: {
      name: "",
    },
  });

  const utils = trpc.useUtils();

  const { mutateAsync } = trpc.folder.create.useMutation({
    onSuccess: () => {
      utils.folder.invalidate();
      closeRef.current?.click();
    },
  });

  const onSubmit = async (data: z.infer<typeof inputSchema>) => {
    console.log("Add folder data:", data);
    await mutateAsync(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  disabled={form.formState.isSubmitting}
                  placeholder="Folder url here"
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
        <DialogClose ref={closeRef} />
      </form>
    </Form>
  );
};
