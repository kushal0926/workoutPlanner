import { db } from "@/db/drizzle";
import { trainingPlans } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const profileId = req.nextUrl.searchParams.get("profileId");

    if (!profileId) {
      return NextResponse.json(
        { error: "Profile ID is required" },
        { status: 400 },
      );
    }

    const [plan] = await db
      .select()
      .from(trainingPlans)
      .where(eq(trainingPlans.profile_id, profileId))
      .orderBy(desc(trainingPlans.created_at))
      .limit(1);

    if (!plan) {
      return NextResponse.json({ error: "No plan found" }, { status: 404 });
    }

    return NextResponse.json({
      id: plan.id,
      profileId: plan.profile_id,
      planJson: plan.plan_json,
      planText: plan.plan_text,
      version: plan.version,
      createdAt: plan.created_at,
    });
  } catch (error) {
    console.error("Error fetching plan:", error);
    return NextResponse.json(
      { error: "Failed to fetch plan" },
      { status: 500 },
    );
  }
}
