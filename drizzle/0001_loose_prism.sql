CREATE TABLE "training_plans" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"plan_json" json NOT NULL,
	"plan_text" text NOT NULL,
	"version" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"user_id" uuid PRIMARY KEY NOT NULL,
	"goal" varchar(20) NOT NULL,
	"experience" varchar(20) NOT NULL,
	"days_per_week" integer NOT NULL,
	"session_length" integer NOT NULL,
	"equipment" varchar(20) NOT NULL,
	"injuries" text,
	"preferred_split" varchar(20) NOT NULL,
	"updated_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
CREATE INDEX "idx_training_plans_user_id" ON "training_plans" USING btree ("user_id");