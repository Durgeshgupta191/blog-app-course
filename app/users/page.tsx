import Link from "next/link";
import { getUsers } from "@/lib/blogs";

export const dynamic = "force-dynamic";

export default async function UsersPage() {
  const userList = await getUsers();

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8 flex flex-col flex-1 relative isolate">
      {/* Background Gradients */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" />
      </div>

      <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
        {/* Page Header */}
        <div className="pb-10 border-b border-zinc-800 mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Authors & Contributors
          </h1>
          <p className="mt-2 text-zinc-400">
            Meet the talented minds writing on DevPulse.
          </p>
        </div>

        {/* Users Grid */}
        {userList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {userList.map(user => (
              <div
                key={user.id}
                className="flex items-center gap-4 p-6 bg-zinc-900/40 rounded-2xl border border-zinc-800/80 hover:border-zinc-700/80 transition-all duration-300 shadow-lg group"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white shadow-inner">
                  {user.name.split(" ").map(name => name[0]).join("")}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-400 transition-colors">
                    <Link href={`/users/${user.username}`}>
                      {user.name}
                    </Link>
                  </h3>
                  <p className="text-sm text-zinc-500">@{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-20">
            <svg className="mx-auto h-12 w-12 text-zinc-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-semibold text-white">No authors found</h3>
            <p className="mt-2 text-sm text-zinc-500">Create authors directly in Drizzle Studio to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}
