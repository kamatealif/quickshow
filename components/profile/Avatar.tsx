"use client";

import { useState } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Loader2 } from "lucide-react";

interface AvatarProps {
  uid: string;
  url: string | null;
  name: string;
  onUpload: (url: string) => void;
}

export default function ProfileAvatar({
  uid,
  url,
  name,
  onUpload,
}: AvatarProps) {
  const supabase = createSupabaseBrowserClient();
  const [uploading, setUploading] = useState(false);

  async function upload(event: React.ChangeEvent<HTMLInputElement>) {
    try {
      setUploading(true);
      if (!event.target.files || event.target.files.length === 0) return;

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", uid);

      if (updateError) throw updateError;
      onUpload(publicUrl);
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="relative group">
      <Avatar className="h-32 w-32 border-[6px] border-background shadow-2xl rounded-[2.5rem] overflow-hidden">
        <AvatarImage src={url || ""} className="object-cover" />
        <AvatarFallback className="bg-secondary text-3xl font-bold rounded-[2.2rem]">
          {name?.charAt(0)}
        </AvatarFallback>
      </Avatar>

      <label
        htmlFor="avatar-upload"
        className="absolute bottom-0 right-0 p-2.5 bg-primary text-primary-foreground rounded-2xl cursor-pointer shadow-lg hover:scale-105 transition-all border-4 border-background"
      >
        {uploading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Camera className="w-4 h-4" />
        )}
        <input
          type="file"
          id="avatar-upload"
          className="hidden"
          accept="image/*"
          onChange={upload}
          disabled={uploading}
        />
      </label>
    </div>
  );
}
