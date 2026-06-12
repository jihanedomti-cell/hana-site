"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { hasEnvVars } from "@/lib/utils";

/**
 * Capture email newsletter + offre de bienvenue −10 %.
 * Insère dans `newsletter_subscribers` (RLS : insert public, pas de lecture).
 * Un email déjà inscrit (23505) est traité comme un succès — pas de fuite
 * d'information sur la liste.
 * TODO phase 2 : email automatisé de bienvenue.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    // Supabase pas encore configuré (dev) : on montre quand même l'offre.
    if (!hasEnvVars) {
      setStatus("done");
      return;
    }

    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: email.trim().toLowerCase() });

    if (error && error.code !== "23505") {
      setStatus("error");
      return;
    }
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="mx-auto max-w-xl rounded-lg bg-creme/10 p-6 text-center">
        <p className="font-serif text-xl text-creme">
          Bienvenue chez HANA. ✨
        </p>
        <p className="mt-2 text-sm leading-relaxed text-creme/80">
          Voici <strong className="text-ambre">−10 %</strong> sur votre
          première bougie — celle que vous garderez. Certains moments méritent
          de ne jamais s&apos;éteindre.
        </p>
        <p className="mt-4 inline-block rounded-full border border-dashed border-ambre/60 px-4 py-1.5 font-mono text-sm tracking-widest text-ambre">
          BIENVENUE10
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="newsletter-email" className="sr-only">
        Votre adresse email
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre adresse email"
        className="h-12 flex-1 rounded-full border border-creme/25 bg-creme/10 px-5 text-sm text-creme placeholder:text-creme/50 focus:border-ambre focus:outline-none focus:ring-2 focus:ring-ambre/40"
      />
      <Button
        type="submit"
        variant="ambre"
        size="lg"
        className="shrink-0"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Un instant…" : "Recevoir −10 %"}
      </Button>
      {status === "error" && (
        <p className="text-sm text-creme/80 sm:basis-full">
          Oups, une erreur est survenue. Réessayez dans un instant.
        </p>
      )}
    </form>
  );
}
