/**
 * Données de démonstration HANA.
 * TODO Supabase : remplacer par des requêtes sur les tables `products`,
 * `product_variants` et `reviews` une fois les migrations appliquées
 * (étape « migrations SQL + seed »). Les slugs et prix correspondent au seed.
 */

export type DemoProduct = {
  slug: string;
  nom: string;
  type: "bougie" | "recharge" | "coffret" | "edition";
  description: string;
  prix: number;
  parfums: string[];
  badge?: string;
  palette: "terracotta" | "ambre" | "sauge" | "espresso";
};

export const demoProducts: DemoProduct[] = [
  {
    slug: "bougie-signature",
    nom: "Bougie signature",
    type: "bougie",
    description:
      "La première bougie HANA : un pot en grès rechargeable, une cire végétale de Grasse, une flamme qui se garde. C'est la dernière bougie que vous achetez.",
    prix: 49,
    parfums: ["Fleur d'oranger", "Figuier", "Santal", "Vanille bourbon"],
    badge: "Best-seller",
    palette: "terracotta",
  },
  {
    slug: "recharge",
    nom: "La recharge",
    type: "recharge",
    description:
      "Votre bougie touche à sa fin ? Insérez la recharge — elle repart pour des semaines. Deux minutes, sans outil.",
    prix: 19,
    parfums: ["Fleur d'oranger", "Figuier", "Santal", "Vanille bourbon"],
    palette: "sauge",
  },
  {
    slug: "coffret-decouverte",
    nom: "Coffret découverte",
    type: "coffret",
    description:
      "Une bougie signature et deux recharges : des mois de moments. Le cadeau qui ne s'éteint pas.",
    prix: 79,
    parfums: ["Fleur d'oranger", "Figuier", "Santal"],
    badge: "Idée cadeau",
    palette: "ambre",
  },
  {
    slug: "edition-limitee",
    nom: "Édition limitée",
    type: "edition",
    description:
      "Une création saisonnière en série numérotée, imaginée avec un parfumeur de Grasse.",
    prix: 69,
    parfums: ["Santal impérial"],
    badge: "Édition limitée",
    palette: "espresso",
  },
  {
    slug: "abonnement-recharges",
    nom: "Abonnement 3 recharges / an",
    type: "recharge",
    description:
      "Vos parfums préférés, livrés au bon moment. Trois recharges par an, sans y penser.",
    prix: 49,
    parfums: ["Au choix à chaque envoi"],
    palette: "sauge",
  },
];

export const featuredProduct = demoProducts[0];

/** Best-sellers affichés en page d'accueil */
export const bestSellers = demoProducts.slice(0, 4);

export type DemoReview = {
  prenom: string;
  ville: string;
  note: number; // sur 5
  commentaire: string;
};

/** TODO Supabase : table `reviews` (validé = true) */
export const demoReviews: DemoReview[] = [
  {
    prenom: "Camille",
    ville: "Lyon",
    note: 5,
    commentaire:
      "Je l'ai achetée pour mon appartement, je l'ai gardée pour les souvenirs. La recharge prend deux minutes, et le pot est magnifique.",
  },
  {
    prenom: "Sarah",
    ville: "Paris",
    note: 5,
    commentaire:
      "Le parfum fleur d'oranger est incroyable, et l'idée de ne plus jeter mes bougies me réconcilie avec mes soirées cocooning.",
  },
  {
    prenom: "Inès",
    ville: "Bordeaux",
    note: 4,
    commentaire:
      "Offert en coffret à ma mère, elle ne parle plus que de ça. La qualité se sent dès le déballage.",
  },
];
