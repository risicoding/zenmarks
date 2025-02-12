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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FolderAction;
