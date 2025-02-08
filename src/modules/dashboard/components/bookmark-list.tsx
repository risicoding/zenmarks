"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Pen, TrashIcon } from "lucide-react";
import { trpc } from "@/trpc/client";
import { BookmarkType } from "@/db/schema";

interface BookmarkProps {
  id: number;
  url: string;
  title: string;
  image?: string | null;
}

interface BookmarkListProps {
  bookmarks: BookmarkProps[];
}

type BookmarkQueryType = {
  id: number;
  url: string;
  title: string;
  image: string | null;
  userId: string;
  createdAt: string | null; // Note: string instead of Date
  updatedAt: string | null;
};

const Bookmark: React.FC<BookmarkProps> = ({ id, url, title, image }) => {
  const utils = trpc.useUtils();
  const { mutate } = trpc.bookmark.delete.useMutation({
    onMutate: async () => {
      await utils.bookmark.query.cancel();
      const data = utils.bookmark.query.getData();

      utils.bookmark.query.setData(
        undefined,
        (old?: { res: BookmarkQueryType[] }) => {
          if (!old) return { res: [] };
          return { res: old.res.filter((itx) => itx.id !== id) };
        },
      );
      return data;
    },
    onSuccess: () => {
      utils.bookmark.query.invalidate();
    },
  });

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
    >
      <Avatar className="">
          <AvatarImage
            src={`${url}/favicon.ico`}
            alt={title}
          />
          <AvatarFallback className="">
            {title.slice(0,2)}
          </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
          {title}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{url}</p>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <MoreHorizontal />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-2">
            <DropdownMenuItem
              onClick={() => {
                mutate({ id });
              }}
            >
              <TrashIcon /> Delete
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pen /> Edit
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </a>
  );
};

export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks }) => {
  return (
    <div className="space-y-4">
      {bookmarks.map((bookmark, index) => (
        <Bookmark
          key={index}
          id={bookmark.id}
          url={bookmark.url}
          title={bookmark.title}
          image={bookmark.image}
        />
      ))}
    </div>
  );
};

export const BookmarkSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <div className="flex items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
        <Skeleton className="size-10 rounded-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
};
