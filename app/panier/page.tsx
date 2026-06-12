import type { Metadata } from "next";

import { CartView } from "@/components/hana/cart-view";
import { Section } from "@/components/hana/section";

export const metadata: Metadata = {
  title: "Mon panier",
  robots: { index: false },
};

export default function PanierPage() {
  return (
    <main>
      <Section variant="creme" eyebrow="Panier" title="Mon panier">
        <CartView />
      </Section>
    </main>
  );
}
