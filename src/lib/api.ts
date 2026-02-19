const BASE = "https://dummyjson.com";

export async function getCategories() {
  const res = await fetch(`${BASE}/products/categories`);
  return res.json();
}

// buat home (SSG) - cukup sedikit
export async function getFeaturedProducts() {
  const res = await fetch(`${BASE}/products?limit=8`);
  const json = await res.json();
  return json.products;
}

export async function getProductsSSR(q?: string) {
  const keyword = q?.trim() ?? "";

  const url = keyword
    ? `${BASE}/products/search?q=${encodeURIComponent(keyword)}`
    : `${BASE}/products?limit=24`;

  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch products");

  return res.json(); // { products, total, skip, limit }
}
