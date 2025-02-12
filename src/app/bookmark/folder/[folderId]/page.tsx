'use client'
import { BookmarkList } from "@/modules/dashboard/components/bookmark-list";
import { trpc } from "@/trpc/client";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams<{ folderId: string }>();
  const { data } = trpc.bookmark.getByFolder.useQuery({ id: params.folderId });

  if (!data) return;
  return (
    <div>
      <BookmarkList bookmarks={data} />
    </div>
  );
};

export default Page;
