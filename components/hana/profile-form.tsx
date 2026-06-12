"use client";

import { useState, useTransition } from "react";
import { Check } from "lucide-react";

import { updateProfile } from "@/app/compte/actions";
import { Button } from "@/components/ui/button";

/** Édition du profil (prénom, ville) — visible dans /compte. */
export function ProfileForm({
  initialPrenom,
  initialVille,
}: {
  initialPrenom: string;
  initialVille: string;
}) {
  const [prenom, setPrenom] = useState(initialPrenom);
  const [ville, setVille] = useState(initialVille);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);
  const [pending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaved(false);
    setError(false);
    startTransition(async () => {
      const result = await updateProfile({ prenom, ville });
      if (result.ok) {
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      } else {
        setError(true);
      }
    });
  }

  const inputClass =
    "mt-1 h-10 w-full rounded-full border border-espresso/15 bg-creme/50 px-4 text-sm focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30";

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label htmlFor="profil-prenom" className="text-xs text-espresso/50">
          Prénom
        </label>
        <input
          id="profil-prenom"
          type="text"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          placeholder="Votre prénom"
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="profil-ville" className="text-xs text-espresso/50">
          Ville
        </label>
        <input
          id="profil-ville"
          type="text"
          value={ville}
          onChange={(e) => setVille(e.target.value)}
          placeholder="Votre ville"
          className={inputClass}
        />
      </div>
      {error && (
        <p className="text-xs text-destructive">
          Impossible d&apos;enregistrer. Réessayez.
        </p>
      )}
      <Button type="submit" size="sm" disabled={pending}>
        {saved ? (
          <>
            <Check className="size-4" /> Enregistré
          </>
        ) : pending ? (
          "Enregistrement…"
        ) : (
          "Enregistrer"
        )}
      </Button>
    </form>
  );
}
