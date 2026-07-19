import { NextResponse } from "next/server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { error: "Unauthorized: Missing or invalid Authorization header" },
      { status: 401 }
    );
  }

  const token = authHeader.substring(7).trim();

  if (!token) {
    return NextResponse.json(
      { error: "Unauthorized: Token is empty" },
      { status: 401 }
    );
  }

  try {
    const [user] = await db
      .select({
        id: users.id,
        username: users.username,
        name: users.name,
      })
      .from(users)
      .where(eq(users.token, token))
      .limit(1);

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid API token" },
        { status: 401 }
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
