"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { PlaceholderImage } from "@/components/hana/placeholder-image";
import { Button } from "@/components/ui/button";
import {
  CART_EVENT,
  getCart,
  removeFromCart,
  setQuantite,
  type CartItem,
} from "@/lib/cart";
import { formatPrice } from "@/lib/format";

/**
 * Contenu du panier — lit le localStorage côté client.
 * TODO Supabase : si la cliente est connectée, synchroniser le panier avec
 * une commande `orders` en statut 'en_attente' (fusion à la connexion).
 * TODO phase 2 : bouton « Passer commande » → vrai checkout Stripe.
 */
export function CartView() {
  const [items, setItems] = useState<CartItem[] | null>(null); // null = pas encore hydraté

  useEffect(() => {
    const update = () => setItems(getCart());
    update();
    window.addEventListener(CART_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(CART_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  // Avant hydratation : ne rien afficher (évite un flash « panier vide »)
  if (items === null) return <div className="min-h-[30vh]" />;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[30vh] flex-col items-center justify-center gap-5 text-center">
        <span className="rounded-full bg-creme p-5 text-terracotta">
          <ShoppingBag className="size-8" />
        </span>
        <div>
          <p className="font-serif text-2xl">Votre panier est vide</p>
          <p className="mt-2 text-sm text-espresso/60">
            Il n&apos;attend qu&apos;une bougie — celle que vous garderez.
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/boutique">Découvrir la boutique</Link>
        </Button>
      </div>
    );
  }

  const total = items.reduce((t, i) => t + i.prix * i.quantite, 0);

  return (
    <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
      {/* ---- Articles ---- */}
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={`${item.slug}-${item.parfum}`}
            className="flex gap-4 rounded-lg bg-white p-4 ring-1 ring-border"
          >
            <Link href={`/produit/${item.slug}`} className="w-24 shrink-0">
              <PlaceholderImage
                palette="terracotta"
                className="rounded-md"
              />
            </Link>
            <div className="flex flex-1 flex-col justify-between gap-2">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Link
                    href={`/produit/${item.slug}`}
                    className="font-serif text-lg leading-snug hover:text-terracotta"
                  >
                    {item.nom}
                  </Link>
                  <p className="text-sm italic text-espresso/60">
                    {item.parfum}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => removeFromCart(item.slug, item.parfum)}
                  aria-label={`Retirer ${item.nom} (${item.parfum}) du panier`}
                  className="rounded-full p-2 text-espresso/40 transition-colors hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 rounded-full border border-espresso/15">
                  <button
                    type="button"
                    onClick={() =>
                      setQuantite(item.slug, item.parfum, item.quantite - 1)
                    }
                    aria-label="Diminuer la quantité"
                    className="rounded-full p-2 text-espresso/60 hover:text-terracotta"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="min-w-6 text-center text-sm font-medium">
                    {item.quantite}
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setQuantite(item.slug, item.parfum, item.quantite + 1)
                    }
                    aria-label="Augmenter la quantité"
                    className="rounded-full p-2 text-espresso/60 hover:text-terracotta"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
                <p className="font-serif font-semibold text-terracotta">
                  {formatPrice(item.prix * item.quantite)}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* ---- Récapitulatif ---- */}
      <aside className="h-fit rounded-lg bg-white p-6 ring-1 ring-border">
        <h2 className="font-serif text-xl">Récapitulatif</h2>
        <dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <dt className="text-espresso/70">Sous-total</dt>
            <dd>{formatPrice(total)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-espresso/70">Livraison</dt>
            <dd className="text-sauge-dark">
              {total >= 49 ? "Offerte" : "Calculée à l'étape suivante"}
            </dd>
          </div>
          <div className="flex justify-between border-t border-espresso/10 pt-3 font-serif text-lg font-semibold">
            <dt>Total</dt>
            <dd className="text-terracotta">{formatPrice(total)}</dd>
          </div>
        </dl>
        <Button size="lg" className="mt-6 w-full" asChild>
          <Link href="/checkout">Passer commande</Link>
        </Button>
        <p className="mt-3 text-center text-xs text-espresso/50">
          Paiement sécurisé — bientôt disponible
        </p>
        <Button variant="link" className="mt-2 w-full" asChild>
          <Link href="/boutique">← Continuer mes achats</Link>
        </Button>
      </aside>
    </div>
  );
}
