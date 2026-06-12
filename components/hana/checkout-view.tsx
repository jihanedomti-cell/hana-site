"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldCheck, ShoppingBag } from "lucide-react";

import { placeOrder } from "@/app/checkout/actions";
import { Button } from "@/components/ui/button";
import { clearCart, getCart, type CartItem } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

/** Récapitulatif de commande + confirmation (panier → Supabase). */
export function CheckoutView() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setItems(getCart());
  }, []);

  if (items === null) return <div className="min-h-[30vh]" />;

  if (items.length === 0) {
    return (
      <div className="flex min-h-[30vh] flex-col items-center justify-center gap-5 text-center">
        <span className="rounded-full bg-creme p-5 text-terracotta">
          <ShoppingBag className="size-8" />
        </span>
        <p className="font-serif text-2xl">Votre panier est vide</p>
        <Button size="lg" asChild>
          <Link href="/boutique">Découvrir la boutique</Link>
        </Button>
      </div>
    );
  }

  const total = items.reduce((t, i) => t + i.prix * i.quantite, 0);

  function confirm() {
    setError(null);
    startTransition(async () => {
      const result = await placeOrder(
        items!.map(({ slug, parfum, quantite }) => ({ slug, parfum, quantite })),
      );

      if (result.ok) {
        clearCart();
        router.push(`/commande-confirmee/${result.orderId}`);
        return;
      }
      if (result.error === "auth") {
        router.push("/auth/login?next=/checkout");
        return;
      }
      setError(
        result.error === "produit_inconnu"
          ? "Un produit de votre panier n'est plus disponible. Retournez au panier pour l'ajuster."
          : "Une erreur est survenue lors de l'enregistrement. Réessayez dans un instant.",
      );
    });
  }

  return (
    <div className="mx-auto max-w-xl">
      <ul className="space-y-3 rounded-lg bg-white p-6 ring-1 ring-border">
        {items.map((i) => (
          <li
            key={`${i.slug}-${i.parfum}`}
            className="flex items-baseline justify-between gap-3 text-sm"
          >
            <span>
              {i.nom} <em className="text-espresso/60">— {i.parfum}</em>
              <span className="text-espresso/60"> × {i.quantite}</span>
            </span>
            <span className="shrink-0 font-medium">
              {formatPrice(i.prix * i.quantite)}
            </span>
          </li>
        ))}
        <li className="flex items-baseline justify-between border-t border-espresso/10 pt-3 font-serif text-lg font-semibold">
          <span>Total</span>
          <span className="text-terracotta">{formatPrice(total)}</span>
        </li>
      </ul>

      <div className="mt-6 rounded-lg bg-sauge/15 p-4 text-sm leading-relaxed text-espresso/75">
        <p className="flex items-start gap-2">
          <ShieldCheck className="mt-0.5 size-4 shrink-0 text-sauge-dark" />
          Le paiement en ligne ouvre très bientôt. En confirmant, votre
          commande est <strong>enregistrée et réservée</strong> — nous vous
          écrirons dès l&apos;ouverture pour la régler.
        </p>
      </div>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      <Button
        size="lg"
        className="mt-6 w-full"
        onClick={confirm}
        disabled={pending}
      >
        {pending ? "Enregistrement…" : "Confirmer ma commande"}
      </Button>
      <Button variant="link" className="mt-2 w-full" asChild>
        <Link href="/panier">← Modifier mon panier</Link>
      </Button>
    </div>
  );
}
