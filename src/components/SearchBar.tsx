"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type SearchBarProps = {
  placeholder?: string;
  defaultValue?: string;
  action?: string; // "/products"
  paramKey?: string; // "q"
};

export default function SearchBar({
  placeholder = "Cari produk...",
  defaultValue = "",
  action = "/products",
  paramKey = "q",
}: SearchBarProps) {
  const router = useRouter();
  const [value, setValue] = useState(defaultValue);
  const trimmed = useMemo(() => value.trim(), [value]);

  function go() {
    const params = new URLSearchParams();
    if (trimmed) params.set(paramKey, trimmed);
    const url = params.toString() ? `${action}?${params.toString()}` : action;
    router.push(url); // ✅ client-side navigation (cart aman)
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault(); // ✅ cegah reload
        go();
      }}
      className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-gray-50 text-gray-500">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            className="opacity-80"
          >
            <path
              d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d="M16.5 16.5 21 21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="relative flex-1">
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                go();
              }
            }}
            placeholder={placeholder}
            className="h-10 w-full rounded-xl border border-gray-200 bg-white pl-4 pr-10 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-[#03AC0E]/25"
          />

          {value.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setValue("");
                router.push(action); // reset list
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs text-gray-500 hover:bg-gray-100"
              aria-label="Clear search"
              title="Clear"
            >
              ✕
            </button>
          )}
        </div>

        <button
          type="submit"
          className="h-10 rounded-xl bg-[#03AC0E] px-5 text-sm font-medium text-white transition hover:bg-green-600"
        >
          Search
        </button>
      </div>
    </form>
  );
}
