import type { Metadata } from "next";
import Link from "next/link";
import { CreditCard } from "lucide-react";

import { Section } from "@/components/hana/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Commande",
  robots: { index: false },
};

/* TODO phase 2 : checkout Stripe
   - Création de la commande (orders + order_items) côté serveur
   - Session Stripe Checkout, webhook de confirmation (statut → 'payee')
   - Email de confirmation automatisé
   - Décrément des stocks product_variants */

export default function CheckoutPage() {
  return (
    <main>
      <Section variant="creme" className="text-center">
        <div className="mx-auto max-w-md py-10">
          <span className="mx-auto mb-6 inline-flex rounded-full bg-sauge/15 p-5 text-sauge-dark">
            <CreditCard className="size-8" />
          </span>
          <h1 className="font-serif text-3xl">
            Le paiement en ligne arrive très bientôt
          </h1>
          <p className="mt-4 leading-relaxed text-espresso/70">
            Nous finalisons un paiement 100 % sécurisé. Votre panier est
            précieusement conservé — vous pourrez commander dès l&apos;ouverture.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/panier">Retour à mon panier</Link>
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
