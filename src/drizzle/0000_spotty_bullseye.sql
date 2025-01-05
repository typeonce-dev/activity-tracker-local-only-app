CREATE TYPE "public"."color" AS ENUM('magenta', 'dawn', 'skin', 'emerald', 'sky', 'fuchsia', 'midnight', 'salt');--> statement-breakpoint
CREATE TABLE "activity" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "activity_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"category_id" integer
);
--> statement-breakpoint
CREATE TABLE "category" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar NOT NULL,
	"color" "color" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "log" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "log_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"date" date NOT NULL,
	"activity_id" integer NOT NULL,
	"note" varchar
);
--> statement-breakpoint
CREATE TABLE "system" (
	"version" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
ALTER TABLE "activity" ADD CONSTRAINT "activity_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "log" ADD CONSTRAINT "log_activity_id_activity_id_fk" FOREIGN KEY ("activity_id") REFERENCES "public"."activity"("id") ON DELETE no action ON UPDATE no action;