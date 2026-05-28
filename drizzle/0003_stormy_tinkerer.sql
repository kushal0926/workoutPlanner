ALTER TABLE "user_profiles" RENAME COLUMN "user_id" TO "id";--> statement-breakpoint
ALTER TABLE "training_plans" DROP CONSTRAINT "training_plans_profile_id  _user_profiles_user_id_fk";
--> statement-breakpoint
ALTER TABLE "training_plans" ADD CONSTRAINT "training_plans_profile_id  _user_profiles_id_fk" FOREIGN KEY ("profile_id  ") REFERENCES "public"."user_profiles"("id") ON DELETE cascade ON UPDATE no action;