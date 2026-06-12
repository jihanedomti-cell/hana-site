import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Suspense } from "react";
import { CheckCircle2 } from "lucide-react";

import { Section } from "@/components/hana/section";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Commande confirmée",
  robots: { index: false },
};

type Props = { params: Promise<{ id: string }> };

export default function CommandeConfirmeePage({ params }: Props) {
  return (
    <Suspense
      fallback={
        <main>
          <Section variant="creme" eyebrow="Commande" title="Un instant…" />
        </main>
      }
    >
      <ConfirmationContent params={params} />
    </Suspense>
  );
}

type ItemRow = {
  quantite: number;
  prix: number;
  products: { nom: string; slug: string } | null;
  product_variants: { parfum: string } | null;
};

async function ConfirmationContent({ params }: Props) {
  const { id } = await params;

  const supabase = await createClient();
  const { data: auth } = await supabase.auth.getClaims();
  if (!auth?.claims) redirect("/auth/login");

  // RLS : seule la propriétaire de la commande peut la lire
  const { data: order } = await supabase
    .from("orders")
    .select("id, statut, total, date")
    .eq("id", id)
    .maybeSingle();

  if (!order) notFound();

  const { data: items } = await supabase
    .from("order_items")
    .select("quantite, prix, products(nom, slug), product_variants(parfum)")
    .eq("order_id", order.id)
    .returns<ItemRow[]>();

  return (
    <main>
      <Section variant="creme">
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto mb-5 inline-flex rounded-full bg-sauge/15 p-5 text-sauge-dark">
            <CheckCircle2 className="size-9" />
          </span>
          <h1 className="font-serif text-3xl md:text-4xl">
            Merci, votre commande est enregistrée ✨
          </h1>
          <p className="mt-4 leading-relaxed text-espresso/70">
            Commande du{" "}
            {new Date(order.date).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            — elle est réservée à votre nom. Le paiement en ligne ouvre très
            bientôt : nous vous écrirons pour la régler, sans rien refaire.
          </p>

          <div className="mt-8 rounded-lg bg-white p-6 text-left ring-1 ring-border">
            <ul className="space-y-3">
              {(items ?? []).map((item, i) => (
                <li
                  key={i}
                  className="flex items-baseline justify-between gap-3 text-sm"
                >
                  <span>
                    {item.products?.nom ?? "Produit"}
                    {item.product_variants?.parfum && (
                      <em className="text-espresso/60">
                        {" "}
                        — {item.product_variants.parfum}
                      </em>
                    )}
                    <span className="text-espresso/60"> × {item.quantite}</span>
                  </span>
                  <span className="shrink-0 font-medium">
                    {formatPrice(item.prix * item.quantite)}
                  </span>
                </li>
              ))}
              <li className="flex items-baseline justify-between border-t border-espresso/10 pt-3 font-serif text-lg font-semibold">
                <span>Total</span>
                <span className="text-terracotta">
                  {formatPrice(Number(order.total))}
                </span>
              </li>
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/compte">Suivre ma commande</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/boutique">Continuer mes achats</Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
