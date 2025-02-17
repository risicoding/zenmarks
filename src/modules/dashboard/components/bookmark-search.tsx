"use client";

import { Input } from "@/components/ui/input";
import { trpc } from "@/trpc/client";
import { useEffect, useState } from "react";
import Fuse, { type FuseResult, type IFuseOptions } from "fuse.js";
import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "@/trpc/routers/_app";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type BookmarkType =
  inferRouterOutputs<AppRouter>["bookmark"]["query"]["res"][0];

const searchOptions: IFuseOptions<BookmarkType> = {
  isCaseSensitive: false,
  includeScore: true,
  keys: ["title", "url"],
};

const BookmarkSearch = () => {
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<
    FuseResult<BookmarkType>[]
  >([]);
  const [focusedIndex, setFocusedIndex] = useState(0); // Track focused item
  const { data } = trpc.bookmark.query.useQuery();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!data?.res) return;
    const fuse = new Fuse(data.res, searchOptions);
    const results = fuse.search(search);

    console.log("search:", search, results);

    if (results.length === 0) {
      console.log(0);
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }

    setSearchResults(results);
    setFocusedIndex(0); // Reset focus on new search
  }, [search, data]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchResults.length) return;

    if (e.key === "ArrowDown") {
      setFocusedIndex((prev) =>
        prev < searchResults.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      setFocusedIndex((prev) =>
        prev > 0 ? prev - 1 : searchResults.length - 1,
      );
    } else if (e.key === "Enter" && focusedIndex >= 0) {
      window.open(
        searchResults[focusedIndex]?.item.url,
        "_blank",
        "noopener noreferrer",
      );
    }
  };

  return (
    <div className="relative">
      {data && (
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          onKeyDown={handleKeyDown}
          placeholder="Search"
        />
      )}
      {searchResults.length > 0 && isOpen && (
        <div className="absolute left-0 top-full mt-2 overflow-clip rounded-lg border border-gray-600 shadow-lg">
          {searchResults.map((result, index) => (
            <a
              key={result.item.id}
              href={result.item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`block p-4 bg-black hover:bg-neutral-900 ${focusedIndex === index ? "bg-neutral-900" : ""}`}
              tabIndex={0} // Makes links focusable
              onMouseEnter={() => setFocusedIndex(index)} // Update focus on hover
            >
              <div className="flex items-center gap-4">
                <Avatar className="size-7">
                  <AvatarImage
                    src={`https://www.google.com/s2/favicons?domain=${new URL(result.item.url).hostname}&size=720`}
                    alt={result.item.title}
                  />
                  <AvatarFallback>
                    {result.item.title.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-sm font-medium">{result.item.title}</h3>
                  <p className="text-xs text-gray-500">{result.item.url}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookmarkSearch;
