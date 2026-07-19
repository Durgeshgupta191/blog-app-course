import { NextResponse } from "next/server";
import { db } from "@/db";
import { blogs, users, readingListEntries } from "@/db/schema";

export async function DELETE() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "This endpoint is not available in production" },
      { status: 403 }
    );
  }

  try {
    await db.delete(readingListEntries);
    await db.delete(blogs);
    await db.delete(users);

    return NextResponse.json({ message: "Database reset successfully" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to reset database" }, { status: 500 });
  }
}
