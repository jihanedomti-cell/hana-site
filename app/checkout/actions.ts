"use server";

import { createClient } from "@/lib/supabase/server";

/* ============================================================
   Création de commande — server action.
   Sécurité :
   - utilisatrice authentifiée obligatoire (RLS vérifie aussi)
   - les PRIX sont relus depuis la base, jamais pris du client
   - la RLS garantit customer_id = auth.uid() à l'insertion
   TODO phase 2 : paiement Stripe avant passage en statut 'payee',
   décrément des stocks, email de confirmation.
   ============================================================ */

export type OrderLine = { slug: string; parfum: string; quantite: number };

export type PlaceOrderResult =
  | { ok: true; orderId: string }
  | { ok: false; error: "auth" | "panier_vide" | "produit_inconnu" | "technique" };

type ProductRow = {
  id: string;
  slug: string;
  prix: number;
  product_variants: { id: string; parfum: string }[];
};

export async function placeOrder(lines: OrderLine[]): Promise<PlaceOrderResult> {
  // Validation basique des entrées
  const cleaned = (lines ?? [])
    .filter(
      (l) =>
        typeof l?.slug === "string" &&
        typeof l?.parfum === "string" &&
        Number.isInteger(l?.quantite),
    )
    .map((l) => ({ ...l, quantite: Math.min(Math.max(l.quantite, 1), 99) }));

  if (cleaned.length === 0) return { ok: false, error: "panier_vide" };

  const supabase = await createClient();

  // Authentification — getClaims(), jamais getSession()
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  if (!user) return { ok: false, error: "auth" };

  // Relecture des produits en base : prix et variantes de confiance
  const slugs = [...new Set(cleaned.map((l) => l.slug))];
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, slug, prix, product_variants(id, parfum)")
    .in("slug", slugs)
    .eq("actif", true)
    .returns<ProductRow[]>();

  if (productsError || !products) return { ok: false, error: "technique" };

  const bySlug = new Map(products.map((p) => [p.slug, p]));
  if (slugs.some((s) => !bySlug.has(s))) {
    return { ok: false, error: "produit_inconnu" };
  }

  const items = cleaned.map((l) => {
    const product = bySlug.get(l.slug)!;
    const variant = product.product_variants.find((v) => v.parfum === l.parfum);
    return {
      product_id: product.id,
      variant_id: variant?.id ?? null,
      quantite: l.quantite,
      prix: Number(product.prix), // prix unitaire serveur
    };
  });

  const total = items.reduce((t, i) => t + i.prix * i.quantite, 0);

  // 1. La commande
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({ customer_id: user.sub, statut: "en_attente", total })
    .select("id")
    .single();

  if (orderError || !order) return { ok: false, error: "technique" };

  // 2. Les lignes
  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(items.map((i) => ({ ...i, order_id: order.id })));

  if (itemsError) {
    // Nettoyage best-effort pour ne pas laisser une commande vide
    await supabase.from("orders").delete().eq("id", order.id);
    return { ok: false, error: "technique" };
  }

  return { ok: true, orderId: order.id };
}
