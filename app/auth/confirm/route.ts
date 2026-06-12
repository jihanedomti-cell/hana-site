import { createClient } from "@/lib/supabase/server";
import { type EmailOtpType } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";

/**
 * Confirmation du magic link — accepte les DEUX formats d'email Supabase :
 * - `?code=...` : template par défaut (ConfirmationURL, flux PKCE) —
 *   aucun réglage dashboard nécessaire
 * - `?token_hash=...&type=...` : template personnalisé (TokenHash)
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/compte";

  const supabase = await createClient();

  // Format par défaut : échange du code PKCE contre une session
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) redirect(next);
    redirect(`/auth/error?error=${encodeURIComponent(error.message)}`);
  }

  // Format template personnalisé : vérification du token_hash
  if (token_hash && type) {
    const { error } = await supabase.auth.verifyOtp({ type, token_hash });
    if (!error) redirect(next);
    redirect(`/auth/error?error=${encodeURIComponent(error.message)}`);
  }

  redirect(`/auth/error?error=${encodeURIComponent("Lien invalide ou expiré")}`);
}
