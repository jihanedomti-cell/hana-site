import type { Metadata } from "next";

import { MagicLinkForm } from "@/components/hana/magic-link-form";

export const metadata: Metadata = {
  title: "Connexion",
  robots: { index: false },
};

export default function Page() {
  return (
    <main className="flex min-h-[70vh] w-full items-center justify-center bg-creme p-6 md:p-10">
      <div className="w-full max-w-md">
        <MagicLinkForm />
      </div>
    </main>
  );
}
