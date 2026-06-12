import type { Metadata } from "next";

import { BoutiqueGrid } from "@/components/hana/boutique-grid";
import { Section } from "@/components/hana/section";
import { getCatalog } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Boutique",
  description:
    "Bougies rechargeables, recharges parfumées, coffrets et éditions limitées — fabriqués en France.",
};

export default async function BoutiquePage() {
  const products = await getCatalog();

  return (
    <main>
      <Section
        variant="creme"
        eyebrow="La boutique"
        title="Des bougies qui se gardent"
        subtitle="Bougies rechargeables, recharges parfumées, coffrets à offrir et éditions limitées — tout est fabriqué en France, tout est conçu pour durer."
      >
        <BoutiqueGrid products={products} />
      </Section>
    </main>
  );
}
