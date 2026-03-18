import { Alert } from "react-native";
import { supabase } from "./supabase-client";

export interface CurrentUserResult {
  userId: string | null;
  errorMessage: string | null;
}

/**
 * Gets the current authenticated user id and makes sure a profile row exists.
 * Shows user-friendly alerts on common problems.
 */
export async function getCurrentUserWithProfile(): Promise<CurrentUserResult> {
  if (!supabase) {
    Alert.alert(
      "Backend not configured",
      "Reporting backend is not configured on this device yet."
    );
    return { userId: null, errorMessage: "supabase_not_configured" };
  }

  const { data: userResult, error: userError } = await supabase.auth.getUser();

  if (userError) {
    console.warn("supabase.auth.getUser error", userError);
  }

  const userId = userResult?.user?.id ?? null;

  if (!userId) {
    Alert.alert(
      "Sign in required",
      "To send a report, sign in so we can link it to your profile."
    );
    return { userId: null, errorMessage: "no_user" };
  }

  // Try to ensure there is a matching profile row for this user.
  // Schema RLS allows insert when auth.uid() = id.
  const { error: profileError } = await supabase
    .from("profiles")
    .upsert({ id: userId }, { onConflict: "id" });

  if (profileError) {
    console.warn("profiles upsert failed", profileError);
    // Do not block the flow; insert into reports may still work if profile exists.
  }

  return { userId, errorMessage: null };
}

