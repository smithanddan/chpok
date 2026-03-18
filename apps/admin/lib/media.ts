import { createClient } from "./supabase-client";

export async function getSignedMediaUrl(storagePath: string) {
  const supabase = createClient();

  try {
    const { data, error } = await supabase.storage
      .from("report-media")
      .createSignedUrl(storagePath, 60 * 10);

    if (error || !data?.signedUrl) {
      console.error("Failed to create signed media URL", error);
      return null;
    }

    return data.signedUrl;
  } catch (e) {
    console.error("getSignedMediaUrl error", e);
    return null;
  }
}

