"use client";

import { useState } from "react";
import { Check } from "lucide-react";

import { Button, type ButtonProps } from "@/components/ui/button";
import { addToCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

type Item = { slug: string; nom: string; prix: number; parfum: string };

/** Bouton « Ajouter au panier » avec confirmation visuelle. */
export function AddToCartButton({
  item,
  size = "sm",
  className,
  children,
}: {
  item: Item;
  size?: ButtonProps["size"];
  className?: string;
  children?: React.ReactNode;
}) {
  const [added, setAdded] = useState(false);

  function handleClick() {
    addToCart(item);
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  return (
    <Button
      size={size}
      onClick={handleClick}
      className={cn(added && "bg-sauge hover:bg-sauge", className)}
    >
      {added ? (
        <>
          <Check className="size-4" /> Ajouté
        </>
      ) : (
        (children ?? "Ajouter au panier")
      )}
    </Button>
  );
}

/**
 * Sélecteur de parfum + ajout au panier (fiche produit).
 * Le parfum choisi est enregistré avec l'article.
 */
export function ParfumSelector({
  slug,
  nom,
  prix,
  parfums,
}: {
  slug: string;
  nom: string;
  prix: number;
  parfums: string[];
}) {
  const [selected, setSelected] = useState(parfums[0] ?? "");

  return (
    <div className="space-y-5">
      {parfums.length > 1 && (
        <fieldset>
          <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-espresso/60">
            Choisissez votre parfum
          </legend>
          <div className="flex flex-wrap gap-2">
            {parfums.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setSelected(p)}
                aria-pressed={selected === p}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm transition-colors",
                  selected === p
                    ? "border-terracotta bg-terracotta text-creme"
                    : "border-espresso/20 text-espresso/75 hover:border-terracotta hover:text-terracotta",
                )}
              >
                {p}
              </button>
            ))}
          </div>
        </fieldset>
      )}
      <AddToCartButton
        item={{ slug, nom, prix, parfum: selected }}
        size="lg"
        className="w-full sm:w-auto"
      />
    </div>
  );
}
