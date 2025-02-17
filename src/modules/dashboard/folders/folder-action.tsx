"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { trpc } from "@/trpc/client";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
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

      utils.folder.getAll.setData(undefined, (old) =>
        old?.filter((folder) => folder.id !== id),
      );

      return data;
    },
  });

  const updateMutation = trpc.folder.update.useMutation({
    onSuccess: () => {
      utils.folder.invalidate();
    },
    onMutate: async ({ icon }) => {
      await utils.folder.getAll.invalidate();

      const data = utils.folder.getAll.getData();

      utils.folder.getAll.setData(undefined, (old) =>
        old?.map((folder) => {
          if (folder.id === id && icon !== undefined) {
            console.log("icon", icon);
            return { ...folder, icon };
          }
          return folder;
        }),
      );

      return data;
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent" variant="ghost">
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => deleteMutation.mutate({ id })}>
          <Trash />
          <span>Delete</span>
        </DropdownMenuItem>

        <DropdownMenuItem>
          <Edit />
          <span>Edit</span>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <IconPickerDialog
            value=""
            onChange={(icon) => updateMutation.mutate({ id, icon })}
          >
            <div className="relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0">
              <IconRenderer icon="PhotoIcon" />
              <span>Icon</span>
            </div>
          </IconPickerDialog>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FolderAction;
