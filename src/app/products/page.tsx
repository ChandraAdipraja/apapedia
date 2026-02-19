import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";
import { getProductsSSR } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams; // ✅ penting di Next 15/16
  const data = await getProductsSSR(q);

  return (
    <div className="space-y-6">
      <SearchBar defaultValue={q} action="/products" paramKey="q" />

      {data.products.length === 0 ? (
        <div className="rounded-2xl border bg-white p-8 text-center">
          <p className="font-semibold">Produk tidak ditemukan</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.products.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
