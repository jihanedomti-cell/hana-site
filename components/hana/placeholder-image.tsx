import { cn } from "@/lib/utils";

type Palette = "terracotta" | "ambre" | "sauge" | "espresso";

type PlaceholderImageProps = {
  /** Dégradé aux couleurs de la charte, en attendant les vraies photos */
  palette?: Palette;
  /** Libellé discret affiché sous la flamme (ex. nom du parfum) */
  label?: string;
  className?: string;
};

const gradients: Record<Palette, string> = {
  terracotta: "bg-gradient-to-br from-terracotta-light via-terracotta to-terracotta-dark",
  ambre: "bg-gradient-to-br from-ambre-light via-ambre to-terracotta",
  sauge: "bg-gradient-to-br from-sauge-light via-sauge to-sauge-dark",
  espresso: "bg-gradient-to-br from-espresso-light via-espresso to-black",
};

/**
 * Placeholder produit élégant : dégradé charte + silhouette de bougie.
 * À remplacer par <Image /> quand les photos seront disponibles.
 */
export function PlaceholderImage({
  palette = "terracotta",
  label,
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-square w-full items-center justify-center overflow-hidden",
        gradients[palette],
        className,
      )}
      role="img"
      aria-label={label ? `Visuel à venir — ${label}` : "Visuel à venir"}
    >
      {/* Silhouette de bougie */}
      <svg
        viewBox="0 0 120 160"
        className="h-3/5 w-auto text-creme/80"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Flamme */}
        <path d="M60 18c6 9 11 14 11 21a11 11 0 1 1-22 0c0-7 5-12 11-21Z" opacity="0.9" />
        {/* Mèche */}
        <rect x="58.75" y="42" width="2.5" height="10" rx="1.25" opacity="0.7" />
        {/* Pot */}
        <path d="M30 56h60v76a10 10 0 0 1-10 10H40a10 10 0 0 1-10-10V56Z" opacity="0.55" />
        {/* Reflet du pot */}
        <rect x="38" y="66" width="7" height="56" rx="3.5" className="text-creme/60" fill="currentColor" opacity="0.35" />
      </svg>
      {label && (
        <span className="absolute bottom-4 font-serif text-sm italic tracking-wide text-creme/90">
          {label}
        </span>
      )}
    </div>
  );
}
