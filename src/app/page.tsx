import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import { getCategories, getFeaturedProducts } from "@/lib/api";

export default async function HomePage() {
  const [categories, featured] = await Promise.all([
    getCategories(),
    getFeaturedProducts(),
  ]);

  return (
    <div className="space-y-10">
      {/* HERO */}
      <section className="rounded-2xl bg-gradient-to-r from-[#03AC0E] to-green-600 p-8 text-white shadow-md">
        <h1 className="text-3xl font-bold">Belanja Mudah & Cepat</h1>
        <p className="mt-2 text-sm text-green-100">
          Temukan produk terbaik dengan harga menarik setiap hari.
        </p>

        <Link
          href="/products"
          className="mt-5 inline-block rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-[#03AC0E] hover:bg-gray-100 transition"
        >
          Mulai Belanja
        </Link>
      </section>

      {/* KATEGORI */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Kategori Populer</h2>
          <Link
            href="/products"
            className="text-sm font-medium text-[#03AC0E] hover:underline"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap gap-3">
          {categories.slice(0, 10).map((c: any, i: number) => {
            const label =
              typeof c === "string" ? c : (c?.name ?? c?.slug ?? `cat-${i}`);
            const key = typeof c === "string" ? c : (c?.slug ?? c?.name ?? i);

            return (
              <span
                key={key}
                className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-50 hover:text-[#03AC0E] transition cursor-pointer"
              >
                {label}
              </span>
            );
          })}
        </div>
      </section>

      {/* PRODUK REKOMENDASI */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">
            Rekomendasi Untuk Kamu
          </h2>
          <Link
            href="/products"
            className="text-sm font-medium text-[#03AC0E] hover:underline"
          >
            Lihat Semua
          </Link>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {featured.slice(0, 8).map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">
        <h3 className="text-lg font-bold text-gray-900">
          Siap Belanja Lebih Banyak?
        </h3>
        <p className="mt-2 text-sm text-gray-600">
          Jelajahi semua produk dan temukan favoritmu sekarang.
        </p>

        <Link
          href="/products"
          className="mt-4 inline-block rounded-xl bg-[#03AC0E] px-6 py-2.5 text-sm font-semibold text-white hover:bg-green-600 transition"
        >
          Lihat Semua Produk
        </Link>
      </section>
    </div>
  );
}
