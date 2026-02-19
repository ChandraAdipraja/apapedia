"use client";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-red-700">
        Gagal memuat produk
      </h2>
      <p className="mt-2 text-sm text-zinc-600">
        Coba refresh atau klik tombol di bawah.
      </p>
      <button
        onClick={reset}
        className="mt-4 rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800"
      >
        Coba lagi
      </button>
    </div>
  );
}
