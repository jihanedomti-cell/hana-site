-- ============================================================
-- HANA — Seed de démonstration
-- 5 produits + variantes parfums + 3 avis validés
-- (image_url NULL = placeholders charte côté front, en attendant les photos)
-- ============================================================

-- ---------- PRODUITS ----------
insert into public.products (slug, nom, type, description, prix, actif) values
  (
    'bougie-signature',
    'Bougie signature',
    'bougie',
    'La première bougie HANA : un pot en grès rechargeable, une cire végétale de Grasse, une flamme qui se garde. C''est la dernière bougie que vous achetez.',
    49.00,
    true
  ),
  (
    'recharge',
    'La recharge',
    'recharge',
    'Votre bougie touche à sa fin ? Insérez la recharge — elle repart pour des semaines. Deux minutes, sans outil.',
    19.00,
    true
  ),
  (
    'coffret-decouverte',
    'Coffret découverte',
    'coffret',
    'Une bougie signature et deux recharges : des mois de moments. Le cadeau qui ne s''éteint pas.',
    79.00,
    true
  ),
  (
    'edition-limitee',
    'Édition limitée',
    'edition',
    'Une création saisonnière en série numérotée, imaginée avec un parfumeur de Grasse.',
    69.00,
    true
  ),
  (
    'abonnement-recharges',
    'Abonnement 3 recharges / an',
    'recharge',
    'Vos parfums préférés, livrés au bon moment. Trois recharges par an, sans y penser.',
    49.00,
    true
  );

-- ---------- VARIANTES (parfums) ----------
insert into public.product_variants (product_id, parfum, stock)
select p.id, v.parfum, v.stock
from public.products p
join (values
  ('bougie-signature',     'Fleur d''oranger',       40),
  ('bougie-signature',     'Figuier',                35),
  ('bougie-signature',     'Santal',                 30),
  ('bougie-signature',     'Vanille bourbon',        25),
  ('recharge',             'Fleur d''oranger',       80),
  ('recharge',             'Figuier',                70),
  ('recharge',             'Santal',                 60),
  ('recharge',             'Vanille bourbon',        50),
  ('coffret-decouverte',   'Fleur d''oranger',       20),
  ('coffret-decouverte',   'Figuier',                18),
  ('coffret-decouverte',   'Santal',                 15),
  ('edition-limitee',      'Santal impérial',        12),
  ('abonnement-recharges', 'Au choix à chaque envoi', 999)
) as v (slug, parfum, stock) on v.slug = p.slug;

-- ---------- AVIS VALIDÉS (auteurs de démo, sans compte) ----------
insert into public.reviews (product_id, auteur_prenom, auteur_ville, note, commentaire, valide)
select p.id, r.prenom, r.ville, r.note, r.commentaire, true
from public.products p
join (values
  (
    'bougie-signature', 'Camille', 'Lyon', 5,
    'Je l''ai achetée pour mon appartement, je l''ai gardée pour les souvenirs. La recharge prend deux minutes, et le pot est magnifique.'
  ),
  (
    'bougie-signature', 'Sarah', 'Paris', 5,
    'Le parfum fleur d''oranger est incroyable, et l''idée de ne plus jeter mes bougies me réconcilie avec mes soirées cocooning.'
  ),
  (
    'coffret-decouverte', 'Inès', 'Bordeaux', 4,
    'Offert en coffret à ma mère, elle ne parle plus que de ça. La qualité se sent dès le déballage.'
  )
) as r (slug, prenom, ville, note, commentaire) on r.slug = p.slug;
