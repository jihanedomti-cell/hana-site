-- ============================================================
-- HANA — Schéma initial
-- 9 tables · RLS activée sur TOUTES les tables
-- Lecture publique : products, product_variants, reviews validés
-- Accès propriétaire : profiles, orders, order_items, subscriptions, referrals
-- ============================================================

-- ---------- PRODUCTS ----------
create table public.products (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  nom         text not null,
  type        text not null check (type in ('bougie', 'recharge', 'coffret', 'edition')),
  description text not null default '',
  prix        numeric(10, 2) not null check (prix >= 0),
  image_url   text,
  actif       boolean not null default true,
  created_at  timestamptz not null default now()
);

alter table public.products enable row level security;

-- Lecture publique des produits actifs (catalogue)
create policy "Lecture publique des produits actifs"
  on public.products for select
  using (actif = true);

-- ---------- PRODUCT VARIANTS (parfums) ----------
create table public.product_variants (
  id         uuid primary key default gen_random_uuid(),
  product_id uuid not null references public.products (id) on delete cascade,
  parfum     text not null,
  stock      integer not null default 0 check (stock >= 0),
  unique (product_id, parfum)
);

alter table public.product_variants enable row level security;

create policy "Lecture publique des variantes"
  on public.product_variants for select
  using (
    exists (
      select 1 from public.products p
      where p.id = product_id and p.actif = true
    )
  );

-- ---------- PROFILES (id = auth.users) ----------
create table public.profiles (
  id               uuid primary key references auth.users (id) on delete cascade,
  prenom           text,
  email            text not null,
  ville            text,
  date_inscription timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Lecture de son propre profil"
  on public.profiles for select
  using ((select auth.uid()) = id);

create policy "Mise à jour de son propre profil"
  on public.profiles for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- Création automatique du profil à l'inscription (magic link inclus)
create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, prenom)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'prenom'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------- ORDERS ----------
create table public.orders (
  id          uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.profiles (id) on delete cascade,
  statut      text not null default 'en_attente'
              check (statut in ('en_attente', 'payee', 'expediee', 'livree', 'annulee')),
  total       numeric(10, 2) not null default 0 check (total >= 0),
  date        timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Lecture de ses propres commandes"
  on public.orders for select
  using ((select auth.uid()) = customer_id);

create policy "Création de ses propres commandes"
  on public.orders for insert
  with check ((select auth.uid()) = customer_id);

-- ---------- ORDER ITEMS ----------
create table public.order_items (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references public.orders (id) on delete cascade,
  product_id uuid not null references public.products (id),
  variant_id uuid references public.product_variants (id),
  quantite   integer not null default 1 check (quantite > 0),
  prix       numeric(10, 2) not null check (prix >= 0)
);

alter table public.order_items enable row level security;

create policy "Lecture des lignes de ses commandes"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.customer_id = (select auth.uid())
    )
  );

create policy "Ajout de lignes à ses commandes"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders o
      where o.id = order_id and o.customer_id = (select auth.uid())
    )
  );

-- ---------- REVIEWS ----------
-- customer_id nullable + auteur_prenom/auteur_ville : permet d'afficher des
-- avis de démo et de garder un affichage public sans exposer les profils
-- (la table profiles est privée sous RLS, on ne peut pas la joindre côté anon).
create table public.reviews (
  id            uuid primary key default gen_random_uuid(),
  product_id    uuid not null references public.products (id) on delete cascade,
  customer_id   uuid references public.profiles (id) on delete set null,
  auteur_prenom text,
  auteur_ville  text,
  note          integer not null check (note between 1 and 5),
  commentaire   text not null,
  valide        boolean not null default false,
  created_at    timestamptz not null default now()
);

alter table public.reviews enable row level security;

create policy "Lecture publique des avis validés"
  on public.reviews for select
  using (valide = true);

create policy "Dépôt d'avis par les clientes connectées"
  on public.reviews for insert
  with check ((select auth.uid()) = customer_id);

-- ---------- NEWSLETTER ----------
create table public.newsletter_subscribers (
  id              uuid primary key default gen_random_uuid(),
  email           text not null unique,
  code_bienvenue  text not null default 'BIENVENUE10',
  date            timestamptz not null default now()
);

alter table public.newsletter_subscribers enable row level security;

-- Tout le monde peut s'inscrire ; personne ne peut lire la liste (anti-scraping)
create policy "Inscription newsletter publique"
  on public.newsletter_subscribers for insert
  with check (true);

-- ---------- REFERRALS (parrainage — phase 2) ----------
create table public.referrals (
  id         uuid primary key default gen_random_uuid(),
  parrain_id uuid not null references public.profiles (id) on delete cascade,
  code       text not null unique,
  filleul_id uuid references public.profiles (id) on delete set null,
  statut     text not null default 'en_attente'
             check (statut in ('en_attente', 'valide', 'recompense')),
  created_at timestamptz not null default now()
);

alter table public.referrals enable row level security;

create policy "Lecture de ses parrainages"
  on public.referrals for select
  using ((select auth.uid()) = parrain_id or (select auth.uid()) = filleul_id);

create policy "Création de son code de parrainage"
  on public.referrals for insert
  with check ((select auth.uid()) = parrain_id);

-- ---------- SUBSCRIPTIONS (abonnement recharges) ----------
create table public.subscriptions (
  id                 uuid primary key default gen_random_uuid(),
  customer_id        uuid not null references public.profiles (id) on delete cascade,
  type               text not null default '3_recharges_an'
                     check (type in ('3_recharges_an')),
  statut             text not null default 'active'
                     check (statut in ('active', 'en_pause', 'annulee')),
  prochaine_recharge date,
  created_at         timestamptz not null default now()
);

alter table public.subscriptions enable row level security;

create policy "Lecture de ses abonnements"
  on public.subscriptions for select
  using ((select auth.uid()) = customer_id);

-- Création/gestion des abonnements : phase 2 (Stripe, via service role qui
-- contourne la RLS). Pas de policy insert/update côté client volontairement.
