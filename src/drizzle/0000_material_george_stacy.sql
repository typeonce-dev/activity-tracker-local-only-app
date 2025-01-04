CREATE TABLE "activity" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "activity_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1)
);
--> statement-breakpoint
CREATE TABLE "system" (
	"version" integer DEFAULT 0 NOT NULL
);
