import type { Metadata } from "next";
import Link from "next/link";
import { Gift } from "lucide-react";

import { Section } from "@/components/hana/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Parrainage",
  robots: { index: false },
};

/* TODO phase 2 : programme de parrainage
   - Génération du code unique (table referrals, parrain_id = cliente)
   - Saisie du code au checkout → −10 % filleule
   - Statut 'valide' à la première commande → recharge offerte à la marraine
   - Suivi dans /compte */

export default function ParrainagePage() {
  return (
    <main>
      <Section variant="creme" className="text-center">
        <div className="mx-auto max-w-md py-10">
          <span className="mx-auto mb-6 inline-flex rounded-full bg-ambre/20 p-5 text-ambre">
            <Gift className="size-8" />
          </span>
          <h1 className="font-serif text-3xl">Le parrainage arrive bientôt</h1>
          <p className="mt-4 leading-relaxed text-espresso/70">
            Offrez −10 % à une amie sur sa première bougie, recevez une
            recharge offerte quand elle commande. Les amitiés aussi méritent
            de ne jamais s&apos;éteindre. 🌿
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="/boutique">En attendant, la boutique</Link>
            </Button>
          </div>
        </div>
      </Section>
    </main>
  );
}
