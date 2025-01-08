CREATE SCHEMA "elysiatest";
--> statement-breakpoint
CREATE TYPE "elysiatest"."roles" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TABLE "elysiatest"."categories" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "elysiatest"."categories_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "elysiatest"."items" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "elysiatest"."items_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"description" varchar(100) NOT NULL,
	"price" integer NOT NULL,
	"image" varchar(100) NOT NULL,
	"category_id" integer NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "elysiatest"."users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "elysiatest"."users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"display_name" varchar(100) NOT NULL,
	"username" varchar(100) NOT NULL,
	"email" varchar(160) NOT NULL,
	"password" varchar NOT NULL,
	"role" "elysiatest"."roles" DEFAULT 'user',
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now(),
	"deleted_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "elysiatest"."items" ADD CONSTRAINT "items_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "elysiatest"."categories"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "cat_name_unique_idx" ON "elysiatest"."categories" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX "item_name_unique_idx" ON "elysiatest"."items" USING btree ("name");--> statement-breakpoint
CREATE INDEX "item_category_idx" ON "elysiatest"."items" USING btree ("category_id");--> statement-breakpoint
CREATE UNIQUE INDEX "email_unique_idx" ON "elysiatest"."users" USING btree ("email");--> statement-breakpoint
CREATE UNIQUE INDEX "username_unique_idx" ON "elysiatest"."users" USING btree ("username");