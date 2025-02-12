CREATE TABLE "bookmarks" (
	"id" text PRIMARY KEY DEFAULT 'KgcPbviKTR6tr6sltBf27' NOT NULL,
	"userId" text NOT NULL,
	"folderId" text,
	"title" varchar(255) NOT NULL,
	"url" text NOT NULL,
	"image" text,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "folders" (
	"id" text PRIMARY KEY DEFAULT 'Fz8re2xgxQOvRf6FRq72U' NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"userId" text NOT NULL,
	"createdAt" timestamp DEFAULT now(),
	"updatedAt" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "bookmarks" ADD CONSTRAINT "bookmarks_folderId_folders_id_fk" FOREIGN KEY ("folderId") REFERENCES "public"."folders"("id") ON DELETE no action ON UPDATE no action;