DROP INDEX "idx_training_plans_user_id";--> statement-breakpoint
ALTER TABLE "user_profiles" ALTER COLUMN "user_id" SET DEFAULT gen_random_uuid();--> statement-breakpoint
ALTER TABLE "training_plans" ADD COLUMN "profile_id  " uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "training_plans" ADD CONSTRAINT "training_plans_profile_id  _user_profiles_user_id_fk" FOREIGN KEY ("profile_id  ") REFERENCES "public"."user_profiles"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_training_plans_profile_id" ON "training_plans" USING btree ("profile_id  ");--> statement-breakpoint
ALTER TABLE "training_plans" DROP COLUMN "user_id";