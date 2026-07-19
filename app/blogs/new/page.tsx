import Link from "next/link";
import { getUsers } from "@/lib/blogs";
import { createBlogAction } from "@/app/actions";

export const dynamic = "force-dynamic";

export default async function NewBlogPage() {
  const userList = await getUsers();

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center flex-1 relative isolate">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="w-full max-w-lg bg-zinc-900/50 p-8 rounded-2xl border border-zinc-800 backdrop-blur-md shadow-2xl">
        <div className="mb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center text-sm font-semibold text-zinc-400 hover:text-white transition-colors mb-4 group"
          >
            <svg className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to blogs
          </Link>
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Create New Blog
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Share a new article with the developer community.
          </p>
        </div>

        <form action={createBlogAction} className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-zinc-300">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              required
              placeholder="e.g. Mastering Next.js 15 Server Actions"
              className="mt-2 block w-full px-4 py-2.5 border border-zinc-800 rounded-lg bg-zinc-900/80 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* Author name (Legacy text field) */}
          <div>
            <label htmlFor="author" className="block text-sm font-semibold text-zinc-300">
              Author (Display Name)
            </label>
            <input
              type="text"
              name="author"
              id="author"
              required
              placeholder="e.g. Jane Doe"
              className="mt-2 block w-full px-4 py-2.5 border border-zinc-800 rounded-lg bg-zinc-900/80 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* User association dropdown */}
          {userList.length > 0 && (
            <div>
              <label htmlFor="userId" className="block text-sm font-semibold text-zinc-300">
                Link to Registered User (Optional)
              </label>
              <select
                name="userId"
                id="userId"
                className="mt-2 block w-full px-4 py-2.5 border border-zinc-800 rounded-lg bg-zinc-900/80 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
              >
                <option value="">None (Unlinked)</option>
                {userList.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.name} (@{user.username})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* URL */}
          <div>
            <label htmlFor="url" className="block text-sm font-semibold text-zinc-300">
              Article URL
            </label>
            <input
              type="url"
              name="url"
              id="url"
              required
              placeholder="https://example.com/blog-post"
              className="mt-2 block w-full px-4 py-2.5 border border-zinc-800 rounded-lg bg-zinc-900/80 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-sm"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full inline-flex h-11 items-center justify-center rounded-lg bg-indigo-600 px-4 text-sm font-bold text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors shadow-lg shadow-indigo-500/20 cursor-pointer"
          >
            Create Blog Post
          </button>
        </form>
      </div>
    </div>
  );
}
