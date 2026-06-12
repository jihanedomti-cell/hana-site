import { createClient } from "@supabase/supabase-js";

import {
  demoProducts,
  demoReviews,
  type DemoProduct,
  type DemoReview,
} from "@/lib/demo-data";

/* ============================================================
   Catalogue HANA — lecture publique (products, variants, reviews).
   Client supabase-js « nu » (sans cookies) : ces données sont
   publiques sous RLS, pas besoin de session → cachable.
   Repli transparent sur les données de démo si Supabase n'est
   pas encore configuré ou si la requête échoue.
   ============================================================ */

export type CatalogProduct = DemoProduct & { imageUrl?: string | null };

const paletteByType: Record<DemoProduct["type"], DemoProduct["palette"]> = {
  bougie: "terracotta",
  recharge: "sauge",
  coffret: "ambre",
  edition: "espresso",
};

const badgeBySlug: Record<string, string> = {
  "bougie-signature": "Best-seller",
  "coffret-decouverte": "Idée cadeau",
  "edition-limitee": "Édition limitée",
};

/** Les clés Supabase sont-elles réellement renseignées ? */
function envReady(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
  return (
    url.startsWith("https://") &&
    !url.includes("REMPLACE-MOI") &&
    key.length > 10 &&
    !key.includes("REMPLACE-MOI")
  );
}

function publicClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
  );
}

type ProductRow = {
  slug: string;
  nom: string;
  type: DemoProduct["type"];
  description: string;
  prix: number;
  image_url: string | null;
  product_variants: { parfum: string; stock: number }[];
};

/** Catalogue complet (produits actifs + parfums), avec repli démo. */
export async function getCatalog(): Promise<CatalogProduct[]> {
  "use cache"; // catalogue public → cachable (Cache Components, Next 16)
  if (!envReady()) return demoProducts;

  try {
    const { data, error } = await publicClient()
      .from("products")
      .select(
        "slug, nom, type, description, prix, image_url, product_variants(parfum, stock)",
      )
      .eq("actif", true)
      .order("prix", { ascending: false })
      .returns<ProductRow[]>();

    if (error || !data || data.length === 0) return demoProducts;

    return data.map((row) => ({
      slug: row.slug,
      nom: row.nom,
      type: row.type,
      description: row.description,
      prix: Number(row.prix),
      parfums: row.product_variants.map((v) => v.parfum),
      badge: badgeBySlug[row.slug],
      palette: paletteByType[row.type] ?? "terracotta",
      imageUrl: row.image_url,
    }));
  } catch {
    return demoProducts;
  }
}

/** Un produit par slug (fiche produit), avec repli démo. */
export async function getProduct(slug: string): Promise<CatalogProduct | null> {
  const catalog = await getCatalog();
  return catalog.find((p) => p.slug === slug) ?? null;
}

type ReviewRow = {
  auteur_prenom: string | null;
  auteur_ville: string | null;
  note: number;
  commentaire: string;
};

/** Avis validés d'un produit donné (fiche produit). */
export async function getProductReviews(slug: string): Promise<DemoReview[]> {
  "use cache";
  if (!envReady()) return [];

  try {
    const { data, error } = await publicClient()
      .from("reviews")
      .select(
        "auteur_prenom, auteur_ville, note, commentaire, products!inner(slug)",
      )
      .eq("valide", true)
      .eq("products.slug", slug)
      .order("created_at", { ascending: false })
      .limit(6);

    if (error || !data) return [];

    return (data as unknown as ReviewRow[]).map((r) => ({
      prenom: r.auteur_prenom ?? "Une cliente",
      ville: r.auteur_ville ?? "",
      note: r.note,
      commentaire: r.commentaire,
    }));
  } catch {
    return [];
  }
}

/** Avis validés (lecture publique sous RLS), avec repli démo. */
export async function getValidatedReviews(): Promise<DemoReview[]> {
  "use cache"; // avis validés publics → cachable (Cache Components, Next 16)
  if (!envReady()) return demoReviews;

  try {
    const { data, error } = await publicClient()
      .from("reviews")
      .select("auteur_prenom, auteur_ville, note, commentaire")
      .eq("valide", true)
      .order("created_at", { ascending: false })
      .limit(3)
      .returns<ReviewRow[]>();

    if (error || !data || data.length === 0) return demoReviews;

    return data.map((r) => ({
      prenom: r.auteur_prenom ?? "Une cliente",
      ville: r.auteur_ville ?? "",
      note: r.note,
      commentaire: r.commentaire,
    }));
  } catch {
    return demoReviews;
  }
}
