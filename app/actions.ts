"use server";

import { addBlog, likeBlog } from "@/lib/blogs";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createBlogAction(formData: FormData) {
  const title = formData.get("title")?.toString().trim();
  const author = formData.get("author")?.toString().trim();
  const url = formData.get("url")?.toString().trim();
  const userIdStr = formData.get("userId")?.toString().trim();

  if (!title || !author || !url) {
    throw new Error("Missing required fields: title, author, url");
  }

  const userId = userIdStr ? Number(userIdStr) : null;

  await addBlog({ title, author, url, userId });

  revalidatePath("/blogs");
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
