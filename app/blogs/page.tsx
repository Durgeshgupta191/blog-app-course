import Link from "next/link";
import { getBlogs } from "@/lib/blogs";
import { likeBlogAction } from "@/app/actions";

type SearchParams = Promise<{ filter?: string }>;

export const dynamic = "force-dynamic";

export default async function BlogsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const filter = (await searchParams).filter || "";
  const blogsList = await getBlogs(filter);

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col flex-1">
      <div className="max-w-7xl mx-auto w-full flex-1 flex flex-col">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 border-b border-zinc-800">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Latest Articles
            </h1>
            <p className="mt-2 text-zinc-400">
              Deep dives, tutorials, and thoughts on modern software engineering.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            {/* Search Bar (HTML GET Form) */}
            <form method="GET" action="/blogs" className="relative flex gap-2">
              <div className="relative w-full sm:w-64">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="filter"
                  placeholder="Search articles..."
                  defaultValue={filter}
                  className="block w-full pl-10 pr-4 py-2 border border-zinc-800 rounded-lg bg-zinc-900 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
                />
              </div>
              <button
                type="submit"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-zinc-800 px-4 text-sm font-semibold hover:bg-zinc-700 transition-colors"
              >
                Search
              </button>
            </form>

            {/* Add New Blog Link */}
            <Link
              href="/blogs/new"
              className="inline-flex h-9 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors text-center"
            >
              Add Blog
            </Link>
          </div>
        </div>

        {/* Blogs Grid */}
        {blogsList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {blogsList.map(blog => (
              <article
                key={blog.id}
                className="flex flex-col justify-between p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/5 group"
              >
                <div>
                  {/* Author Badge & Link */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                      {(blog.user?.name || blog.author).split(" ").map(name => name[0]).join("")}
                    </div>
                    {blog.userId && blog.user ? (
                      <Link
                        href={`/users/${blog.user.username}`}
                        className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        {blog.user.name}
                      </Link>
                    ) : (
                      <span className="text-sm font-medium text-zinc-300">{blog.author}</span>
                    )}
                  </div>

                  {/* Title linking to details */}
                  <h3 className="mt-4 text-xl font-bold leading-7 text-white group-hover:text-indigo-400 transition-colors duration-200">
                    <Link href={`/blogs/${blog.id}`}>
                      {blog.title}
                    </Link>
                  </h3>
                </div>

                {/* Card Footer */}
                <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-800/50">
                  {/* Likes button via Server Action form */}
                  <form action={likeBlogAction}>
                    <input type="hidden" name="id" value={blog.id} />
                    <button
                      type="submit"
                      className="flex items-center gap-2 text-zinc-400 hover:text-pink-500 transition-colors group/btn cursor-pointer"
                      aria-label="Like this article"
                    >
                      <svg
                        className="h-5 w-5 fill-none stroke-current group-hover/btn:fill-pink-500/10 group-hover/btn:scale-110 transition-transform"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                      >
                        <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <span className="text-sm font-semibold">{blog.likes}</span>
                    </button>
                  </form>

                  {/* External Read Link */}
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Visit Website
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
            <svg className="mx-auto h-12 w-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-white">No articles found</h3>
            <p className="mt-2 text-sm text-zinc-500">Try adjusting your search keywords.</p>
          </div>
        )}
      </div>
    </div>
  );
}
