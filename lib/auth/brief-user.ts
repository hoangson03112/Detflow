import { createClient } from "@/lib/supabase/server";

export type AuthUserBrief = {
  email: string | null;
  name: string | null;
  avatarUrl: string | null;
};

/** Serializable snapshot for passing from server layout → client header. */
export async function getAuthUserBrief(): Promise<AuthUserBrief | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!url || !key) {
    return null;
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const meta = user.user_metadata as Record<string, string | undefined> | undefined;
  const email = user.email ?? null;
  const name =
    (typeof meta?.full_name === "string" && meta.full_name.trim()) ||
    (typeof meta?.name === "string" && meta.name.trim()) ||
    (email ? email.split("@")[0] : null);
  const avatarUrl =
    (typeof meta?.avatar_url === "string" && meta.avatar_url) ||
    (typeof meta?.picture === "string" && meta.picture) ||
    null;

  return { email, name, avatarUrl };
}
