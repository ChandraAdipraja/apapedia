export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-7 w-40 rounded-lg bg-zinc-200" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-zinc-200 bg-white p-5"
          >
            <div className="h-4 w-16 rounded bg-zinc-200" />
            <div className="mt-3 h-5 w-3/4 rounded bg-zinc-200" />
            <div className="mt-3 h-4 w-full rounded bg-zinc-200" />
            <div className="mt-2 h-4 w-5/6 rounded bg-zinc-200" />
            <div className="mt-4 h-8 w-24 rounded-full bg-zinc-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
