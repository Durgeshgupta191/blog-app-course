import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users, readingListEntries, blogs } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { generateTokenAction, markAsReadAction } from "@/app/actions";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MePage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/login");
  }

  const userId = Number((session.user as any).id);

  // 1. Fetch user profile and token
  const [user] = await db
    .select({
      name: users.name,
      username: users.username,
      token: users.token,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  if (!user) {
    redirect("/login");
  }

  // 2. Fetch reading list entries
  const readingList = await db
    .select({
      entryId: readingListEntries.id,
      status: readingListEntries.status,
      blog: {
        id: blogs.id,
        title: blogs.title,
        author: blogs.author,
        url: blogs.url,
        likes: blogs.likes,
      },
    })
    .from(readingListEntries)
    .innerJoin(blogs, eq(readingListEntries.blogId, blogs.id))
    .where(eq(readingListEntries.userId, userId))
    .orderBy(desc(blogs.likes));

  const unreadBlogs = readingList.filter(item => item.status === "unread");
  const readBlogs = readingList.filter(item => item.status === "read");

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex-1 relative isolate">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Profile Card */}
        <div className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800 backdrop-blur-md shadow-2xl">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
            My Profile
          </h1>
          <div className="mt-6 space-y-4">
            <div>
              <span className="text-sm font-semibold text-zinc-400">Name:</span>
              <p className="text-lg font-bold text-zinc-150 mt-1">{user.name}</p>
            </div>
            <div>
              <span className="text-sm font-semibold text-zinc-400">Username:</span>
              <p className="text-lg font-bold text-zinc-150 mt-1">{user.username}</p>
            </div>
          </div>
        </div>

        {/* API Token Section */}
        <div className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800 backdrop-blur-md shadow-2xl">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            API Token
          </h2>
          <p className="mt-2 text-sm text-zinc-400">
            Use this token to authenticate external automated scripts with our developer endpoint at <code className="text-indigo-400">/api/me</code>.
          </p>

          <div className="mt-6">
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Current token:</span>
            {user.token ? (
              <div className="mt-2 p-3 bg-zinc-950 border border-zinc-800 rounded-lg text-sm font-mono text-zinc-300 select-all overflow-x-auto break-all">
                {user.token}
              </div>
            ) : (
              <div className="mt-2 p-3 bg-zinc-950/50 border border-zinc-800/50 border-dashed rounded-lg text-sm text-zinc-500">
                No token has been generated yet.
              </div>
            )}
          </div>

          <form action={generateTokenAction} className="mt-6">
            <button
              type="submit"
              className="inline-flex h-10 items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 px-4 text-sm font-bold text-white transition-colors cursor-pointer"
            >
              Generate New Token
            </button>
          </form>
        </div>

        {/* Reading List Section */}
        <div className="bg-zinc-900/40 p-8 rounded-2xl border border-zinc-800 backdrop-blur-md shadow-2xl">
          <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
            Reading List
          </h2>

          <div className="mt-8 space-y-8">
            {/* Unread Blogs */}
            <div>
              <h3 className="text-lg font-bold text-zinc-300 border-b border-zinc-800 pb-2">
                Unread Articles ({unreadBlogs.length})
              </h3>
              {unreadBlogs.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {unreadBlogs.map((item) => (
                    <div
                      key={item.entryId}
                      className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/blogs/${item.blog.id}`}
                          className="font-semibold text-white hover:text-indigo-400 transition-colors truncate block"
                        >
                          {item.blog.title}
                        </Link>
                        <p className="text-xs text-zinc-500 mt-1 truncate">
                          By {item.blog.author} &bull; {item.blog.likes} likes
                        </p>
                      </div>
                      <form action={markAsReadAction}>
                        <input type="hidden" name="entryId" value={item.entryId} />
                        <button
                          type="submit"
                          className="inline-flex h-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800 px-3 text-xs font-semibold text-zinc-300 hover:text-white transition-colors cursor-pointer"
                        >
                          Mark as Read
                        </button>
                      </form>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-500 mt-4 italic">No unread articles in your list.</p>
              )}
            </div>

            {/* Read Blogs */}
            <div>
              <h3 className="text-lg font-bold text-zinc-300 border-b border-zinc-800 pb-2">
                Read Articles ({readBlogs.length})
              </h3>
              {readBlogs.length > 0 ? (
                <div className="mt-4 space-y-3">
                  {readBlogs.map((item) => (
                    <div
                      key={item.entryId}
                      className="p-4 bg-zinc-950/60 border border-zinc-900 rounded-xl flex items-center justify-between gap-4"
                    >
                      <div className="min-w-0 flex-1 opacity-70">
                        <Link
                          href={`/blogs/${item.blog.id}`}
                          className="font-semibold text-zinc-350 hover:text-indigo-400 hover:opacity-100 transition-all truncate block line-through"
                        >
                          {item.blog.title}
                        </Link>
                        <p className="text-xs text-zinc-650 mt-1 truncate">
                          By {item.blog.author} &bull; {item.blog.likes} likes
                        </p>
                      </div>
                      <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-1 text-xs font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                        Read
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-500 mt-4 italic">No articles marked as read.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
