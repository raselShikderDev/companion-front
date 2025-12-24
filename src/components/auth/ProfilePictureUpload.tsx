"use client";

import { useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateProfilePicture } from "@/services/auth/updateProfile.service";
import { getInitials } from "@/lib/allFormattors";
import { uploadToImageBB } from "@/lib/uploadImage";

interface ProfilePictureUploadProps {
  profilePicture?: string | null;
  name?: string | null;
}

export function ProfilePictureUpload({
  profilePicture,
  name,
}: ProfilePictureUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isPending, startTransition] = useTransition();


  const isBusy = uploading || isPending;

  /* ---------------- Image Selection ---------------- */
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  /* ---------------- Upload + Save ---------------- */
  const handleSave = async () => {
    if (!file) {
      toast.error("Please select an image first");
      return;
    }

    setUploading(true);
    try {
      // 1. Upload to ImageDB
      const imageUrl = await uploadToImageBB(file);

      // 2. Save URL to backend
      startTransition(async () => {
        const res = await updateProfilePicture(imageUrl);
       
        
        if (res.success) {
          toast.success(res.message || "Profile picture updated");
          setFile(null);
        } else {
          toast.error(res.message || "Update failed");
        }
      });
    } catch (err) {
      toast.error("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center gap-6">
      {/* Avatar */}
      <div className="relative">
        <Avatar className="h-32 w-32 border">
          <AvatarImage src={preview || profilePicture || ""} />
          <AvatarFallback className="text-3xl font-semibold">
            {getInitials(name || "")}
          </AvatarFallback>
        </Avatar>

        {/* Upload overlay */}
        <label
          htmlFor="avatar-upload"
          className={`absolute bottom-1 right-1 rounded-full p-2 cursor-pointer
            bg-primary text-primary-foreground hover:bg-primary/90
            ${isBusy ? "opacity-50 pointer-events-none" : ""}`}
        >
          {uploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Camera className="h-4 w-4" />
          )}
        </label>

        <Input
          id="avatar-upload"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleSelectImage}
          disabled={isBusy}
        />
      </div>

      {/* Action */}
      {file && (
        <Button onClick={handleSave} disabled={isBusy}>
          {isBusy ? "Saving..." : "Save"}
        </Button>
      )}
    </div>
  );
}
