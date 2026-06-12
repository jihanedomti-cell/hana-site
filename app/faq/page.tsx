import type { Metadata } from "next";
import Link from "next/link";

import { Section } from "@/components/hana/section";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Toutes les réponses sur les bougies rechargeables HANA : prix, recharge, fabrication française, livraison.",
};

type QA = { q: string; a: string };

/* Les 4 premières réponses = les objections du brief, mot pour mot. */
const faqGroups: { title: string; items: QA[] }[] = [
  {
    title: "La bougie & la recharge",
    items: [
      {
        q: "49 €, c'est cher ?",
        a: "C'est la dernière bougie que vous achetez : ensuite, la recharge coûte 19 €.",
      },
      {
        q: "Quelle différence avec une bougie classique ?",
        a: "Une bougie classique se jette. HANA se conserve — et garde vos moments avec elle.",
      },
      {
        q: "La recharge, c'est compliqué ?",
        a: "Deux minutes, sans outil. Une vidéo vous guide pas à pas.",
      },
      {
        q: "C'est vraiment fabriqué en France ?",
        a: "Oui : cire et parfums de Grasse, assemblage artisanal en France.",
      },
      {
        q: "Combien de temps dure une bougie ?",
        a: "Environ 45 heures de combustion, soit plusieurs semaines au rythme de 2 à 3 heures par soirée. Et quand elle touche à sa fin… on la recharge.",
      },
      {
        q: "Puis-je changer de parfum à chaque recharge ?",
        a: "Bien sûr ! Le pot accueille toutes les recharges HANA : fleur d'oranger, figuier, santal, vanille bourbon, et nos éditions limitées.",
      },
    ],
  },
  {
    title: "Commande & livraison",
    items: [
      {
        q: "Quels sont les délais de livraison ?",
        a: "Expédition sous 48 h depuis notre atelier, livraison en 2 à 4 jours ouvrés en France métropolitaine. L'emballage est sans plastique.",
      },
      {
        q: "La livraison est-elle offerte ?",
        a: "Oui, dès 49 € d'achat — c'est-à-dire dès votre première bougie signature.",
      },
      {
        q: "Puis-je retourner un produit ?",
        a: "Vous disposez de 14 jours après réception pour changer d'avis, conformément à la loi. La bougie doit être non allumée — écrivez-nous, on s'occupe de tout.",
      },
      {
        q: "Le paiement est-il sécurisé ?",
        a: "Oui. Le paiement en ligne arrive très bientôt, opéré par un prestataire certifié (Stripe). Vos données bancaires ne passent jamais par nos serveurs.",
      },
    ],
  },
  {
    title: "Compte & avantages",
    items: [
      {
        q: "Comment fonctionne la connexion sans mot de passe ?",
        a: "Entrez votre email : vous recevez un lien magique qui vous connecte en un clic. Rien à retenir, rien à perdre.",
      },
      {
        q: "Comment fonctionne l'abonnement recharges ?",
        a: "Pour 49 € par an, recevez 3 recharges aux parfums de votre choix, livrées au bon moment. Modifiable ou résiliable à tout moment depuis votre compte.",
      },
      {
        q: "Y a-t-il un programme de parrainage ?",
        a: "Il arrive très bientôt : offrez −10 % à une amie, recevez une recharge offerte quand elle commande.",
      },
    ],
  },
];

export default function FaqPage() {
  return (
    <main>
      <Section
        variant="creme"
        eyebrow="FAQ"
        title="Vos questions, nos réponses"
        subtitle="Et si la réponse n'y est pas, écrivez-nous : une vraie personne vous répond."
      >
        <div className="max-w-3xl space-y-12">
          {faqGroups.map((group) => (
            <div key={group.title}>
              <h2 className="mb-4 font-serif text-2xl">{group.title}</h2>
              <div className="space-y-3">
                {group.items.map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-lg bg-white p-5 ring-1 ring-border open:shadow-sm"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-lg text-espresso [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <span className="shrink-0 text-terracotta transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-3 text-sm leading-relaxed text-espresso/75">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Button size="lg" asChild>
            <Link href="/boutique">Découvrir la boutique</Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}
