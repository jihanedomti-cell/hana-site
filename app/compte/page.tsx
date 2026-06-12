import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Package, RefreshCw, UserRound } from "lucide-react";

import { LogoutButton } from "@/components/hana/logout-button";
import { ProfileForm } from "@/components/hana/profile-form";
import { Section } from "@/components/hana/section";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import { formatPrice } from "@/lib/format";

export const metadata: Metadata = {
  title: "Mon compte",
  robots: { index: false },
};

type OrderItemRow = {
  quantite: number;
  prix: number;
  products: { nom: string } | null;
  product_variants: { parfum: string } | null;
};

type OrderRow = {
  id: string;
  statut: string;
  total: number;
  date: string;
  order_items: OrderItemRow[];
};

const statutLabels: Record<string, string> = {
  en_attente: "En attente",
  payee: "Payée",
  expediee: "Expédiée",
  livree: "Livrée",
  annulee: "Annulée",
};

/* Next 16 (Cache Components) : la lecture des cookies de session est
   « dynamique » et doit vivre sous un <Suspense> pour que le build passe. */
export default function ComptePage() {
  return (
    <Suspense
      fallback={
        <main>
          <Section variant="creme" eyebrow="Mon espace" title="Un instant…">
            <p className="text-sm text-espresso/60">
              Chargement de votre espace personnel.
            </p>
          </Section>
        </main>
      }
    >
      <CompteContent />
    </Suspense>
  );
}

async function CompteContent() {
  const supabase = await createClient();

  // getClaims() — jamais getSession() (exigence du brief, et du template)
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  if (!user) redirect("/auth/login");

  // RLS : chaque requête ne renvoie que les lignes de la cliente connectée
  const [{ data: profile }, { data: orders }, { data: subscriptions }] =
    await Promise.all([
      supabase
        .from("profiles")
        .select("prenom, email, ville, date_inscription")
        .eq("id", user.sub)
        .maybeSingle(),
      supabase
        .from("orders")
        .select(
          "id, statut, total, date, order_items(quantite, prix, products(nom), product_variants(parfum))",
        )
        .order("date", { ascending: false })
        .limit(10)
        .returns<OrderRow[]>(),
      supabase
        .from("subscriptions")
        .select("type, statut, prochaine_recharge")
        .eq("statut", "active"),
    ]);

  const prenom = profile?.prenom ?? null;
  const email = profile?.email ?? (user.email as string | undefined) ?? "";

  return (
    <main>
      <Section
        variant="creme"
        eyebrow="Mon espace"
        title={prenom ? `Bonjour ${prenom} ✨` : "Bonjour ✨"}
        subtitle={email}
      >
        <div className="mb-10">
          <LogoutButton />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* ---- Profil ---- */}
          <div className="rounded-lg bg-white p-6 ring-1 ring-border">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-creme p-2.5 text-terracotta">
                <UserRound className="size-5" />
              </span>
              <h2 className="font-serif text-xl">Mon profil</h2>
            </div>
            <p className="mb-4 text-sm">
              <span className="text-espresso/50">Email : </span>
              {email}
            </p>
            <ProfileForm
              initialPrenom={prenom ?? ""}
              initialVille={profile?.ville ?? ""}
            />
          </div>

          {/* ---- Commandes ---- */}
          <div className="rounded-lg bg-white p-6 ring-1 ring-border">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-creme p-2.5 text-terracotta">
                <Package className="size-5" />
              </span>
              <h2 className="font-serif text-xl">Mes commandes</h2>
            </div>
            {!orders || orders.length === 0 ? (
              <div className="text-sm text-espresso/60">
                <p>Aucune commande pour le moment.</p>
                <Button variant="link" className="mt-1 px-0" asChild>
                  <Link href="/boutique">Découvrir la boutique →</Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-2 text-sm">
                {orders.map((o) => (
                  <li key={o.id}>
                    <details className="group rounded-lg border border-espresso/5 p-3">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                        <span className="text-espresso/70">
                          {new Date(o.date).toLocaleDateString("fr-FR")}
                        </span>
                        <span className="rounded-full bg-creme px-2.5 py-0.5 text-xs">
                          {statutLabels[o.statut] ?? o.statut}
                        </span>
                        <span className="font-medium text-terracotta">
                          {formatPrice(Number(o.total))}
                        </span>
                      </summary>
                      <ul className="mt-3 space-y-1.5 border-t border-espresso/5 pt-3 text-xs text-espresso/70">
                        {(o.order_items ?? []).map((item, i) => (
                          <li key={i} className="flex justify-between gap-2">
                            <span>
                              {item.products?.nom ?? "Produit"}
                              {item.product_variants?.parfum &&
                                ` — ${item.product_variants.parfum}`}{" "}
                              × {item.quantite}
                            </span>
                            <span className="shrink-0">
                              {formatPrice(Number(item.prix) * item.quantite)}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </details>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ---- Abonnement recharges ---- */}
          <div className="rounded-lg bg-white p-6 ring-1 ring-border">
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-creme p-2.5 text-terracotta">
                <RefreshCw className="size-5" />
              </span>
              <h2 className="font-serif text-xl">Mon abonnement</h2>
            </div>
            {!subscriptions || subscriptions.length === 0 ? (
              <div className="text-sm text-espresso/60">
                <p>
                  Pas encore d&apos;abonnement. 3 recharges par an, livrées au
                  bon moment.
                </p>
                <Button variant="link" className="mt-1 px-0" asChild>
                  <Link href="/produit/abonnement-recharges">
                    Découvrir l&apos;abonnement →
                  </Link>
                </Button>
              </div>
            ) : (
              <ul className="space-y-2 text-sm">
                {subscriptions.map((s, i) => (
                  <li key={i}>
                    <p className="font-medium">3 recharges / an</p>
                    {s.prochaine_recharge && (
                      <p className="text-espresso/60">
                        Prochaine recharge :{" "}
                        {new Date(s.prochaine_recharge).toLocaleDateString(
                          "fr-FR",
                        )}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* ---- Parrainage (phase 2) ---- */}
        <div className="mt-6 rounded-lg bg-sauge/15 p-6">
          <h2 className="font-serif text-xl">Le parrainage arrive bientôt 🌿</h2>
          <p className="mt-1 max-w-xl text-sm text-espresso/70">
            Offrez −10 % à une amie, recevez une recharge offerte quand elle
            commande. En préparation.
          </p>
        </div>
      </Section>
    </main>
  );
}
