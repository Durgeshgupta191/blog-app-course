import Link from "next/link";
import { getUserWithBlogs } from "@/lib/blogs";
import { notFound } from "next/navigation";
import { likeBlogAction } from "@/app/actions";

type Params = Promise<{ username: string }>;

export const dynamic = "force-dynamic";

export default async function UserProfilePage({ params }: { params: Params }) {
  const { username } = await params;
  const decodedUsername = decodeURIComponent(username);

  const user = await getUserWithBlogs(decodedUsername);

  if (!user) {
    return (
      <div className="bg-zinc-950 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center flex-1">
        <div className="max-w-md w-full text-center">
          <svg className="mx-auto h-16 w-16 text-zinc-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          <h2 className="text-2xl font-bold">User not found</h2>
          <p className="mt-2 text-zinc-400">The user @{decodedUsername} does not exist.</p>
          <Link
            href="/users"
            className="mt-6 inline-flex h-9 items-center justify-center rounded-lg bg-zinc-800 px-4 text-sm font-semibold hover:bg-zinc-700 transition-colors"
          >
            Back to Authors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col flex-1 relative isolate">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="max-w-5xl mx-auto w-full flex-1 flex flex-col">
        {/* Navigation back */}
        <Link
          href="/users"
          className="inline-flex items-center text-sm font-semibold text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <svg className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Authors
        </Link>

        {/* User Header card */}
        <div className="flex items-center gap-6 p-8 bg-zinc-900/30 rounded-3xl border border-zinc-800/80 mb-12 backdrop-blur-sm">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white shadow-inner">
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">{user.name}</h1>
            <p className="text-zinc-400 mt-1">@{user.username}</p>
          </div>
        </div>

        {/* User's Blogs section */}
        <div>
          <h2 className="text-2xl font-extrabold text-white mb-6">Articles by {user.name}</h2>

          {user.blogs && user.blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {user.blogs.map(blog => (
                <article
                  key={blog.id}
                  className="flex flex-col justify-between p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/5 group"
                >
                  <div>
                    <h3 className="text-xl font-bold leading-7 text-white group-hover:text-indigo-400 transition-colors duration-200">
                      <Link href={`/blogs/${blog.id}`}>
                        {blog.title}
                      </Link>
                    </h3>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-800/50">
                    {/* Likes form action */}
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

                    {/* External Link */}
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
            <div className="p-12 text-center bg-zinc-900/20 rounded-2xl border border-zinc-800/50">
              <p className="text-zinc-500">This author hasn't added any blogs yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
