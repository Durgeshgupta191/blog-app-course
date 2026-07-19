import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash"),
  token: text("token"),
});

export const blogs = pgTable("blogs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  author: text("author").notNull(),
  url: text("url").notNull(),
  likes: integer("likes").default(0).notNull(),
  userId: integer("user_id").references(() => users.id),
});

export const readingListEntries = pgTable("reading_list_entries", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  blogId: integer("blog_id")
    .notNull()
    .references(() => blogs.id, { onDelete: "cascade" }),
  status: text("status").default("unread").notNull(), // 'unread' or 'read'
});

export const usersRelations = relations(users, ({ many }) => ({
  blogs: many(blogs),
  readingList: many(readingListEntries),
}));

export const blogsRelations = relations(blogs, ({ one, many }) => ({
  user: one(users, {
    fields: [blogs.userId],
    references: [users.id],
  }),
  readingList: many(readingListEntries),
}));

export const readingListEntriesRelations = relations(readingListEntries, ({ one }) => ({
  user: one(users, {
    fields: [readingListEntries.userId],
    references: [users.id],
  }),
  blog: one(blogs, {
    fields: [readingListEntries.blogId],
    references: [blogs.id],
  }),
}));

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export type Blog = typeof blogs.$inferSelect;
export type NewBlog = typeof blogs.$inferInsert;

export type ReadingListEntry = typeof readingListEntries.$inferSelect;
export type NewReadingListEntry = typeof readingListEntries.$inferInsert;
