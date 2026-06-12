import type { Metadata } from "next";

import { Logo } from "@/components/hana/logo";
import { ProductCard } from "@/components/hana/product-card";
import { Section } from "@/components/hana/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false },
};

/* Page interne de validation du design system — ne pas lier depuis le site. */

const swatches = [
  { name: "Terracotta", hex: "#B0563C", cls: "bg-terracotta", text: "text-creme" },
  { name: "Ambre", hex: "#C99A4E", cls: "bg-ambre", text: "text-espresso" },
  { name: "Espresso", hex: "#2E211C", cls: "bg-espresso", text: "text-creme" },
  { name: "Crème", hex: "#F7F1E8", cls: "bg-creme", text: "text-espresso" },
  { name: "Sauge", hex: "#7E9688", cls: "bg-sauge", text: "text-creme" },
  { name: "Blanc", hex: "#FFFFFF", cls: "bg-white", text: "text-espresso" },
];

export default function DesignPage() {
  return (
    <main>
      {/* ---- Logo ---- */}
      <Section
        variant="white"
        eyebrow="Design system"
        title="HANA — Charte graphique"
        subtitle="Page interne de validation : tokens, typographies et composants."
      >
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="flex items-center justify-center rounded-lg bg-creme p-10 ring-1 ring-border">
            <Logo size="lg" />
          </div>
          <div className="flex items-center justify-center rounded-lg bg-espresso p-10">
            <Logo size="lg" variant="light" />
          </div>
        </div>
      </Section>

      {/* ---- Palette ---- */}
      <Section variant="creme" eyebrow="Tokens" title="Palette">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {swatches.map((s) => (
            <div
              key={s.name}
              className={`${s.cls} ${s.text} flex aspect-square flex-col justify-end rounded-lg p-4 ring-1 ring-espresso/10`}
            >
              <p className="font-serif text-base">{s.name}</p>
              <p className="text-xs opacity-75">{s.hex}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- Typographie ---- */}
      <Section variant="white" eyebrow="Tokens" title="Typographie">
        <div className="space-y-6">
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.25em] text-espresso/50">
              Playfair Display — titres
            </p>
            <p className="font-serif text-4xl leading-tight">
              Certains moments méritent de ne jamais s&apos;éteindre.
            </p>
          </div>
          <div>
            <p className="mb-1 text-xs uppercase tracking-[0.25em] text-espresso/50">
              Inter — texte courant
            </p>
            <p className="max-w-2xl leading-relaxed text-espresso/80">
              HANA est une bougie artisanale, parfumée et rechargeable,
              fabriquée en France. Quand la flamme touche à sa fin, on insère
              une recharge — et elle repart pour des semaines. Deux minutes,
              sans outil.
            </p>
          </div>
        </div>
      </Section>

      {/* ---- Boutons ---- */}
      <Section variant="creme" eyebrow="Composants" title="Boutons">
        <div className="flex flex-wrap items-center gap-4">
          <Button>Découvrir</Button>
          <Button variant="ambre">−10 % de bienvenue</Button>
          <Button variant="secondary">Engagement responsable</Button>
          <Button variant="outline">En savoir plus</Button>
          <Button variant="ghost">Annuler</Button>
          <Button variant="link">Voir la FAQ</Button>
          <Button size="lg">Ajouter au panier</Button>
          <Button size="sm">Détails</Button>
        </div>
        <div className="mt-6 rounded-lg bg-espresso p-6">
          <p className="mb-4 text-xs uppercase tracking-[0.25em] text-creme/60">
            Sur section espresso
          </p>
          <div className="flex flex-wrap gap-4">
            <Button>Découvrir</Button>
            <Button variant="outlineLight">Notre histoire</Button>
          </div>
        </div>
      </Section>

      {/* ---- Cartes produit ---- */}
      <Section
        variant="white"
        eyebrow="Composants"
        title="Carte produit"
        subtitle="Placeholders aux couleurs de la charte en attendant les photos."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard
            slug="bougie-signature"
            name="Bougie signature"
            parfum="Fleur d'oranger"
            price={49}
            href="#"
            badge="Best-seller"
            palette="terracotta"
          />
          <ProductCard
            slug="recharge"
            name="Recharge"
            parfum="4 parfums au choix"
            price={19}
            href="#"
            palette="sauge"
          />
          <ProductCard
            slug="coffret-decouverte"
            name="Coffret découverte"
            parfum="Bougie + 2 recharges"
            price={79}
            href="#"
            palette="ambre"
          />
          <ProductCard
            slug="edition-limitee"
            name="Édition limitée"
            parfum="Santal"
            price={69}
            href="#"
            badge="Édition limitée"
            palette="espresso"
          />
        </div>
      </Section>

      {/* ---- Variantes de section ---- */}
      <Section
        variant="espresso"
        eyebrow="Composants"
        title="Section espresso"
        subtitle="Pour les moments forts : la recharge, l'engagement, le footer."
      >
        <Button variant="outlineLight">Exemple d&apos;action</Button>
      </Section>
      <Section
        variant="sauge"
        eyebrow="Composants"
        title="Section sauge"
        subtitle="Pour les blocs nature & consommation responsable."
      />
    </main>
  );
}
