"use client";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import AddBookmarkForm from "./add-bookmark-form";
import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { IconRenderer } from "../folders/icon-picker";

interface BookmarkNavbarProps {
  title: string;
  icon: string;
  count?: number;
  folderId: string;
  isFavourite?: boolean;
}
const BookmarkNavbar = ({
  title,
  icon,
  count,
  isFavourite = false,
}: BookmarkNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <IconRenderer className="size-4" icon={icon} />
        <h2>{title}</h2>
        <span>{count}</span>
      </div>
      <Popover onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button size="icon">
            <PlusIcon />
          </Button>
        </PopoverTrigger>
        {isOpen && (
          <PopoverContent className="mr-4">
            <AddBookmarkForm
              isFavourite={isFavourite}
              onClose={() => setIsOpen(false)}
            />
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};

export default BookmarkNavbar;
