"use client";
import {
  BookmarkList,
  BookmarkSkeleton,
} from "@/modules/dashboard/components/bookmark-list";
import BookmarkNavbar from "@/modules/dashboard/components/bookmark-navbar";
import { trpc } from "@/trpc/client";

const Page = () => {
  const { data, status } = trpc.bookmark.query.useQuery();

  return (
    <div className="space-y-4 px-4">
      <BookmarkNavbar
        title="All bookmark"
        icon="TableCellsIcon"
        folderId="root"
      />
      {status === "pending" && <BookmarkSkeleton />}
      <div>{data?.res && <BookmarkList bookmarks={data.res} />}</div>
    </div>
  );
};

export default Page;
