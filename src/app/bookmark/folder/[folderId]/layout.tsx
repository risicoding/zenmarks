"use client";

import BookmarkNavbar from "@/modules/dashboard/components/bookmark-navbar";
import { trpc } from "@/trpc/client";
import { useParams } from "next/navigation";

const Layout = ({ children }: { children }) => {
  const params = useParams<{ folderId: string }>();
  const { data } = trpc.folder.getById.useQuery({ id: params.folderId });
  if (!data) return;
  return (
    <div className="px-4">
      <BookmarkNavbar icon={data.icon} title={data?.name} folderId={params.folderId} />
      {children}
    </div>
  );
};

export default Layout;
