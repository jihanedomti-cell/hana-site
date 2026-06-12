"use client";

import { useState } from "react";

import { ProductCard } from "@/components/hana/product-card";
import type { CatalogProduct } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type Filter = "tous" | "bougie" | "recharge" | "coffret" | "edition";

const filters: { value: Filter; label: string }[] = [
  { value: "tous", label: "Tout" },
  { value: "bougie", label: "Bougies" },
  { value: "recharge", label: "Recharges" },
  { value: "coffret", label: "Coffrets" },
  { value: "edition", label: "Éditions limitées" },
];

/** Grille boutique filtrable par catégorie (filtrage côté client, instantané). */
export function BoutiqueGrid({ products }: { products: CatalogProduct[] }) {
  const [filter, setFilter] = useState<Filter>("tous");

  const visible =
    filter === "tous" ? products : products.filter((p) => p.type === filter);

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filtrer par catégorie"
        className="mb-10 flex flex-wrap gap-2"
      >
        {filters.map((f) => (
          <button
            key={f.value}
            role="tab"
            aria-selected={filter === f.value}
            onClick={() => setFilter(f.value)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-colors",
              filter === f.value
                ? "border-terracotta bg-terracotta text-creme"
                : "border-espresso/20 text-espresso/75 hover:border-terracotta hover:text-terracotta",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="py-16 text-center text-espresso/60">
          Aucun produit dans cette catégorie pour le moment.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard
              key={p.slug}
              slug={p.slug}
              name={p.nom}
              parfum={
                p.parfums.length > 1
                  ? `${p.parfums.length} parfums au choix`
                  : p.parfums[0]
              }
              firstParfum={p.parfums[0]}
              price={p.prix}
              href={`/produit/${p.slug}`}
              badge={p.badge}
              palette={p.palette}
              imageUrl={p.imageUrl}
            />
          ))}
        </div>
      )}
    </div>
  );
}
