import prismaClient from "@/db/prismaClient";
import { HARDCODED_USER_ID } from "@/db/repos/consts";
import { NextResponse } from "next/server";

// This ensures the endpoint only works in test environments
const isTestEnvironment =
  process.env.NODE_ENV === "test" || process.env.NODE_ENV === "development";

export async function DELETE() {
  // Only test environments
  if (!isTestEnvironment) {
    return NextResponse.json(
      { error: "This endpoint is only available in test environments" },
      { status: 403 }
    );
  }

  try {
    const result = await prismaClient.application.deleteMany({
      where: {
        userId: HARDCODED_USER_ID,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: `Successfully deleted ${result.count} applications`,
        count: result.count,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error clearing applications:", error);
    return NextResponse.json(
      { error: "Failed to clear applications" },
      { status: 500 }
    );
  }
}
