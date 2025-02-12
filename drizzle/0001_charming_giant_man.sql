ALTER TABLE "bookmarks" DROP CONSTRAINT "bookmarks_folderId_folders_id_fk";
--> statement-breakpoint
ALTER TABLE "bookmarks" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "folders" ALTER COLUMN "id" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_folderId_folders_id_fk" FOREIGN KEY ("folderId") REFERENCES "public"."folders"("id") ON DELETE cascade ON UPDATE no action;