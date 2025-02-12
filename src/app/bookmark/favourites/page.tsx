"use client";

import { BookmarkList } from "@/modules/dashboard/components/bookmark-list";

import { trpc } from "@/trpc/client";

const Page = () => {
  const { data } = trpc.bookmark.getFavourites.useQuery();

  if (!data) return;
  return (
    <div>
      <BookmarkList bookmarks={data} />
    </div>
  );
};

export default Page;
