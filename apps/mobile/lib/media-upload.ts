import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import { supabase } from "./supabase-client";
import { getCurrentUserWithProfile } from "./auth-helpers";

export interface UploadedMediaResult {
  id: string;
  storage_path: string;
  media_type: string;
}

export async function pickImagesFromLibrary() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== "granted") {
    Alert.alert(
      "No access to photos",
      "Please allow access to your gallery to add photos to your report."
    );
    return [];
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    allowsMultipleSelection: true,
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 0.8
  });

  if (result.canceled) {
    return [];
  }

  return result.assets;
}

export async function uploadImagesForReport(
  reportId: string
): Promise<UploadedMediaResult[]> {
  if (!supabase) {
    Alert.alert(
      "Backend not configured",
      "Reporting backend is not configured on this device yet."
    );
    return [];
  }

  const { userId } = await getCurrentUserWithProfile();
  if (!userId) return [];

  const assets = await pickImagesFromLibrary();
  if (!assets.length) return [];

  const uploaded: UploadedMediaResult[] = [];

  for (const asset of assets) {
    try {
      const uri = asset.uri;
      const ext = asset.fileName?.split(".").pop() || "jpg";
      const fileName = `${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${ext}`;
      const path = `${userId}/${reportId}/${fileName}`;
      const contentType =
        asset.mimeType || (ext === "png" ? "image/png" : "image/jpeg");

      const fileResp = await fetch(uri);
      const blob = await fileResp.blob();

      const { error: uploadError } = await supabase.storage
        .from("report-media")
        .upload(path, blob, {
          contentType,
          upsert: false
        });

      if (uploadError) {
        console.error("storage upload failed", uploadError);
        continue;
      }

      const { data: row, error: rowError } = await supabase
        .from("report_media")
        .insert({
          report_id: reportId,
          user_id: userId,
          storage_path: path,
          media_type: contentType
        })
        .select("id, storage_path, media_type")
        .maybeSingle();

      if (rowError || !row) {
        console.error("report_media insert failed", rowError);
        continue;
      }

      uploaded.push(row as UploadedMediaResult);
    } catch (e) {
      console.error("uploadImagesForReport asset failed", e);
    }
  }

  if (!uploaded.length) {
    Alert.alert(
      "No photos added",
      "We could not upload your photos this time. You can still send the report without images."
    );
  }

  return uploaded;
}

