"use client";

import { useEffect, useState } from "react";

import { CART_EVENT, cartCount } from "@/lib/cart";

/** Pastille du nombre d'articles, mise à jour en direct via CART_EVENT. */
export function CartBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => setCount(cartCount());
    update(); // état initial (après hydratation, évite les mismatchs SSR)
    window.addEventListener(CART_EVENT, update);
    window.addEventListener("storage", update); // sync entre onglets
    return () => {
      window.removeEventListener(CART_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  if (count === 0) return null;

  return (
    <span className="absolute -right-0.5 -top-0.5 flex size-4.5 min-w-[1.125rem] items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-semibold leading-none text-creme">
      {count}
    </span>
  );
}
