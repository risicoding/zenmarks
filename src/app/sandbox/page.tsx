'use client'
import { BookmarkCommand } from "@/modules/dashboard/components/add-bookmark-command";
import React from "react";

const Page = () => {
  return <BookmarkCommand value="hello" onChange={() => "hello"} />;
};

export default Page;
