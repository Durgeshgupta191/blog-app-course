import Link from "next/link";
import { getBlogById } from "@/lib/blogs";
import { likeBlogAction } from "@/app/actions";
import { notFound } from "next/navigation";

type Params = Promise<{ id: string }>;

export const dynamic = "force-dynamic";

export default async function BlogDetailsPage({ params }: { params: Params }) {
  const { id } = await params;
  const blogId = Number(id);

  if (isNaN(blogId)) {
    return notFound();
  }

  const blog = await getBlogById(blogId);

  if (!blog) {
    return (
      <div className="bg-zinc-950 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center flex-1">
        <div className="max-w-md w-full text-center">
          <svg className="mx-auto h-16 w-16 text-zinc-600 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold">Blog not found</h2>
          <p className="mt-2 text-zinc-400">The blog post you are looking for does not exist or has been removed.</p>
          <Link
            href="/blogs"
            className="mt-6 inline-flex h-9 items-center justify-center rounded-lg bg-zinc-800 px-4 text-sm font-semibold hover:bg-zinc-700 transition-colors"
          >
            Back to blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center flex-1 relative isolate">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="w-full max-w-2xl bg-zinc-900/50 p-8 sm:p-10 rounded-3xl border border-zinc-800 backdrop-blur-md shadow-2xl">
        {/* Navigation back */}
        <Link
          href="/blogs"
          className="inline-flex items-center text-sm font-semibold text-zinc-400 hover:text-white transition-colors mb-8 group"
        >
          <svg className="mr-2 h-4 w-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to blogs
        </Link>

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-100 to-zinc-400 bg-clip-text text-transparent leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Author / User Block */}
        <div className="flex items-center gap-4 py-6 border-y border-zinc-800/80 mb-8">
          <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-inner">
            {(blog.user?.name || blog.author).split(" ").map(name => name[0]).join("")}
          </div>
          <div>
            <div className="text-sm font-medium text-zinc-400">Written by</div>
            {blog.userId && blog.user ? (
              <Link
                href={`/users/${blog.user.username}`}
                className="text-base font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {blog.user.name} <span className="text-sm font-normal text-zinc-500">(@{blog.user.username})</span>
              </Link>
            ) : (
              <span className="text-base font-bold text-zinc-200">{blog.author}</span>
            )}
          </div>
        </div>

        {/* Content details & action buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6">
          {/* External URL Link */}
          <a
            href={blog.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center justify-center rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white px-6 font-semibold transition-all border border-zinc-700/50 shadow-md text-center"
          >
            Visit Website
            <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>

          {/* Likes form action */}
          <form action={likeBlogAction} className="flex">
            <input type="hidden" name="id" value={blog.id} />
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex h-11 items-center justify-center rounded-xl bg-pink-600 hover:bg-pink-500 text-white px-6 font-bold transition-all shadow-lg shadow-pink-500/20 cursor-pointer group"
            >
              <svg
                className="mr-2 h-5 w-5 fill-none stroke-current group-hover:scale-110 group-hover:fill-white/10 transition-transform"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              Like Post ({blog.likes})
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
