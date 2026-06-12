import type { Metadata } from "next";
import Link from "next/link";
import { Coins, Heart, Leaf, Play } from "lucide-react";

import { Section } from "@/components/hana/section";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "La recharge",
  description:
    "Pourquoi et comment recharger sa bougie HANA : deux minutes, sans outil, et elle repart pour des semaines.",
};

const pourquoi = [
  {
    icon: Leaf,
    title: "Écologie",
    text: "Une bougie classique se jette — pot, verre, couvercle. Avec HANA, seul le cœur de cire se remplace. Moins de déchets, moins de matière, moins de transport.",
  },
  {
    icon: Coins,
    title: "Économie",
    text: `Votre première bougie coûte ${"49 €"} ; ensuite, chaque recharge coûte ${"19 €"}. Le plaisir continue, le budget respire.`,
  },
  {
    icon: Heart,
    title: "Émotion",
    text: "Le pot qui éclairait vos soirées d'hiver éclairera aussi les prochaines. On ne jette pas un objet qui a vécu vos moments — on le recharge.",
  },
];

const etapes = [
  {
    num: "01",
    title: "La bougie touche à sa fin",
    text: "La flamme faiblit, il reste un fond de cire. C'est le signal : votre pot est prêt pour une nouvelle vie.",
  },
  {
    num: "02",
    title: "On insère la recharge",
    text: "Retirez le résidu, glissez la recharge dans le pot. Elle s'ajuste d'elle-même, la mèche est déjà en place.",
  },
  {
    num: "03",
    title: "Elle repart pour des semaines",
    text: "Rallumez. Même pot, nouveau parfum si l'envie vous prend. Deux minutes ont suffi — sans outil.",
  },
];

const faqRecharge = [
  {
    q: "La recharge, c'est compliqué ?",
    a: "Deux minutes, sans outil. Une vidéo vous guide pas à pas — et si vous êtes bloquée, on vous répond en vrai, par email.",
  },
  {
    q: "Puis-je changer de parfum à chaque recharge ?",
    a: "Oui ! Le pot accueille n'importe quelle recharge HANA : fleur d'oranger, figuier, santal, vanille bourbon… et nos éditions limitées.",
  },
  {
    q: "Combien de temps dure une recharge ?",
    a: "Environ 45 heures de combustion — plusieurs semaines de soirées, au rythme de 2 à 3 heures par jour.",
  },
  {
    q: "Que faire du résidu de cire ?",
    a: "Il se décolle facilement une fois froid. La cire végétale part au compost ou à la poubelle classique — pas de produit chimique.",
  },
];

export default function LaRechargePage() {
  return (
    <main>
      {/* ---- Intro ---- */}
      <Section
        variant="creme"
        eyebrow="La recharge"
        title="La dernière bougie que vous achetez"
        subtitle="Chez HANA, la bougie ne meurt pas : elle se recharge. Voici pourquoi ça change tout — et comment ça marche, en trois gestes."
      />

      {/* ---- Pourquoi ---- */}
      <Section
        variant="white"
        eyebrow="Pourquoi"
        title="Trois bonnes raisons de ne plus jeter"
      >
        <div className="grid gap-10 md:grid-cols-3">
          {pourquoi.map((p) => (
            <div key={p.title}>
              <div className="mb-4 inline-flex rounded-full bg-sauge/15 p-3.5 text-sauge-dark">
                <p.icon className="size-6" />
              </div>
              <h3 className="font-serif text-xl">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-espresso/70">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- Comment : 3 étapes ---- */}
      <Section
        variant="espresso"
        eyebrow="Comment"
        title="La recharge en trois étapes"
        subtitle="Deux minutes, sans outil — promis."
      >
        <div className="grid gap-8 md:grid-cols-3">
          {etapes.map((s) => (
            <div
              key={s.num}
              className="rounded-lg border border-creme/10 bg-creme/5 p-6"
            >
              <p className="font-serif text-4xl text-ambre/80">{s.num}</p>
              <h3 className="mt-3 font-serif text-xl text-creme">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-creme/70">
                {s.text}
              </p>
            </div>
          ))}
        </div>

        {/* ---- Emplacement vidéo ---- */}
        {/* TODO : remplacer par la vraie vidéo (YouTube/Vimeo embed ou <video>) */}
        <div className="mt-12 flex aspect-video w-full items-center justify-center rounded-lg bg-gradient-to-br from-espresso-light via-espresso to-black ring-1 ring-creme/10">
          <div className="text-center">
            <span className="mx-auto flex size-16 items-center justify-center rounded-full bg-terracotta text-creme shadow-lg transition-transform hover:scale-105">
              <Play className="ml-1 size-7" />
            </span>
            <p className="mt-4 font-serif italic text-creme/70">
              La vidéo « Recharger sa HANA en 2 minutes » arrive bientôt
            </p>
          </div>
        </div>
      </Section>

      {/* ---- FAQ recharge ---- */}
      <Section
        variant="creme"
        eyebrow="Questions fréquentes"
        title="Tout savoir sur la recharge"
      >
        <div className="max-w-3xl space-y-3">
          {faqRecharge.map((item) => (
            <details
              key={item.q}
              className="group rounded-lg bg-white p-5 ring-1 ring-border open:shadow-sm"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-espresso [&::-webkit-details-marker]:hidden">
                {item.q}
                <span className="text-terracotta transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-espresso/75">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button size="lg" asChild>
            <Link href="/produit/recharge">
              Découvrir la recharge — {formatPrice(19)}
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/faq">Voir toute la FAQ</Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}
