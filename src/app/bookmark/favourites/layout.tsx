"use client";

import BookmarkNavbar from "@/modules/dashboard/components/bookmark-navbar";

const Layout = ({ children }: { children }) => {
  return (
    <div className="px-4">
      <BookmarkNavbar title="Favourites" folderId="favourites" />
      {children}
    </div>
  );
};

export default Layout;
