import {
  pgTable,
  uuid,
  varchar,
  integer,
  text,
  json,
  timestamp,
  index,
} from "drizzle-orm/pg-core";

export const userProfile = pgTable("user_profiles", {
  user_id: uuid("user_id").primaryKey(),
  goal: varchar("goal", { length: 20 }).notNull(),
  experience: varchar("experience", { length: 20 }).notNull(),
  days_per_week: integer("days_per_week").notNull(),
  session_length: integer("session_length").notNull(),
  equipment: varchar("equipment", { length: 20 }).notNull(),
  injuries: text("injuries"),
  preferred_split: varchar("preferred_split", { length: 20 }).notNull(),
  updated_at: timestamp("updated_at", { withTimezone: true })
    .notNull()
    .$onUpdate(() => new Date()),
});

export const trainingPlans = pgTable(
  "training_plans",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    user_id: uuid("user_id").notNull(),
    plan_json: json("plan_json").notNull(),
    plan_text: text("plan_text").notNull(),
    version: integer("version").notNull().default(1),
    created_at: timestamp("created_at", { withTimezone: true })
      .notNull()
      .defaultNow(),
  },
  (table) => [
    index("idx_training_plans_user_id").on(table.user_id),
  ]
);

// types you can use in your controllers
export type UserProfile = typeof userProfile.$inferSelect;
export type TrainingPlan = typeof trainingPlans.$inferSelect;
export type NewTrainingPlan = typeof trainingPlans.$inferInsert;