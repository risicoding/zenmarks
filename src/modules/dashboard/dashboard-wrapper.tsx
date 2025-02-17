import { trpc } from "@/trpc/server";
import React from "react";

export const DashboardWrapper = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  void trpc.bookmark.query.prefetch();
  void trpc.folder.getAll.prefetch();

  return <>{children}</>;
};
