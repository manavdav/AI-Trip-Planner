import arcjet, { tokenBucket } from "@arcjet/next";
import { NextResponse } from "next/server";

//  Create Arcjet instance (local, NOT exported)
const aj = arcjet({
  key: process.env.ARCJET_KEY!, // Load securely from environment
  rules: [
    tokenBucket({
      mode: process.env.NODE_ENV === "production" ? "LIVE" : "DRY_RUN",
      characteristics: ["userId"], // track per-user
      refillRate: 5, // 5 tokens per interval
      interval: 86400, // refill every 86400 seconds (1 day)
      capacity: 5, // max capacity of 10 tokens
    }),
  ],
});

export async function GET(req: Request) {
  //  In production, replace this with your actual authenticated user ID
  const userId = "user123";

  try {
    const decision = await aj.protect(req, { userId, requested: 5 }); // deduct 5 tokens

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: "Too Many Requests", reason: decision.reason },
        { status: 429 }
      );
    }

    return NextResponse.json({ message: "Hello world" });
  } catch (error) {
    console.error("Arcjet error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
