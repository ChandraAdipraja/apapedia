"use client";
import "./globals.css";
import Link from "next/link";
import { CartProvider, useCart } from "@/context/CartContext";
import { usePathname } from "next/navigation";
import React from "react";

/* ========================= */
/* Client Navbar (inline) */
/* ========================= */

function NavbarClient() {
  "use client";

  const pathname = usePathname();
  const { count } = useCart();

  function navClass(path: string) {
    const active = pathname === path;

    return `
      relative px-3 py-2 rounded-lg text-sm font-medium transition
      ${active ? "text-[#03AC0E]" : "text-gray-600 hover:text-[#03AC0E]"}
    `;
  }

  return (
    <nav className="flex items-center gap-6 text-sm font-medium">
      <Link href="/" className={navClass("/")}>
        Home
      </Link>

      <Link href="/products" className={navClass("/products")}>
        Products
      </Link>

      <Link href="/cart" className={navClass("/cart")}>
        <span className="flex items-center gap-2">
          Cart
          {count > 0 && (
            <span className="rounded-full bg-[#03AC0E] px-2 py-0.5 text-xs font-semibold text-white">
              {count}
            </span>
          )}
        </span>
      </Link>
    </nav>
  );
}

/* ========================= */
/* Layout Root */
/* ========================= */

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-[#F5F5F5] text-gray-900">
        <main className=" bg-white">
          <div className="mx-auto max-w-7xl px-6">
            {" "}
            <CartProvider>
              <header className="bg-white border-b border-gray-200">
                <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
                  <h1 className="text-lg font-bold text-[#03AC0E]">APAPEDIA</h1>

                  <NavbarClient />
                </div>
              </header>
              {/* header, main, footer */}
              {children}
            </CartProvider>
          </div>
        </main>
      </body>
    </html>
  );
}
