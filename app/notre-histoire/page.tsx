import type { Metadata } from "next";
import Link from "next/link";
import { Flame, Flower2, Hand, Recycle } from "lucide-react";

import { PlaceholderImage } from "@/components/hana/placeholder-image";
import { Section } from "@/components/hana/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Notre histoire",
  description:
    "Pourquoi HANA existe : des bougies artisanales françaises, conçues pour être rechargées — pas jetées.",
};

const savoirFaire = [
  {
    icon: Flower2,
    title: "Parfums de Grasse",
    text: "Nos fragrances sont composées à Grasse, capitale mondiale du parfum, avec des maisons qui travaillent la fleur depuis des générations.",
  },
  {
    icon: Flame,
    title: "Cire végétale",
    text: "Une cire 100 % végétale, sans paraffine, coulée à basse température pour préserver le parfum du premier au dernier allumage.",
  },
  {
    icon: Hand,
    title: "Assemblage artisanal",
    text: "Chaque bougie est assemblée à la main dans notre atelier français. Mèche centrée, parfum dosé, pot vérifié — un par un.",
  },
  {
    icon: Recycle,
    title: "Pensée pour durer",
    text: "Le pot en grès est conçu pour des années de recharges. C'est l'inverse de l'obsolescence : un objet qui s'embellit en vieillissant.",
  },
];

export default function NotreHistoirePage() {
  return (
    <main>
      {/* ---- Le pourquoi ---- */}
      <Section
        variant="creme"
        eyebrow="Notre histoire"
        title="Tout est parti d'une bougie qu'on n'arrivait pas à jeter"
      >
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-5 leading-relaxed text-espresso/80">
            <p>
              C&apos;était une bougie offerte pour un déménagement. Elle avait
              parfumé un premier hiver, des dîners entre amies, des dimanches
              de pluie. Et puis un soir, la flamme s&apos;est éteinte — pour de
              bon. Le pot a fini au fond d&apos;un placard, trop chargé de
              souvenirs pour la poubelle, trop vide pour servir.
            </p>
            <p>
              HANA est née de cette absurdité : pourquoi un objet qui abrite
              nos moments devrait-il être jetable ? Nous avons dessiné un pot
              en grès fait pour durer des années, et une recharge qui s&apos;y
              glisse en deux minutes. La bougie devient ce qu&apos;elle aurait
              toujours dû être : un compagnon, pas un consommable.
            </p>
            <p className="font-serif text-lg italic text-terracotta">
              Certains moments méritent de ne jamais s&apos;éteindre.
            </p>
          </div>
          <PlaceholderImage
            palette="ambre"
            label="L'atelier"
            className="rounded-lg shadow-lg shadow-espresso/10"
          />
        </div>
      </Section>

      {/* ---- Savoir-faire ---- */}
      <Section
        variant="white"
        eyebrow="Savoir-faire"
        title="Fabriquée en France, du parfum au pot"
        subtitle="Quatre exigences, aucune exception."
      >
        <div className="grid gap-10 sm:grid-cols-2">
          {savoirFaire.map((s) => (
            <div key={s.title} className="flex gap-4">
              <div className="h-fit rounded-full bg-creme p-3.5 text-terracotta">
                <s.icon className="size-6" />
              </div>
              <div>
                <h3 className="font-serif text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-espresso/70">
                  {s.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- Engagement durable ---- */}
      <Section
        variant="sauge"
        eyebrow="Engagement durable"
        title="Moins, mais mieux"
        subtitle="Nous ne serons jamais la marque qui vous pousse à racheter. Notre modèle repose sur l'inverse : un pot que vous gardez, des recharges que vous choisissez."
      >
        <div className="grid gap-6 text-sm leading-relaxed text-espresso/80 sm:grid-cols-3">
          <p>
            <strong className="font-serif text-2xl text-sauge-dark">−70 %</strong>
            <br />
            de déchets par rapport à une bougie classique sur deux ans
            d&apos;utilisation.
          </p>
          <p>
            <strong className="font-serif text-2xl text-sauge-dark">100 %</strong>
            <br />
            de la fabrication réalisée en France, des parfums à
            l&apos;assemblage.
          </p>
          <p>
            <strong className="font-serif text-2xl text-sauge-dark">0</strong>
            <br />
            plastique dans nos emballages d&apos;expédition.
          </p>
        </div>
      </Section>

      {/* ---- CTA ---- */}
      <Section variant="espresso" className="text-center">
        <h2 className="font-serif text-3xl md:text-4xl">
          Commencez votre histoire
        </h2>
        <p className="mx-auto mt-4 max-w-md text-creme/75">
          Une bougie signature, un parfum qui vous ressemble — et des années de
          moments devant vous.
        </p>
        <div className="mt-8">
          <Button size="lg" asChild>
            <Link href="/boutique">Découvrir la boutique</Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}
