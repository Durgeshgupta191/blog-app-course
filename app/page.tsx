import Homepage from "./homepage.mdx";

export default function Home() {
  return (
    <div className="relative isolate overflow-hidden bg-zinc-950 flex flex-col flex-1 py-16 px-4 sm:px-6 lg:px-8">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="max-w-3xl mx-auto w-full bg-zinc-900/40 p-8 sm:p-12 rounded-3xl border border-zinc-800/80 backdrop-blur-md shadow-2xl text-zinc-150">
        <div className="markdown">
          <Homepage />
        </div>
      </div>
    </div>
  );
}
