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

interface BookmarkNavbarProps {
  title: string;
  icon: React.ReactNode;
  count?: number;
  folderId: string;
}
const BookmarkNavbar = ({ title, icon, count }: BookmarkNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex gap-4">
        {icon}
        <h2>{title}</h2>
        <span>{count}</span>
      </div>
      <Popover onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button size='icon'><PlusIcon/></Button>
        </PopoverTrigger>
        {isOpen && (
          <PopoverContent className="mr-4">
            <AddBookmarkForm onClose={() => setIsOpen(false)} />
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
};

export default BookmarkNavbar;
