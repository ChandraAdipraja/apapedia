"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const { items, total, count, inc, dec, remove, clear } = useCart();

  return (
    <div className="min-h-[calc(100vh-72px)] space-y-6">
      <div className="space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="mt-1 text-2xl font-bold text-gray-900">Cart</h1>
            <p className="mt-1 text-sm text-gray-600">
              {count} item • Total{" "}
              <span className="font-bold text-[#03AC0E]">
                ${total.toFixed(2)}
              </span>
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={clear}
              disabled={items.length === 0}
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-40"
            >
              Clear
            </button>
          </div>
        </div>

        {items.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <p className="text-gray-700 font-semibold">
              Cart kamu masih kosong.
            </p>
            <p className="mt-1 text-sm text-gray-500">
              Tambahkan produk dari halaman Products.
            </p>
            <Link
              href="/products"
              className="mt-4 inline-flex rounded-xl bg-[#03AC0E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-green-600 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 lg:grid-cols-3">
            {/* items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    {/* Thumbnail */}
                    <div className="flex items-center gap-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                        <Image
                          src={it.thumbnail}
                          alt={it.title}
                          fill
                          className="object-contain p-2"
                          sizes="64px"
                        />
                      </div>

                      {/* Title */}
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-900">
                          {it.title}
                        </p>
                        <p className="text-xs text-gray-500">{it.category}</p>
                        <p className="mt-1 text-sm font-bold text-[#03AC0E]">
                          ${it.price}
                        </p>
                      </div>
                    </div>

                    {/* Right controls */}
                    <div className="sm:ml-auto flex items-center justify-between gap-3">
                      {/* Qty */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => dec(it.id)}
                          className="h-9 w-9 rounded-lg border border-gray-600 text-[#03AC0E] bg-white hover:bg-gray-50"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm text-[#03AC0E] font-semibold">
                          {it.qty}
                        </span>
                        <button
                          onClick={() => inc(it.id)}
                          className="h-9 w-9 rounded-lg border border-gray-600 text-[#03AC0E] bg-white hover:bg-gray-50"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      {/* Price + Remove */}
                      <div className="text-right">
                        <p className="text-sm font-semibold text-gray-900">
                          ${(it.price * it.qty).toFixed(2)}
                        </p>
                        <button
                          onClick={() => remove(it.id)}
                          className="mt-1 text-xs font-semibold text-red-600 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* summary */}
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm h-fit">
              <h2 className="text-base font-bold text-gray-900">Summary</h2>
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Items</span>
                  <span>{count}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-bold">
                  <span className="text-gray-600">Total</span>
                  <span className="text-[#03AC0E]">${total.toFixed(2)}</span>
                </div>
              </div>

              <button className="mt-4 w-full rounded-xl bg-[#03AC0E] py-2.5 text-sm font-semibold text-white hover:bg-green-600 transition">
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
