"use client";
import { type Octokit } from "@octokit/rest";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";

type Issues = Awaited<
  ReturnType<Octokit["rest"]["issues"]["listForRepo"]>
>["data"];

export default function Main({ issues }: { issues: Issues }) {
  const [search, setSearch] = useState("");

  const fuse = useMemo(
    () => new Fuse(issues, { keys: ["title", "body"] }),
    [issues]
  );

  const results = useMemo(
    () => (search ? fuse.search(search).map((res) => res.item) : issues),
    [search, fuse, issues]
  );

  return (
    <main className="font-[family-name:var(--font-main)] max-w-3xl mx-auto p-5">
      <h1 className="text-6xl font-bold py-10 text-center">My Books</h1>

      <div className="mb-8 flex">
        <input
          type="search"
          placeholder="Search books..."
          className="flex-grow py-2 px-4 text-l border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mx-12 text-black box-border"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <ul className="list-none space-y-6">
        {results.map((issue) => (
          <li className="mb-2" key={issue.id}>
            <div className="prose lg:prose-lg">
              <details
                className="group"
                key={issue.id}
                open={search.length > 0}
              >
                <summary
                  className="cursor-pointer text-base pb-2 list-none"
                  role="none"
                >
                  <h2 className="text-4xl font-bold pb-4 inline">
                    {issue.title}
                  </h2>
                </summary>
                {issue.body?.split(/[\n\r]+/).map((paragraph, index) => (
                  <p className="text-base pb-2 pl-4 mt-2" key={index}>
                    {paragraph}
                  </p>
                ))}
              </details>
            </div>
            <div
              className="border-t border-gray-200 mt-4"
              aria-hidden="true"
            ></div>
          </li>
        ))}
      </ul>
    </main>
  );
}
