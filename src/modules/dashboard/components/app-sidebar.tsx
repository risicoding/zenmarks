"use client";
import { Cloud, PlusIcon, Star } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { trpc } from "@/trpc/client";
import AddFolder from "../folders/add-folder";
import FolderAction from "../folders/folder-action";

export function AppSidebar() {
  const folders = trpc.folder.getAll.useQuery();
  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <div className="flex justify-between">
          <UserButton />
          <Button variant="outline" className="bg-sidebar">
            Create
          </Button>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Quick access</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/bookmark">
                    <Cloud />
                    <span>All bookmarks</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link href="/bookmark/favourites">
                    <Star />
                    <span>Favourites</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center justify-between">
            Folders
            <AddFolder>
              <PlusIcon className="size-4" />
            </AddFolder>
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="py-3">
              {folders?.data?.map((folder) => (
                <SidebarMenuItem key={folder.id}>
                  <SidebarMenuButton asChild>
                    <div className="flex justify-between">
                      <Link href={`/bookmark/folder/${folder.id}`}>
                        {folder.name}
                      </Link>
                      <FolderAction id={folder.id} />
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
