"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Star } from "lucide-react";

import { submitReview } from "@/app/compte/actions";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Dépôt d'avis (cliente connectée). L'avis part en modération
 * (valide=false) et n'apparaît qu'après validation.
 */
export function ReviewForm({ slug }: { slug: string }) {
  const [note, setNote] = useState(5);
  const [hover, setHover] = useState<number | null>(null);
  const [commentaire, setCommentaire] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sent" | "auth" | "court" | "error"
  >("idle");
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const result = await submitReview({ slug, note, commentaire });
      if (result.ok) {
        setStatus("sent");
        return;
      }
      if (result.error === "auth") setStatus("auth");
      else if (result.error === "commentaire_court") setStatus("court");
      else setStatus("error");
    });
  }

  if (status === "sent") {
    return (
      <div className="rounded-lg bg-sauge/15 p-6 text-center">
        <p className="font-serif text-xl">Merci pour votre avis ! 🌿</p>
        <p className="mt-2 text-sm text-espresso/70">
          Il sera publié après validation par notre équipe.
        </p>
      </div>
    );
  }

  if (status === "auth") {
    return (
      <div className="rounded-lg bg-white p-6 text-center ring-1 ring-border">
        <p className="font-serif text-lg">
          Connectez-vous pour partager votre avis
        </p>
        <Button size="sm" className="mt-4" asChild>
          <Link href={`/auth/login?next=/produit/${slug}`}>Me connecter</Link>
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg bg-white p-6 ring-1 ring-border"
    >
      <p className="font-serif text-lg">Partagez votre expérience</p>

      <fieldset className="mt-4">
        <legend className="sr-only">Votre note sur 5</legend>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setNote(n)}
              onMouseEnter={() => setHover(n)}
              onMouseLeave={() => setHover(null)}
              aria-label={`${n} étoile${n > 1 ? "s" : ""}`}
              aria-pressed={note === n}
              className="p-0.5"
            >
              <Star
                className={cn(
                  "size-6 transition-colors",
                  n <= (hover ?? note)
                    ? "fill-ambre text-ambre"
                    : "text-espresso/20",
                )}
              />
            </button>
          ))}
        </div>
      </fieldset>

      <label htmlFor="review-text" className="sr-only">
        Votre commentaire
      </label>
      <textarea
        id="review-text"
        required
        rows={3}
        value={commentaire}
        onChange={(e) => setCommentaire(e.target.value)}
        placeholder="Qu'avez-vous pensé de votre bougie ? (10 caractères minimum)"
        className="mt-4 w-full rounded-lg border border-espresso/15 bg-creme/50 p-4 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30"
      />

      {status === "court" && (
        <p className="mt-2 text-xs text-destructive">
          Votre commentaire est un peu court (10 caractères minimum).
        </p>
      )}
      {status === "error" && (
        <p className="mt-2 text-xs text-destructive">
          Une erreur est survenue. Réessayez dans un instant.
        </p>
      )}

      <Button type="submit" size="sm" className="mt-4" disabled={pending}>
        {pending ? "Envoi…" : "Publier mon avis"}
      </Button>
    </form>
  );
}
