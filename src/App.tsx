import { useState } from "react";

const checklistItems = [
  {
    id: "design",
    label: "Design reviewed",
    description: "Final screens and interactions are approved.",
  },
  {
    id: "tests",
    label: "Tests passed",
    description: "Quality checks are green across the release.",
  },
  {
    id: "ship",
    label: "Ready to ship",
    description: "Release notes and rollout plan are confirmed.",
  },
] as const;

type ChecklistItemId = (typeof checklistItems)[number]["id"];

function CheckIcon() {
  return (
    <svg aria-hidden="true" className="size-4" fill="none" viewBox="0 0 16 16">
      <path
        d="m3.25 8.2 3.05 3.05 6.45-6.5"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
    </svg>
  );
}

export default function App() {
  const [completed, setCompleted] = useState<Set<ChecklistItemId>>(new Set());
  const completedCount = completed.size;
  const progress = (completedCount / checklistItems.length) * 100;

  const toggleItem = (id: ChecklistItemId) => {
    setCompleted((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <main className="flex min-h-screen items-center justify-center p-4 sm:p-8">
      <section
        aria-labelledby="launch-checklist-title"
        className="launch-card w-full max-w-[720px] overflow-hidden rounded-[28px] border border-[#dcdaca] bg-[#fffef8] shadow-[0_24px_70px_rgba(18,31,54,0.14),0_2px_8px_rgba(18,31,54,0.05)]"
        data-layer-name="Launch checklist"
      >
        <div className="grid min-h-[480px] grid-cols-1 md:grid-cols-[0.9fr_1.1fr]">
          <header className="relative flex flex-col justify-between overflow-hidden bg-[#13233d] p-7 text-[#fffef8] sm:p-9">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 size-64 rounded-full border border-white/10"
            />
            <div
              aria-hidden="true"
              className="absolute -right-5 top-16 size-36 rounded-full border border-white/8"
            />

            <div className="relative">
              <p className="mb-10 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#aebbd2]">
                <span className="size-1.5 rounded-full bg-[#62a1ff]" />
                Enterprise workspace
              </p>
              <h1
                className="max-w-[280px] text-[38px] font-semibold leading-[1.03] tracking-[-0.045em] sm:text-[42px]"
                id="launch-checklist-title"
              >
                Launch checklist
              </h1>
              <p className="mt-4 max-w-[260px] text-sm leading-6 text-[#b9c4d6]">
                Everything you need for a confident launch.
              </p>
            </div>

            <div className="relative mt-10">
              <div className="mb-3 flex items-end justify-between">
                <p aria-live="polite" className="text-sm font-medium text-white">
                  {completedCount} of {checklistItems.length} complete
                </p>
                <span className="text-xs tabular-nums text-[#91a0b8]">{Math.round(progress)}%</span>
              </div>
              <div
                aria-label={`${Math.round(progress)}% complete`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={Math.round(progress)}
                className="h-1.5 overflow-hidden rounded-full bg-white/12"
                role="progressbar"
              >
                <div
                  className="h-full rounded-full bg-[#62a1ff] transition-[width] duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </header>

          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex-1">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.13em] text-[#778196]">
                Release status
              </p>
              <div className="space-y-2">
                {checklistItems.map((item) => {
                  const isComplete = completed.has(item.id);

                  return (
                    <button
                      aria-pressed={isComplete}
                      className={`group flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f73db] focus-visible:ring-offset-2 ${
                        isComplete
                          ? "border-[#c8daf6] bg-[#f1f6fe]"
                          : "border-[#e6e4d8] bg-white/55 hover:-translate-y-0.5 hover:border-[#c8d4e7] hover:bg-white hover:shadow-[0_8px_24px_rgba(22,39,67,0.07)]"
                      }`}
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      type="button"
                    >
                      <span
                        className={`grid size-7 shrink-0 place-items-center rounded-full border transition-colors ${
                          isComplete
                            ? "border-[#2f73db] bg-[#2f73db] text-white"
                            : "border-[#c6c9cf] bg-[#fffef8] text-transparent group-hover:border-[#779bd1]"
                        }`}
                      >
                        <CheckIcon />
                      </span>
                      <span className="min-w-0">
                        <span
                          className={`block text-[15px] font-semibold transition-colors ${
                            isComplete ? "text-[#315d9d]" : "text-[#13233d]"
                          }`}
                        >
                          {item.label}
                        </span>
                        <span className="mt-0.5 block text-xs leading-5 text-[#778196]">
                          {item.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-[#e6e4d8] pt-5">
              <span className="text-xs text-[#9097a5]">
                {completedCount === checklistItems.length
                  ? "Everything is ready."
                  : "Select each item to complete."}
              </span>
              <button
                className="rounded-lg px-2 py-1.5 text-xs font-semibold text-[#315d9d] transition-colors hover:bg-[#eaf2fd] disabled:cursor-not-allowed disabled:text-[#adb1b8] disabled:hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2f73db] focus-visible:ring-offset-2"
                disabled={completedCount === 0}
                onClick={() => setCompleted(new Set())}
                type="button"
              >
                Reset checklist
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
