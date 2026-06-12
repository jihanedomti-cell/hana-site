"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/boutique", label: "Boutique" },
  { href: "/la-recharge", label: "La recharge" },
  { href: "/notre-histoire", label: "Notre histoire" },
  { href: "/faq", label: "FAQ" },
  { href: "/compte", label: "Mon compte" },
];

/** Menu mobile : burger → panneau déroulant sous la barre. */
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        className="rounded-full p-2 text-espresso/75 transition-colors hover:bg-espresso/5 hover:text-terracotta"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {open && (
        <nav
          aria-label="Navigation mobile"
          className="absolute inset-x-0 top-16 border-b border-espresso/10 bg-creme shadow-lg"
        >
          <ul className="px-5 py-3">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-espresso/5 py-3 font-serif text-lg text-espresso transition-colors last:border-0 hover:text-terracotta"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}
