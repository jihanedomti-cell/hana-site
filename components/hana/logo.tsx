import { cn } from "@/lib/utils";

type LogoProps = {
  /** "dark" = lettres espresso (fonds clairs) · "light" = lettres crème (fonds sombres) */
  variant?: "dark" | "light";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
};

/**
 * Wordmark HANA — capitales serif, espacées.
 * Usage : <Logo /> sur fond clair, <Logo variant="light" /> sur fond espresso.
 */
export function Logo({ variant = "dark", size = "md", className }: LogoProps) {
  return (
    <span
      className={cn(
        "font-serif font-semibold uppercase tracking-logo select-none",
        sizes[size],
        variant === "dark" ? "text-espresso" : "text-creme",
        className,
      )}
    >
      HANA
    </span>
  );
}
