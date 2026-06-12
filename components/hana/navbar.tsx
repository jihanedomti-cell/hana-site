import Link from "next/link";
import { ShoppingBag, User } from "lucide-react";

import { CartBadge } from "@/components/hana/cart-badge";
import { Logo } from "@/components/hana/logo";
import { MobileMenu } from "@/components/hana/mobile-menu";

const links = [
  { href: "/boutique", label: "Boutique" },
  { href: "/la-recharge", label: "La recharge" },
  { href: "/notre-histoire", label: "Notre histoire" },
  { href: "/faq", label: "FAQ" },
];

/** Barre de navigation principale — sticky, fond crème translucide. */
export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-espresso/10 bg-creme/90 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
        <Link href="/" aria-label="HANA — accueil" className="shrink-0">
          <Logo size="sm" className="md:text-2xl" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-espresso/75 transition-colors hover:text-terracotta"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/compte"
            aria-label="Mon compte"
            className="hidden rounded-full p-2 text-espresso/75 transition-colors hover:bg-espresso/5 hover:text-terracotta md:inline-flex"
          >
            <User className="size-5" />
          </Link>
          <Link
            href="/panier"
            aria-label="Panier"
            className="relative rounded-full p-2 text-espresso/75 transition-colors hover:bg-espresso/5 hover:text-terracotta"
          >
            <ShoppingBag className="size-5" />
            <CartBadge />
          </Link>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
