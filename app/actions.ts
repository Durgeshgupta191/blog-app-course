"use server";

import { addBlog, likeBlog } from "@/lib/blogs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/db";
import { users, readingListEntries } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function createBlogAction(prevState: any, formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return { error: "You must be logged in to create a blog post" };
  }

  const title = formData.get("title")?.toString().trim();
  const author = formData.get("author")?.toString().trim();
  const url = formData.get("url")?.toString().trim();

  // Validate values
  if (!title || title.length < 5) {
    return {
      error: "Title must be at least 5 characters long",
      values: { title, author, url },
    };
  }

  if (!author || author.length < 5) {
    return {
      error: "Author must be at least 5 characters long",
      values: { title, author, url },
    };
  }

  if (!url || url.length < 5) {
    return {
      error: "URL must be at least 5 characters long",
      values: { title, author, url },
    };
  }

  const userId = Number((session.user as any).id);

  let newBlog;
  try {
    newBlog = await addBlog({ title, author, url, userId });

    // Automatically add to creator's reading list
    await db.insert(readingListEntries).values({
      userId,
      blogId: newBlog.id,
      status: "unread",
    });
  } catch (err: any) {
    return {
      error: err.message || "Failed to create blog post",
      values: { title, author, url },
    };
  }

  revalidatePath("/blogs");
  revalidatePath("/me");
  redirect("/blogs");
}

export async function likeBlogAction(formData: FormData) {
  const idStr = formData.get("id")?.toString();
  if (!idStr) {
    throw new Error("Missing blog ID for liking");
  }

  const id = Number(idStr);
  await likeBlog(id);

  revalidatePath("/blogs");
  revalidatePath(`/blogs/${id}`);
}

export async function registerUser(prevState: any, formData: FormData) {
  const name = formData.get("name")?.toString().trim();
  const username = formData.get("username")?.toString().trim().toLowerCase();
  const password = formData.get("password")?.toString();
  const passwordConfirm = formData.get("passwordConfirm")?.toString();

  if (!name || name.length < 2) {
    return {
      error: "Name must be at least 2 characters long",
      values: { name, username },
    };
  }

  if (!username || username.length < 4) {
    return {
      error: "Username must be at least 4 characters long",
      values: { name, username },
    };
  }

  if (!password || password.length < 4) {
    return {
      error: "Password must be at least 4 characters long",
      values: { name, username },
    };
  }

  if (password !== passwordConfirm) {
    return {
      error: "Passwords do not match",
      values: { name, username },
    };
  }

  try {
    const existing = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);

    if (existing.length > 0) {
      return {
        error: "Username is already taken",
        values: { name, username },
      };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      username,
      passwordHash,
    });
  } catch (err: any) {
    return {
      error: err.message || "Username already taken or database error",
      values: { name, username },
    };
  }

  redirect("/login?registered=true");
}

export async function generateTokenAction() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const userId = Number((session.user as any).id);
  const tokenString = crypto.randomUUID();

  await db
    .update(users)
    .set({ token: tokenString })
    .where(eq(users.id, userId));

  revalidatePath("/me");
}

export async function addToReadingListAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const blogIdStr = formData.get("blogId")?.toString();
  if (!blogIdStr) {
    throw new Error("Missing blog ID");
  }

  const blogId = Number(blogIdStr);
  const userId = Number((session.user as any).id);

  // Check if already in reading list
  const existing = await db
    .select()
    .from(readingListEntries)
    .where(
      and(
        eq(readingListEntries.userId, userId),
        eq(readingListEntries.blogId, blogId)
      )
    )
    .limit(1);

  if (existing.length === 0) {
    await db.insert(readingListEntries).values({
      userId,
      blogId,
      status: "unread",
    });
  }

  revalidatePath(`/blogs/${blogId}`);
  revalidatePath("/me");
}

export async function markAsReadAction(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    throw new Error("Unauthorized");
  }

  const entryIdStr = formData.get("entryId")?.toString();
  if (!entryIdStr) {
    throw new Error("Missing entry ID");
  }

  const entryId = Number(entryIdStr);
  const userId = Number((session.user as any).id);

  await db
    .update(readingListEntries)
    .set({ status: "read" })
    .where(
      and(
        eq(readingListEntries.id, entryId),
        eq(readingListEntries.userId, userId)
      )
    );

  revalidatePath("/me");
}
