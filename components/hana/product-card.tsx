import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { AddToCartButton } from "@/components/hana/add-to-cart";
import { PlaceholderImage } from "@/components/hana/placeholder-image";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  /** Slug produit — identifie l'article dans le panier */
  slug: string;
  name: string;
  /** Parfum affiché, ou mention type « 4 parfums au choix » */
  parfum: string;
  /** Premier parfum réel, enregistré au panier depuis la carte */
  firstParfum?: string;
  price: number;
  href: string;
  /** Badge optionnel : « Best-seller », « Édition limitée »… */
  badge?: string;
  /** Palette du placeholder en attendant les photos */
  palette?: "terracotta" | "ambre" | "sauge" | "espresso";
  /** URL de la vraie photo (prend le pas sur le placeholder) */
  imageUrl?: string | null;
  className?: string;
};

/**
 * Carte produit HANA : visuel, nom serif, parfum, prix, ajout au panier.
 * Composant serveur — seul le bouton panier est un îlot client.
 */
export function ProductCard({
  slug,
  name,
  parfum,
  firstParfum,
  price,
  href,
  badge,
  palette = "terracotta",
  imageUrl,
  className,
}: ProductCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-lg bg-card shadow-sm ring-1 ring-border transition-shadow hover:shadow-md",
        className,
      )}
    >
      <Link href={href} className="block focus-visible:outline-none">
        <div className="relative overflow-hidden">
          {imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl}
              alt={name}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <PlaceholderImage
              palette={palette}
              label={parfum}
              className="transition-transform duration-500 group-hover:scale-[1.03]"
            />
          )}
          {badge && (
            <Badge className="absolute left-3 top-3 bg-ambre text-espresso hover:bg-ambre">
              {badge}
            </Badge>
          )}
        </div>
        <div className="space-y-1 px-4 pb-2 pt-4">
          <h3 className="font-serif text-lg leading-snug text-espresso">
            {name}
          </h3>
          <p className="text-sm italic text-espresso/60">{parfum}</p>
        </div>
      </Link>
      <div className="flex items-center justify-between gap-3 px-4 pb-4 pt-1">
        <span className="font-serif text-lg font-semibold text-terracotta">
          {formatPrice(price)}
        </span>
        <AddToCartButton
          item={{
            slug,
            nom: name,
            prix: price,
            parfum: firstParfum ?? parfum,
          }}
        />
      </div>
    </article>
  );
}
