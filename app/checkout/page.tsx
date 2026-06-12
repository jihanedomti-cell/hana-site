import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { UserRound } from "lucide-react";

import { CheckoutView } from "@/components/hana/checkout-view";
import { Section } from "@/components/hana/section";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Commande",
  robots: { index: false },
};

/* TODO phase 2 : paiement Stripe (session Checkout + webhook 'payee'),
   adresse de livraison, email de confirmation automatisé. */

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <main>
          <Section variant="creme" eyebrow="Commande" title="Un instant…" />
        </main>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}

async function CheckoutContent() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;

  if (!user) {
    return (
      <main>
        <Section variant="creme" eyebrow="Commande" title="Encore un instant ✨">
          <div className="max-w-md rounded-lg bg-white p-8 ring-1 ring-border">
            <span className="mb-4 inline-flex rounded-full bg-creme p-4 text-terracotta">
              <UserRound className="size-6" />
            </span>
            <p className="font-serif text-xl">
              Connectez-vous pour finaliser votre commande
            </p>
            <p className="mt-2 text-sm leading-relaxed text-espresso/70">
              Un email, un lien magique, et votre panier vous attend — il est
              précieusement conservé.
            </p>
            <Button size="lg" className="mt-6" asChild>
              <Link href="/auth/login?next=/checkout">Me connecter</Link>
            </Button>
          </div>
        </Section>
      </main>
    );
  }

  return (
    <main>
      <Section
        variant="creme"
        eyebrow="Commande"
        title="Vérifiez, puis confirmez"
      >
        <CheckoutView />
      </Section>
    </main>
  );
}
