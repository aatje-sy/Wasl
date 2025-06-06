import { supabase } from "../supabase";

export const uploadImageToSupabase = async (file) => {
    const fileName = `${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
        .from("post-images")
        .upload(fileName, file);

    if (error) throw error;

    const { data: urlData } = supabase.storage
        .from("post-images")
        .getPublicUrl(fileName);

    return urlData.publicUrl;
};