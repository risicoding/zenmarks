"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { trpc } from "@/trpc/client";
import { Check, ChevronsUpDown  } from "lucide-react";
import { useEffect, useState } from "react";

export const BookmarkCommand = ({
  value,
  onChange,
}: {
  value?: string;
  onChange: (arg: string) => void;
}) => {
  const [selectedValue, setSelectedValue] = useState<string | undefined>(value);
  const { data: folders } = trpc.folder.getAll.useQuery();

  useEffect(() => {
    if (!folders) return;
    console.log(folders);
    const selectedFolder = folders.find((folder) => folder.id === value);
    if (selectedFolder) {
      setSelectedValue(selectedFolder.slug);
    }
  }, [folders, setSelectedValue, value]);

  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full" asChild>
        <Button
          className="flex min-w-12 items-center justify-between"
          variant="outline"
          role="combobox"
          aria-expanded={open}
        >
          {selectedValue && folders !== undefined
            ? folders.find((folder) => folder.slug === selectedValue)?.name
            : "none"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="">
        <Command>
          <CommandInput />
          <CommandList>
            <CommandEmpty className="flex gap-2" asChild>
              No Folders found
            </CommandEmpty>

            <CommandGroup></CommandGroup>

            <CommandGroup>
              {folders?.map((folder) => (
                <CommandItem
                  key={folder.id}
                  value={folder.slug}
                  onSelect={(currentValue) => {
                    setSelectedValue(currentValue);
                    console.log("OnSelect current value:", currentValue);
                    onChange(folder.id);
                    setOpen(false);
                  }}
                >
                  {folder.name}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedValue === folder.slug
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// const folders = [
//   {
//     id: "1",
//     name: "Documents",
//     slug: "documents",
//   },
//   {
//     id: "2",
//     name: "Images",
//     slug: "images",
//   },
//   {
//     id: "3",
//     name: "Videos",
//     slug: "videos",
//   },
//   {
//     id: "4",
//     name: "Projects",
//     slug: "projects",
//   },
//   {
//     id: "5",
//     name: "Archive",
//     slug: "archive",
//   },
// ];
