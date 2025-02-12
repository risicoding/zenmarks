"use client";
import { useState } from "react";
import { IconRenderer, useIconPicker } from "./icon-picker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/client";

export const IconPickerDialog = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<null | string>(null);

  const utils = trpc.useUtils();
  const iconMutation = trpc.folder.update.useMutation({
    onMutate: async (mutationData) => {
      if (mutationData.icon === undefined) return;
      await utils.folder.getAll.cancel();
      const data = utils.folder.getAll.getData();

      utils.folder.getAll.setData(undefined, (old) => {
        if (!old) return [];
        return old.map((folder) => {
          if (folder.id === id) {
            return { ...folder, icon: mutationData.icon ?? null };
          }
          return folder;
        });
      });
      return { data };
    },
    onSuccess: async () => {
      utils.folder.invalidate();
    },
  });

  return (
    <Dialog open={open} onOpenChange={(e) => setOpen(e)}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Select an Icon</DialogTitle>
        <DialogHeader>
          <DialogTitle>Select an Icon</DialogTitle>
          <DialogDescription>Choose the best suited icon</DialogDescription>
        </DialogHeader>
        <IconPicker
          onChange={(icon) => {
            setSelected(icon);
            console.log(icon);
            iconMutation.mutate({ id, icon });
            setOpen(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
export const IconPicker = ({
  onChange,
}: {
  onChange: (icon: string) => void;
}) => {
  const { search, setSearch, icons } = useIconPicker();

  return (
    <div className="relative">
      <Input
        placeholder="Search..."
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mt-2 flex h-full max-h-[400px] flex-wrap gap-2 overflow-y-scroll py-4 pb-12">
        {icons.map(({ name, Component }) => (
          <Button
            variant="outline"
            key={name}
            type="button"
            role="button"
            onClick={() => onChange(name)}
            className="h-11"
          >
            <Component className="!size-6 shrink-0" />
            <span className="sr-only">{name}</span>
          </Button>
        ))}
        {icons.length === 0 && (
          <div className="col-span-full flex grow flex-col items-center justify-center gap-2 text-center">
            <p>No icons found...</p>
            <Button onClick={() => setSearch("")} variant="ghost">
              Clear search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
