"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

/* Server actions de l'espace client — la RLS garantit que chaque
   utilisatrice ne modifie que SES données. */

export type ActionResult = { ok: true } | { ok: false; error: string };

/** Mise à jour du profil (prénom, ville). */
export async function updateProfile(input: {
  prenom: string;
  ville: string;
}): Promise<ActionResult> {
  const prenom = input.prenom?.trim().slice(0, 80) ?? "";
  const ville = input.ville?.trim().slice(0, 120) ?? "";

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  if (!user) return { ok: false, error: "auth" };

  const { error } = await supabase
    .from("profiles")
    .update({ prenom: prenom || null, ville: ville || null })
    .eq("id", user.sub);

  if (error) return { ok: false, error: "technique" };

  revalidatePath("/compte");
  return { ok: true };
}

/** Dépôt d'avis sur un produit (modéré : valide=false à la création). */
export async function submitReview(input: {
  slug: string;
  note: number;
  commentaire: string;
}): Promise<ActionResult> {
  const note = Math.min(Math.max(Math.round(input.note), 1), 5);
  const commentaire = input.commentaire?.trim().slice(0, 1000) ?? "";
  if (commentaire.length < 10) return { ok: false, error: "commentaire_court" };

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const user = data?.claims;
  if (!user) return { ok: false, error: "auth" };

  // Produit ciblé
  const { data: product } = await supabase
    .from("products")
    .select("id")
    .eq("slug", input.slug)
    .maybeSingle();
  if (!product) return { ok: false, error: "produit_inconnu" };

  // Prénom/ville affichés publiquement avec l'avis (une fois validé)
  const { data: profile } = await supabase
    .from("profiles")
    .select("prenom, ville")
    .eq("id", user.sub)
    .maybeSingle();

  const { error } = await supabase.from("reviews").insert({
    product_id: product.id,
    customer_id: user.sub,
    auteur_prenom: profile?.prenom ?? null,
    auteur_ville: profile?.ville ?? null,
    note,
    commentaire,
    valide: false, // modération avant publication
  });

  if (error) return { ok: false, error: "technique" };
  return { ok: true };
}
