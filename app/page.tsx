import Link from "next/link";
import {
  Flame,
  Heart,
  Infinity as InfinityIcon,
  Leaf,
  MapPin,
  Package,
  RefreshCw,
  Sparkles,
} from "lucide-react";

import { NewsletterForm } from "@/components/hana/newsletter-form";
import { PlaceholderImage } from "@/components/hana/placeholder-image";
import { ProductCard } from "@/components/hana/product-card";
import { Section } from "@/components/hana/section";
import { Stars } from "@/components/hana/stars";
import { Button } from "@/components/ui/button";
import { getCatalog, getValidatedReviews } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

/* ============================================================
   Page d'accueil HANA
   Hero → piliers → produit phare → comment ça marche →
   best-sellers → avis → engagement → newsletter
   (Navbar et Footer sont dans le layout.)
   ============================================================ */

const pillars = [
  {
    icon: RefreshCw,
    title: "Rechargeable",
    text: "Quand la flamme touche à sa fin, une recharge suffit. Votre bougie repart pour des semaines.",
  },
  {
    icon: MapPin,
    title: "Fabriquée en France",
    text: "Cire végétale et parfums de Grasse, assemblage artisanal. Le savoir-faire français, chez vous.",
  },
  {
    icon: InfinityIcon,
    title: "Conçue pour durer",
    text: "Un pot en grès qu'on garde, qu'on offre, qu'on transmet. La dernière bougie que vous achetez.",
  },
];

const steps = [
  {
    num: "01",
    title: "La bougie touche à sa fin",
    text: "La flamme faiblit, la cire s'épuise — mais le pot, lui, reste.",
  },
  {
    num: "02",
    title: "On insère la recharge",
    text: "Deux minutes, sans outil. La recharge se glisse dans le pot, la mèche est prête.",
  },
  {
    num: "03",
    title: "Elle repart pour des semaines",
    text: "Même pot, nouveau parfum si vous voulez. Vos moments continuent.",
  },
];

export default async function Home() {
  // Catalogue + avis : Supabase si configuré, sinon données de démo (repli).
  const catalog = await getCatalog();
  const reviews = await getValidatedReviews();
  const featuredProduct =
    catalog.find((p) => p.slug === "bougie-signature") ?? catalog[0];
  const bestSellers = catalog
    .filter((p) => p.slug !== "abonnement-recharges")
    .slice(0, 4);

  return (
    <main>
      {/* ============ HERO plein écran ============ */}
      <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-espresso text-creme">
        {/* Halo de flamme en arrière-plan */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute -right-32 top-1/2 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full bg-terracotta/25 blur-3xl" />
          <div className="absolute -right-10 top-1/2 h-[20rem] w-[20rem] -translate-y-1/2 rounded-full bg-ambre/20 blur-3xl" />
        </div>

        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-[1.2fr_1fr] md:px-8">
          <div className="max-w-2xl">
            <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-ambre/40 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-ambre">
              <Flame className="size-3.5" />
              Bougie rechargeable
            </p>
            <h1 className="font-serif text-4xl leading-tight md:text-6xl">
              Toutes les bougies finissent par disparaître.{" "}
              <em className="text-ambre">HANA</em> se recharge, se garde, et
              conserve les moments.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-creme/75 md:text-lg">
              Bougies artisanales parfumées, fabriquées en France — et conçues
              pour ne jamais s&apos;éteindre vraiment.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href="/boutique">Découvrir</Link>
              </Button>
              <Button size="lg" variant="outlineLight" asChild>
                <Link href="/la-recharge">Comment ça marche</Link>
              </Button>
            </div>
          </div>

          <div className="hidden md:block">
            <PlaceholderImage
              palette="terracotta"
              label="Bougie signature"
              className="rounded-lg shadow-2xl shadow-black/30"
            />
          </div>
        </div>
      </section>

      {/* ============ 3 PILIERS ============ */}
      <Section variant="white">
        <div className="grid gap-10 md:grid-cols-3">
          {pillars.map((p) => (
            <div key={p.title} className="text-center md:text-left">
              <div className="mb-4 inline-flex rounded-full bg-creme p-3.5 text-terracotta">
                <p.icon className="size-6" />
              </div>
              <h2 className="font-serif text-xl">{p.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-espresso/70">
                {p.text}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* ============ PRODUIT PHARE ============ */}
      <Section variant="creme">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <PlaceholderImage
            palette="terracotta"
            label="Fleur d'oranger"
            className="rounded-lg shadow-lg shadow-espresso/10"
          />
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">
              Le produit phare
            </p>
            <h2 className="font-serif text-3xl md:text-4xl">
              {featuredProduct.nom}
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-espresso/75">
              {featuredProduct.description}
            </p>
            <p className="mt-6 font-serif text-3xl font-semibold text-terracotta">
              {formatPrice(featuredProduct.prix)}
            </p>
            <p className="mt-1 text-sm text-espresso/60">
              Puis {formatPrice(19)} la recharge. C&apos;est tout.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link href={`/produit/${featuredProduct.slug}`}>
                  Découvrir la signature
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/boutique">Voir toute la boutique</Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* ============ COMMENT ÇA MARCHE ============ */}
      <Section
        variant="espresso"
        eyebrow="La recharge"
        title="Comment ça marche"
        subtitle="Le système HANA en trois étapes — comprendre la recharge prend moins de trente secondes."
        id="comment-ca-marche"
      >
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
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
        <div className="mt-10">
          <Button variant="outlineLight" asChild>
            <Link href="/la-recharge">Tout savoir sur la recharge</Link>
          </Button>
        </div>
      </Section>

      {/* ============ BEST-SELLERS ============ */}
      <Section
        variant="white"
        eyebrow="La boutique"
        title="Nos best-sellers"
        subtitle="Les préférées de nos clientes — bougies, recharges et coffrets."
      >
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {bestSellers.map((p) => (
            <ProductCard
              key={p.slug}
              slug={p.slug}
              name={p.nom}
              parfum={
                p.parfums.length > 1
                  ? `${p.parfums.length} parfums au choix`
                  : p.parfums[0]
              }
              firstParfum={p.parfums[0]}
              price={p.prix}
              href={`/produit/${p.slug}`}
              badge={p.badge}
              palette={p.palette}
              imageUrl={"imageUrl" in p ? p.imageUrl : undefined}
            />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button variant="outline" asChild>
            <Link href="/boutique">Voir toute la boutique</Link>
          </Button>
        </div>
      </Section>

      {/* ============ AVIS CLIENTES ============ */}
      <Section
        variant="creme"
        eyebrow="Elles en parlent"
        title="Des moments qui durent"
      >
        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.prenom}
              className="rounded-lg bg-white p-6 shadow-sm ring-1 ring-border"
            >
              <Stars note={r.note} />
              <blockquote className="mt-4 text-sm leading-relaxed text-espresso/80">
                « {r.commentaire} »
              </blockquote>
              <figcaption className="mt-4 font-serif text-sm text-espresso">
                {r.prenom} <span className="text-espresso/50">— {r.ville}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      {/* ============ ENGAGEMENT RESPONSABLE ============ */}
      <Section
        variant="sauge"
        eyebrow="Notre engagement"
        title="Belle pour vous, douce pour la planète"
        subtitle="Choisir HANA, c'est refuser la bougie jetable — sans renoncer au plaisir."
      >
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex items-start gap-3">
            <Leaf className="mt-1 size-5 shrink-0 text-sauge-dark" />
            <p className="text-sm leading-relaxed text-espresso/80">
              <strong className="font-medium">Cire végétale</strong> et parfums
              de Grasse, sans paraffine.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Package className="mt-1 size-5 shrink-0 text-sauge-dark" />
            <p className="text-sm leading-relaxed text-espresso/80">
              <strong className="font-medium">Moins de déchets</strong> : un
              pot qui se garde, des recharges qui voyagent léger.
            </p>
          </div>
          <div className="flex items-start gap-3">
            <Heart className="mt-1 size-5 shrink-0 text-sauge-dark" />
            <p className="text-sm leading-relaxed text-espresso/80">
              <strong className="font-medium">Artisanat français</strong> :
              chaque bougie est assemblée à la main, en France.
            </p>
          </div>
        </div>
      </Section>

      {/* ============ NEWSLETTER ============ */}
      <Section variant="espresso" className="text-center">
        <div className="mx-auto max-w-2xl">
          <p className="mb-3 inline-flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-ambre">
            <Sparkles className="size-3.5" />
            Offre de bienvenue
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">
            −10 % sur votre première bougie
          </h2>
          <p className="mt-4 text-creme/75">
            Recevez nos nouveautés, nos éditions limitées et nos rituels
            cocooning. Rien de plus, promis.
          </p>
          <div className="mt-8">
            <NewsletterForm />
          </div>
        </div>
      </Section>
    </main>
  );
}
