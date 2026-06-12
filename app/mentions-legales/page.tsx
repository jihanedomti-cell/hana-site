import type { Metadata } from "next";

import { Section } from "@/components/hana/section";

export const metadata: Metadata = {
  title: "Mentions légales",
  robots: { index: false },
};

/* ⚠️ Contenu type à compléter avec les informations réelles de la société
   avant la mise en production (les champs [À compléter] sont volontaires). */

export default function MentionsLegalesPage() {
  return (
    <main>
      <Section variant="creme" eyebrow="Légal" title="Mentions légales">
        <div className="max-w-3xl space-y-8 text-sm leading-relaxed text-espresso/80">
          <div>
            <h2 className="mb-2 font-serif text-xl text-espresso">Éditeur du site</h2>
            <p>
              HANA — [À compléter : forme juridique, capital social]
              <br />
              Siège social : [À compléter : adresse]
              <br />
              RCS : [À compléter] — SIRET : [À compléter]
              <br />
              TVA intracommunautaire : [À compléter]
              <br />
              Directrice de la publication : [À compléter]
              <br />
              Contact :{" "}
              <a href="mailto:bonjour@hana.fr" className="text-terracotta underline underline-offset-2">
                bonjour@hana.fr
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-serif text-xl text-espresso">Hébergement</h2>
            <p>
              Site hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina,
              CA 91723, États-Unis —{" "}
              <a href="https://vercel.com" className="text-terracotta underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                vercel.com
              </a>
              <br />
              Données hébergées par Supabase (région Europe de l&apos;Ouest —
              Paris) —{" "}
              <a href="https://supabase.com" className="text-terracotta underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                supabase.com
              </a>
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-serif text-xl text-espresso">
              Données personnelles (RGPD)
            </h2>
            <p>
              Les données collectées (compte client, commandes, inscription à
              la newsletter) servent uniquement au fonctionnement de la
              boutique et ne sont jamais revendues. Conformément au Règlement
              général sur la protection des données, vous disposez d&apos;un
              droit d&apos;accès, de rectification et de suppression de vos
              données : écrivez-nous à{" "}
              <a href="mailto:bonjour@hana.fr" className="text-terracotta underline underline-offset-2">
                bonjour@hana.fr
              </a>
              .
              {/* TODO : politique de confidentialité détaillée + registre des
                  traitements avant la mise en production */}
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-serif text-xl text-espresso">Cookies</h2>
            <p>
              Le site utilise uniquement des cookies techniques nécessaires à
              son fonctionnement (session de connexion, panier). Aucun cookie
              publicitaire ou de pistage n&apos;est déposé.
            </p>
          </div>

          <div>
            <h2 className="mb-2 font-serif text-xl text-espresso">
              Propriété intellectuelle
            </h2>
            <p>
              L&apos;ensemble des contenus de ce site (textes, visuels, logo,
              charte graphique) est la propriété exclusive de HANA. Toute
              reproduction sans autorisation écrite préalable est interdite.
            </p>
          </div>
        </div>
      </Section>
    </main>
  );
}
