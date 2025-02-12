"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc/client";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import React from "react";
import { IconRenderer } from "./icon-picker";
import { IconPickerDialog } from "./icon-picker-dialog";

const FolderAction = ({ id }: { id: string }) => {
  const utils = trpc.useUtils();
  const deleteMutation = trpc.folder.delete.useMutation({
    onSuccess: () => {
      utils.folder.invalidate();
    },
    onMutate: async () => {
      await utils.folder.getAll.invalidate();
      const data = utils.folder.getAll.getData();

      utils.folder.getAll.setData(
        undefined,

        (old) => {
          if (!old) return [];
          return old.filter((itx) => itx.id !== id);
        },
      );
      return data;
    },
  });

  const onDelete = async () => {
    await deleteMutation.mutateAsync({ id });
    console.log("Deleting folder :", id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-sidebar" variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={onDelete}>
          <Trash />
          <span>Delete</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit />
          <span>Edit</span>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <IconPickerDialog id={id}>
            <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
              <IconRenderer icon="PhotoIcon" />
              Icon
            </div>
          </IconPickerDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FolderAction;
