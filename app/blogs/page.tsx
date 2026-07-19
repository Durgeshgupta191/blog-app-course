"use client";

import { useState } from "react";

interface Blog {
  id: string | number;
  title: string;
  author: string;
  url: string;
  likes: number;
}

const initialBlogs: Blog[] = [
  {
    id: 1,
    title: "Mastering Tailwind CSS v4.0: High Performance Styles",
    author: "Sarah Jenkins",
    url: "https://tailwindcss.com/blog",
    likes: 342,
  },
  {
    id: 2,
    title: "Why React Server Components are the Future of Web Apps",
    author: "Dan Abramov",
    url: "https://react.dev/blog",
    likes: 512,
  },
  {
    id: 3,
    title: "Exploring Next.js 15: Streaming, Compiler, and More",
    author: "Lee Robinson",
    url: "https://nextjs.org/blog",
    likes: 289,
  },
  {
    id: 4,
    title: "Building Micro-frontends: Strategies and Pitfalls",
    author: "Alex Rivera",
    url: "https://martinfowler.com",
    likes: 154,
  },
  {
    id: 5,
    title: "CSS Container Queries: A New Era of Responsive Design",
    author: "Rachel Andrew",
    url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries",
    likes: 198,
  },
  {
    id: 6,
    title: "Understanding WebAssembly and Rust in Modern Frontend",
    author: "Lin Clark",
    url: "https://hacks.mozilla.org",
    likes: 421,
  },
];

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>(initialBlogs);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLike = (id: string | number) => {
    setBlogs(prevBlogs =>
      prevBlogs.map(blog =>
        blog.id === id ? { ...blog, likes: blog.likes + 1 } : blog
      )
    );
  };

  const filteredBlogs = blogs.filter(
    blog =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Search articles or authors..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-4 py-2 border border-zinc-800 rounded-lg bg-zinc-900 placeholder-zinc-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredBlogs.map(blog => (
              <article
                key={blog.id}
                className="flex flex-col justify-between p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/5 group"
              >
                <div>
                  {/* Author Badge */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white shadow-inner">
                      {blog.author.split(' ').map(name => name[0]).join('')}
                    </div>
                    <span className="text-sm font-medium text-zinc-300">{blog.author}</span>
                  </div>

                  {/* Title */}
                  <h3 className="mt-4 text-xl font-bold leading-7 text-white group-hover:text-indigo-400 transition-colors duration-200">
                    <a href={blog.url} target="_blank" rel="noopener noreferrer">
                      {blog.title}
                    </a>
                  </h3>
                </div>

                {/* Card Footer */}
                <div className="mt-8 flex items-center justify-between pt-4 border-t border-zinc-800/50">
                  {/* Likes button */}
                  <button
                    onClick={() => handleLike(blog.id)}
                    className="flex items-center gap-2 text-zinc-400 hover:text-pink-500 transition-colors group/btn"
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

                  {/* Read Link */}
                  <a
                    href={blog.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                  >
                    Read Article
                    <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
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
