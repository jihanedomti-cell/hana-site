import Link from "next/link";
import { Instagram, Lock } from "lucide-react";

import { Logo } from "@/components/hana/logo";

const columns = [
  {
    title: "La maison",
    links: [
      { href: "/notre-histoire", label: "Notre histoire" },
      { href: "/la-recharge", label: "La recharge" },
      { href: "/boutique", label: "Boutique" },
    ],
  },
  {
    title: "Aide",
    links: [
      { href: "/faq", label: "FAQ" },
      { href: "/compte", label: "Mon compte" },
      { href: "/panier", label: "Mon panier" },
    ],
  },
  {
    title: "Légal",
    links: [
      { href: "/mentions-legales", label: "Mentions légales" },
      // TODO phase 2 : CGV, politique de confidentialité
    ],
  },
];

/** Pied de page — fond espresso, logo crème. */
export function Footer() {
  return (
    <footer className="bg-espresso text-creme">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <Logo variant="light" />
            <p className="max-w-xs text-sm leading-relaxed text-creme/65">
              Bougies artisanales, parfumées et rechargeables, fabriquées en
              France. Certains moments méritent de ne jamais s&apos;éteindre.
            </p>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="HANA sur Instagram"
              className="inline-flex rounded-full border border-creme/20 p-2 text-creme/75 transition-colors hover:border-ambre hover:text-ambre"
            >
              <Instagram className="size-4" />
            </a>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-ambre">
                {col.title}
              </p>
              <ul className="space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-creme/70 transition-colors hover:text-creme"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-creme/10 pt-6 text-xs text-creme/50 sm:flex-row">
          {/* Année en dur : new Date() est interdit au prérendu (Cache Components) */}
          <p>© 2026 HANA — Fabriqué en France 🇫🇷</p>
          <p className="inline-flex items-center gap-1.5">
            <Lock className="size-3.5 text-sauge-light" />
            Paiement sécurisé
            {/* TODO phase 2 : logos CB / Visa / Mastercard via Stripe */}
          </p>
        </div>
      </div>
    </footer>
  );
}
