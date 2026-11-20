import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qzacuwzqzmmjdsabfffy.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF6YWN1d3pxem1tamRzYWJmZmZ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ2NDU4MTksImV4cCI6MjEwMDIyMTgxOX0.-Nv_m5Q8pUtAsq5ShOTdF_l77PK4vogm2eVBzUlZenA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

// Helper for file/image uploads to Supabase Storage bucket 'srevzone-media'
export async function uploadToSupabaseStorage(file, bucket = "srevzone-media") {
  try {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false
      });

    if (error) {
      console.warn("Supabase Storage upload warning, using local preview URL:", error.message);
      return URL.createObjectURL(file);
    }

    const { data: publicData } = supabase.storage
      .from(bucket)
      .getPublicUrl(filePath);

    return publicData.publicUrl;
  } catch (err) {
    console.error("Storage error:", err);
    return URL.createObjectURL(file);
  }
}
