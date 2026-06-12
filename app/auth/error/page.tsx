import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Flame } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Erreur de connexion",
  robots: { index: false },
};

async function ErrorContent({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  const params = await searchParams;

  return (
    <p className="mt-3 text-sm leading-relaxed text-espresso/70">
      {params?.error
        ? `Détail : ${params.error}`
        : "Une erreur inattendue est survenue."}
    </p>
  );
}

export default function Page({
  searchParams,
}: {
  searchParams: Promise<{ error: string }>;
}) {
  return (
    <main className="flex min-h-[70vh] w-full items-center justify-center bg-creme p-6 md:p-10">
      <div className="w-full max-w-md rounded-lg bg-white p-8 text-center ring-1 ring-border">
        <span className="mx-auto mb-4 inline-flex rounded-full bg-terracotta/10 p-4 text-terracotta">
          <Flame className="size-7" />
        </span>
        <h1 className="font-serif text-2xl">
          Oups, ce lien ne fonctionne plus
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-espresso/70">
          Les liens magiques expirent rapidement par sécurité. Pas
          d&apos;inquiétude : demandez-en simplement un nouveau.
        </p>
        <Suspense>
          <ErrorContent searchParams={searchParams} />
        </Suspense>
        <Button size="lg" className="mt-6" asChild>
          <Link href="/auth/login">Recevoir un nouveau lien</Link>
        </Button>
      </div>
    </main>
  );
}
