"use client";

import { useState } from "react";
import { MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

/**
 * Connexion sans mot de passe (magic link Supabase).
 * Le lien envoyé pointe vers /auth/confirm qui vérifie le token_hash
 * puis redirige vers /compte. Crée le compte au premier lien (et le
 * trigger SQL crée la ligne `profiles` automatiquement).
 */
export function MagicLinkForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || status === "loading") return;

    setStatus("loading");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim().toLowerCase(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm?next=/compte`,
      },
    });

    if (error) {
      setErrorMsg(error.message);
      setStatus("error");
      return;
    }
    setStatus("sent");
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg bg-white p-8 text-center ring-1 ring-border">
        <span className="mx-auto mb-4 inline-flex rounded-full bg-sauge/15 p-4 text-sauge-dark">
          <MailCheck className="size-7" />
        </span>
        <h2 className="font-serif text-2xl">Vérifiez votre boîte mail ✨</h2>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-espresso/70">
          Nous venons d&apos;envoyer un lien de connexion à{" "}
          <strong className="text-espresso">{email}</strong>. Cliquez dessus
          pour accéder à votre espace — pas de mot de passe à retenir.
        </p>
        <p className="mt-4 text-xs text-espresso/50">
          Rien reçu ? Vérifiez vos spams, ou{" "}
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-terracotta underline underline-offset-2"
          >
            réessayez
          </button>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg bg-white p-8 ring-1 ring-border"
    >
      <h2 className="font-serif text-2xl">Connexion</h2>
      <p className="mt-2 text-sm leading-relaxed text-espresso/70">
        Entrez votre email : on vous envoie un lien magique, sans mot de passe.
        Première visite ? Votre compte sera créé automatiquement.
      </p>
      <label
        htmlFor="login-email"
        className="mt-6 block text-xs font-semibold uppercase tracking-[0.25em] text-espresso/60"
      >
        Votre adresse email
      </label>
      <input
        id="login-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="vous@exemple.fr"
        className="mt-2 h-12 w-full rounded-full border border-espresso/15 bg-creme/50 px-5 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
      />
      {status === "error" && (
        <p className="mt-3 text-sm text-destructive">
          Impossible d&apos;envoyer le lien ({errorMsg}). Réessayez dans un
          instant.
        </p>
      )}
      <Button
        type="submit"
        size="lg"
        className="mt-5 w-full"
        disabled={status === "loading"}
      >
        {status === "loading" ? "Envoi en cours…" : "Recevoir mon lien magique"}
      </Button>
    </form>
  );
}
