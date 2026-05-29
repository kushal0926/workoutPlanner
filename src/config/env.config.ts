import { config } from "dotenv";
import z from "zod";

config({
  path: ".env",
  quiet: true,
});

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  PORT: z.string().default("5173"),
  DATABASE_URL: z.string().startsWith("postgresql://"),
  BASE_URL: z.string().optional(),
  OPENROUTER_KEY: z.string().startsWith("sk-or"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("invalid environment variables");
  for (const issue of parsed.error.issues) {
    console.error(`  ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

export const { NODE_ENV, PORT, DATABASE_URL, BASE_URL, OPENROUTER_KEY } =
  parsed.data;
