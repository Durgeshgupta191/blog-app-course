import { db } from "@/db";
import { blogs, users } from "@/db/schema";
import { desc, eq, ilike, sql } from "drizzle-orm";

export async function getBlogs(filter?: string) {
  const baseQuery = db
    .select({
      id: blogs.id,
      title: blogs.title,
      author: blogs.author,
      url: blogs.url,
      likes: blogs.likes,
      userId: blogs.userId,
      user: {
        id: users.id,
        username: users.username,
        name: users.name,
      },
    })
    .from(blogs)
    .leftJoin(users, eq(blogs.userId, users.id));

  const query = filter
    ? baseQuery.where(ilike(blogs.title, `%${filter}%`))
    : baseQuery;

  return query.orderBy(desc(blogs.likes));
}

export async function getBlogById(id: number) {
  const result = await db
    .select({
      id: blogs.id,
      title: blogs.title,
      author: blogs.author,
      url: blogs.url,
      likes: blogs.likes,
      userId: blogs.userId,
      user: {
        id: users.id,
        username: users.username,
        name: users.name,
      },
    })
    .from(blogs)
    .leftJoin(users, eq(blogs.userId, users.id))
    .where(eq(blogs.id, id))
    .limit(1);
  return result[0] || null;
}

export async function addBlog(data: { title: string; author: string; url: string; userId?: number | null }) {
  const result = await db
    .insert(blogs)
    .values({
      title: data.title,
      author: data.author,
      url: data.url,
      likes: 0,
      userId: data.userId || null,
    })
    .returning();
  return result[0];
}

export async function likeBlog(id: number) {
  await db
    .update(blogs)
    .set({ likes: sql`${blogs.likes} + 1` })
    .where(eq(blogs.id, id));
}

export async function getUsers() {
  return db.select().from(users).orderBy(users.name);
}

export async function getUserWithBlogs(username: string) {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    with: {
      blogs: {
        orderBy: (blogs, { desc }) => [desc(blogs.likes)],
      },
    },
  });
}
