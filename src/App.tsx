import { useState } from "react";

export default function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-semibold tracking-tight text-slate-900">
          Captured source 20261110-N5nOP
        </h1>

        <p
          className="my-8 text-6xl font-bold tabular-nums text-slate-900"
          aria-live="polite"
          aria-label={`Count: ${count}`}
        >
          {count}
        </p>

        <div className="flex gap-3">
          <button
            className="flex-1 rounded-lg bg-slate-900 px-4 py-2.5 font-medium text-white transition-colors hover:bg-slate-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900"
            type="button"
            onClick={() => setCount((current) => current + 1)}
          >
            Increment
          </button>
          <button
            className="flex-1 rounded-lg border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
            type="button"
            onClick={() => setCount(0)}
          >
            Reset
          </button>
        </div>
      </section>
    </main>
  );
}
