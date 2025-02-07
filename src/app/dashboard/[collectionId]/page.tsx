"use client";
import { getBookmarkAction } from "@/actions";
import BookmarkNavbar from "@/components/dashboard/bookmark-navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getBookmarksByFolder } from "@/data";
import { useBookmarkQuery } from "@/lib/queries";
import { convertToHttps } from "@/lib/url";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Cloud } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

// Define the Bookmark type based on your Prisma schema
type Bookmark = {
  id: string;
  userId: string;
  title: string;
  url: string;
  description?: string | null;
  image?: string | null;
  folderId?: string | null;
  isFavorite: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
};

const Page = () => {
  const { collectionId } = useParams<{ collectionId: string }>();

  const { data } = useBookmarkQuery();

  let bookmarks: Bookmark[] = [];
  if (collectionId === "all") {
    const res = data;
    if (res?.data === undefined) {
      return;
    }
    bookmarks = res.data;
  } else {
  }

  return (
    <div className="p-4">
      <div>
        <BookmarkNavbar
          title={collectionId === "all" ? "All Bookmarks" : "folder"}
          icon={<Cloud />}
          folderId={collectionId}
        />
        <BookmarkList bookmarks={bookmarks} />
      </div>
    </div>
  );
};

// Separate component to render the bookmarks
const BookmarkList = ({
  bookmarks,
}: {
  bookmarks: Omit<Bookmark, "createdAt" | "updatedAt">[];
}) => {
  if (bookmarks.length === 0) {
    return <p className="mt-4 text-gray-400">No bookmarks available.</p>;
  }

  return (
    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {bookmarks.map((bookmark) => (
        <Link
          key={bookmark.id}
          className="inline-flex overflow-clip items-center justify-start gap-4 whitespace-nowrap rounded-md border border-input bg-background px-4 py-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          href={bookmark.url}
        >
          <Avatar className="flex size-8 items-center justify-center">
            <AvatarImage src={convertToHttps(bookmark.url)} />
            <AvatarFallback>{bookmark.title.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <span className="text-lg font-medium hover:underline">
              {bookmark.title}
            </span>
            {bookmark.description && (
              <p className="text-sm text-gray-400">{bookmark.description}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Page;
