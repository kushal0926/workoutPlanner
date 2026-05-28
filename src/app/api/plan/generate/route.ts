import { generateTrainingPlan } from "@/lib/openAI";
import { db } from "@/db/drizzle";
import { userProfile, trainingPlans } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { profileId } = await req.json();

    if (!profileId) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 },
      );
    }

    // fetch profile to pass to AI
    const [profile] = await db
      .select()
      .from(userProfile)
      .where(eq(userProfile.id, profileId));

    if (!profile) {
      return NextResponse.json(
        { error: "Profile not found. Complete onboarding first." },
        { status: 404 },
      );
    }

    // get latest version number
    const [latestPlan] = await db
      .select({ version: trainingPlans.version })
      .from(trainingPlans)
      .where(eq(trainingPlans.profile_id, profileId))
      .orderBy(desc(trainingPlans.created_at))
      .limit(1);

    const nextVersion = latestPlan ? latestPlan.version + 1 : 1;

    // generate plan
    let planJson;
    try {
      planJson = await generateTrainingPlan(profile);
    } catch (error) {
      console.error("AI generation failed:", error);
      return NextResponse.json(
        {
          error: "Failed to generate training plan. Please try again.",
          details: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 },
      );
    }

    // save to database
    const [newPlan] = await db
      .insert(trainingPlans)
      .values({
        profile_id: profileId,
        plan_json: planJson,
        plan_text: JSON.stringify(planJson, null, 2),
        version: nextVersion,
      })
      .returning();

    return NextResponse.json({
      id: newPlan.id,
      version: newPlan.version,
      createdAt: newPlan.created_at,
    });
  } catch (error) {
    console.error("Error generating plan:", error);
    return NextResponse.json(
      { error: "Failed to generate plan" },
      { status: 500 },
    );
  }
}
