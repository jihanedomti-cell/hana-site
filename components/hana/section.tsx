import { cn } from "@/lib/utils";

type SectionVariant = "creme" | "white" | "espresso" | "sauge";

type SectionProps = {
  /** Fond de la section — espresso passe automatiquement le texte en crème */
  variant?: SectionVariant;
  /** Petit surtitre en capitales (ex. « Notre promesse ») */
  eyebrow?: string;
  /** Titre serif de la section */
  title?: string;
  /** Sous-titre / texte d'introduction */
  subtitle?: string;
  id?: string;
  className?: string;
  children?: React.ReactNode;
};

const variants: Record<SectionVariant, string> = {
  creme: "bg-creme text-espresso",
  white: "bg-white text-espresso",
  espresso: "bg-espresso text-creme",
  sauge: "bg-sauge/15 text-espresso",
};

const eyebrowColor: Record<SectionVariant, string> = {
  creme: "text-terracotta",
  white: "text-terracotta",
  espresso: "text-ambre",
  sauge: "text-sauge-dark",
};

/**
 * Section de page HANA : fond charte + container centré + en-tête optionnel.
 *
 * <Section variant="espresso" eyebrow="La recharge" title="Comment ça marche">
 *   …contenu…
 * </Section>
 */
export function Section({
  variant = "creme",
  eyebrow,
  title,
  subtitle,
  id,
  className,
  children,
}: SectionProps) {
  return (
    <section id={id} className={cn(variants[variant], "py-16 md:py-24", className)}>
      <div className="mx-auto w-full max-w-6xl px-5 md:px-8">
        {(eyebrow || title || subtitle) && (
          <header className="mb-10 max-w-2xl md:mb-14">
            {eyebrow && (
              <p
                className={cn(
                  "mb-3 text-xs font-semibold uppercase tracking-[0.25em]",
                  eyebrowColor[variant],
                )}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2 className="font-serif text-3xl leading-tight md:text-4xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                className={cn(
                  "mt-4 text-base leading-relaxed md:text-lg",
                  variant === "espresso" ? "text-creme/80" : "text-espresso/75",
                )}
              >
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
