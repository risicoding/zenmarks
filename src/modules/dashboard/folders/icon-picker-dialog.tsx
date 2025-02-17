"use client";
import { useState } from "react";
import { useIconPicker } from "./icon-picker";
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

export const IconPickerDialog = ({
  children,
  onChange: setSelected,
  value,
}: {
  children: React.ReactNode;
  onChange: (arg: string) => void;
  value: string;
}) => {
  const [open, setOpen] = useState(false);

  value.toString();

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
            <Component className="!size-6 text-white shrink-0" />
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
