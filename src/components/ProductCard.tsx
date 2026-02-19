"use client";

import Image from "next/image";
import { useCart } from "@/context/CartContext";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  thumbnail: string;
};

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();

  return (
    <article className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] w-full bg-gray-50">
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-contain p-4"
          sizes="(max-width: 1024px) 50vw, 25vw"
        />
      </div>

      <div className="p-3">
        <h3 className="line-clamp-1 text-sm font-semibold text-gray-800">
          {product.title}
        </h3>

        <div className="mt-1 flex items-center justify-between">
          <p className="text-lg font-bold text-[#03AC0E]">${product.price}</p>
          <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600">
            ⭐ {Number(product.rating).toFixed(1)}
          </span>
        </div>

        <p className="mt-1 line-clamp-1 text-xs text-gray-500">
          {product.category}
        </p>

        <button
          onClick={() =>
            add({
              id: product.id,
              title: product.title,
              price: product.price,
              thumbnail: product.thumbnail,
              category: product.category,
            })
          }
          className="mt-3 w-full rounded-lg bg-[#03AC0E] py-2 text-sm font-semibold text-white hover:bg-green-600 transition"
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}
