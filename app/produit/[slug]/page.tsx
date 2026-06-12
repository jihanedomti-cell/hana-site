import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, RefreshCw, Truck } from "lucide-react";

import { ParfumSelector } from "@/components/hana/add-to-cart";
import { PlaceholderImage } from "@/components/hana/placeholder-image";
import { Section } from "@/components/hana/section";
import { Stars } from "@/components/hana/stars";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getCatalog, getProduct, getProductReviews } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const catalog = await getCatalog();
  return catalog.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.nom,
    description: product.description,
  };
}

const reassurance = [
  {
    icon: MapPin,
    title: "Fabriquée en France",
    text: "Cire et parfums de Grasse, assemblage artisanal.",
  },
  {
    icon: Truck,
    title: "Livraison soignée",
    text: "Expédition sous 48 h, emballage sans plastique.",
  },
  {
    icon: RefreshCw,
    title: "Recharge facile",
    text: "Deux minutes, sans outil. Une vidéo vous guide.",
  },
];

export default async function ProduitPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const reviews = await getProductReviews(slug);
  const isRecharge = product.type === "recharge";

  return (
    <main>
      <Section variant="creme">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          {/* ---- Galerie ---- */}
          <div className="space-y-4">
            <div className="relative">
              {product.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={product.imageUrl}
                  alt={product.nom}
                  className="aspect-square w-full rounded-lg object-cover shadow-lg shadow-espresso/10"
                />
              ) : (
                <PlaceholderImage
                  palette={product.palette}
                  label={product.parfums[0]}
                  className="rounded-lg shadow-lg shadow-espresso/10"
                />
              )}
              {product.badge && (
                <Badge className="absolute left-4 top-4 bg-ambre text-espresso hover:bg-ambre">
                  {product.badge}
                </Badge>
              )}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <PlaceholderImage palette="ambre" className="rounded-md" />
              <PlaceholderImage palette="sauge" className="rounded-md" />
              <PlaceholderImage palette="espresso" className="rounded-md" />
            </div>
          </div>

          {/* ---- Infos produit ---- */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-terracotta">
              {
                {
                  bougie: "Bougie rechargeable",
                  recharge: "Recharge parfumée",
                  coffret: "Coffret",
                  edition: "Édition limitée",
                }[product.type]
              }
            </p>
            <h1 className="font-serif text-3xl md:text-4xl">{product.nom}</h1>

            {reviews.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <Stars
                  note={Math.round(
                    reviews.reduce((s, r) => s + r.note, 0) / reviews.length,
                  )}
                />
                <span className="text-sm text-espresso/60">
                  {reviews.length} avis
                </span>
              </div>
            )}

            <p className="mt-5 font-serif text-3xl font-semibold text-terracotta">
              {formatPrice(product.prix)}
            </p>

            <p className="mt-5 max-w-lg leading-relaxed text-espresso/80">
              {product.description}
            </p>

            <div className="mt-8">
              <ParfumSelector
                slug={product.slug}
                nom={product.nom}
                prix={product.prix}
                parfums={product.parfums}
              />
            </div>

            {/* ---- Et après ? ---- */}
            {!isRecharge && (
              <div className="mt-8 rounded-lg bg-sauge/15 p-5">
                <p className="font-serif text-lg text-espresso">
                  Et après ? La recharge coûte {formatPrice(19)}.
                </p>
                <p className="mt-1 text-sm leading-relaxed text-espresso/70">
                  Quand votre bougie touche à sa fin, inutile d&apos;en
                  racheter une : la recharge se glisse dans le pot en deux
                  minutes, sans outil.
                </p>
                <Button variant="link" className="mt-1 px-0" asChild>
                  <Link href="/la-recharge">Découvrir la recharge →</Link>
                </Button>
              </div>
            )}

            {/* ---- Réassurance ---- */}
            <ul className="mt-8 grid gap-4 border-t border-espresso/10 pt-6 sm:grid-cols-3">
              {reassurance.map((r) => (
                <li key={r.title} className="flex gap-3 sm:block">
                  <r.icon className="size-5 shrink-0 text-terracotta sm:mb-2" />
                  <div>
                    <p className="text-sm font-medium">{r.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-espresso/60">
                      {r.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---- Avis ---- */}
      {reviews.length > 0 && (
        <Section variant="white" eyebrow="Elles en parlent" title="Les avis">
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r, i) => (
              <figure
                key={`${r.prenom}-${i}`}
                className="rounded-lg bg-creme p-6 ring-1 ring-border"
              >
                <Stars note={r.note} />
                <blockquote className="mt-4 text-sm leading-relaxed text-espresso/80">
                  « {r.commentaire} »
                </blockquote>
                <figcaption className="mt-4 font-serif text-sm text-espresso">
                  {r.prenom}
                  {r.ville && (
                    <span className="text-espresso/50"> — {r.ville}</span>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}
    </main>
  );
}
