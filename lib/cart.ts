/**
 * Panier HANA — persistance localStorage (invitées comprises).
 * TODO Supabase : synchroniser avec la base quand la cliente est connectée
 * (table orders en statut 'en_attente' — voir page /panier).
 * Utilisé uniquement depuis des composants client.
 */

export type CartItem = {
  slug: string;
  nom: string;
  prix: number;
  parfum: string;
  quantite: number;
};

const STORAGE_KEY = "hana-cart";
/** Événement émis à chaque modification — pour le badge panier de la navbar. */
export const CART_EVENT = "hana-cart-updated";

function notify() {
  window.dispatchEvent(new Event(CART_EVENT));
}

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function saveCart(items: CartItem[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  notify();
}

/** Ajoute un article (fusionne si même produit + même parfum). */
export function addToCart(
  item: Omit<CartItem, "quantite">,
  quantite: number = 1,
) {
  const cart = getCart();
  const existing = cart.find(
    (i) => i.slug === item.slug && i.parfum === item.parfum,
  );
  if (existing) {
    existing.quantite += quantite;
  } else {
    cart.push({ ...item, quantite });
  }
  saveCart(cart);
}

export function setQuantite(slug: string, parfum: string, quantite: number) {
  const cart = getCart()
    .map((i) =>
      i.slug === slug && i.parfum === parfum ? { ...i, quantite } : i,
    )
    .filter((i) => i.quantite > 0);
  saveCart(cart);
}

export function removeFromCart(slug: string, parfum: string) {
  saveCart(getCart().filter((i) => !(i.slug === slug && i.parfum === parfum)));
}

export function clearCart() {
  saveCart([]);
}

/** Nombre total d'articles (pour le badge navbar). */
export function cartCount(): number {
  return getCart().reduce((n, i) => n + i.quantite, 0);
}

/** Total du panier en euros. */
export function cartTotal(): number {
  return getCart().reduce((t, i) => t + i.prix * i.quantite, 0);
}
