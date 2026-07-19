import Link from "next/link";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-zinc-950 flex flex-col flex-1">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40 flex-1 flex flex-col justify-center">
        <div className="mx-auto max-w-3xl text-center">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 text-sm font-medium text-zinc-400 ring-1 ring-inset ring-zinc-800 hover:ring-zinc-700 transition-all duration-300">
            <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse" />
            Empowering developers with cutting-edge knowledge
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl bg-gradient-to-b from-white via-zinc-100 to-zinc-500 bg-clip-text text-transparent">
            Stay Ahead of the Tech Curve
          </h1>

          {/* Paragraph */}
          <p className="mt-6 text-lg leading-8 text-zinc-400 max-w-2xl mx-auto">
            Welcome to <span className="text-zinc-100 font-semibold">DevPulse</span>. We publish deep dives into modern web technologies, software architecture patterns, UI/UX trends, and the future of coding.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/blogs"
              className="rounded-lg bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-all duration-200 hover:scale-[1.02]"
            >
              Read the Blogs &rarr;
            </Link>
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold leading-6 text-zinc-300 hover:text-white transition-all"
            >
              Learn Next.js <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mx-auto mt-24 max-w-5xl sm:mt-32 lg:mt-40">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-12 sm:max-w-none sm:grid-cols-3">
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <svg className="h-5 w-5 flex-none text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                </svg>
                Secure & Performant
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                <p className="flex-auto">Optimized Next.js architectures leveraging SSR, ISR, and React Server Components.</p>
              </dd>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <svg className="h-5 w-5 flex-none text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path d="M12 9a2 2 0 11-4 0 2 2 0 014 0z" />
                  <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 14V5h10v12H5z" clipRule="evenodd" />
                </svg>
                Stunning Designs
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                <p className="flex-auto">Carefully constructed styles and interactions crafted with Tailwind CSS v4.</p>
              </dd>
            </div>
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800/50 backdrop-blur-sm">
              <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-white">
                <svg className="h-5 w-5 flex-none text-indigo-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                Lightning Fast
              </dt>
              <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-zinc-400">
                <p className="flex-auto">Optimized bundle size, lazy-loaded components, and responsive image formats.</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>

      {/* Decorative Bottom Gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-purple-500 to-indigo-500 opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" />
      </div>
    </div>
  );
}
