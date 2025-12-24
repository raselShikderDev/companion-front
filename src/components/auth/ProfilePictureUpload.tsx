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
console.log({profilePicture});

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
        console.log(res);
        
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


// "use client";

// import { useState, useTransition } from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Input } from "@/components/ui/input";
// import { Camera, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { updateProfilePicture } from "@/services/auth/updateProfile.service";
// import { uploadToImageBB } from "@/lib/uploadImage";

// interface ProfilePictureUploadProps {
//   profilePicture?: string | null;
//   name?: string | null;
// }

// export function ProfilePictureUpload({
//   profilePicture,
//   name,
// }: ProfilePictureUploadProps) {
//   const [preview, setPreview] = useState<string | null>(null);
//   const [uploading, setUploading] = useState(false);
//   const [isPending, startTransition] = useTransition();

//   const disabled = uploading || isPending;

//   const fallbackLetter = name?.charAt(0).toUpperCase() ?? "?";

//   const handleFileChange = async (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     // Instant preview
//     const localPreview = URL.createObjectURL(file);
//     setPreview(localPreview);

//     try {
//       setUploading(true);

//       // 1️⃣ Upload to ImageDB
//       const uploadedUrl = await uploadToImageBB(file);

//       // 2️⃣ Update profile image
//       startTransition(async () => {
//         const res = await updateProfilePicture(uploadedUrl);

//         if (res.success) {
//           toast.success(res.message);
//         } else {
//           toast.error(res.message);
//           setPreview(null);
//         }
//       });
//     } catch (error) {
//       toast.error("Image upload failed");
//       setPreview(null);
//     } finally {
//       setUploading(false);
//     }
//   };

//   return (
//     <div className="flex items-center gap-6">
//       <div className="relative">
//         <Avatar className="h-32 w-32 border">
//           <AvatarImage
//             src={preview ?? profilePicture ?? undefined}
//             alt={name ?? "Profile picture"}
//           />
//           <AvatarFallback className="text-3xl font-semibold">
//             {fallbackLetter}
//           </AvatarFallback>
//         </Avatar>

//         <label
//           htmlFor="profile-image"
//           className="absolute bottom-1 right-1 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow hover:bg-primary/90"
//         >
//           {disabled ? (
//             <Loader2 className="h-4 w-4 animate-spin" />
//           ) : (
//             <Camera className="h-4 w-4" />
//           )}

//           <Input
//             id="profile-image"
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleFileChange}
//             disabled={disabled}
//           />
//         </label>
//       </div>
//     </div>
//   );
// }


// /** biome-ignore-all assist/source/organizeImports: <explanation> */
// "use client"

// import { useState, useTransition } from "react"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Camera, Loader2, Upload } from "lucide-react"
// import { toast } from "sonner"
// import { updateProfilePicture } from "@/services/auth/updateProfile.service"
// import { getInitials } from "@/lib/allFormattors"
// import { useRouter } from "next/navigation"
// import { IExplorer } from "@/types/explorer.interface"
// import { IAdmin } from "@/types/admin/admin.interface"
// import { uploadToImageBB } from "@/lib/uploadImage"

// interface ProfilePictureUploadProps {
//   profilePicture?: string | null;
//   name?: string | null
// }

// export function ProfilePictureUpload({ profilePicture, name }: ProfilePictureUploadProps) {
//   console.log({ profilePicture });

//   if (!profilePicture && name) {
//     return <div>NO image found</div>
//   }

//   const [imageUrl, setImageUrl] = useState("")
//   const [uploading, setUploading] = useState<boolean>(false)
//   const [isPending, startTransition] = useTransition();
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
//   const [file, setFile] = useState<File | null>(null);


//   const handleUpdate = async () => {
//     if (!imageUrl.trim()) {
//       toast.error("Please enter an image URL")
//       return
//     }

//     try {
//       const result = await updateProfilePicture(uploadedUrl as string)

//       if (result.success) {
//         toast.success(result.message)
//         setImageUrl("")
//       } else {
//         toast.error(result.message)
//       }
//     } catch (error) {
//       toast.error("An error occurred. Please try again.")
//     } finally {
//     }
//   }

//     const handleUpload = async () => {
//       if (!file) return;
//       setUploading(true);
//       console.log("Uploading file to imagedb");
//       try {
//         const url = await uploadToImageBB(file);
//         setUploadedUrl(url);
//           console.log(" file uploaded");

//       } catch (err) {
//         console.error(err);
//       } finally {
//         setUploading(false);
//       }
//     };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) {
//       return
//     };
//     if (file) {
//       setFile(file)
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//       handleUpload()
//     }
//     if (uploadedUrl) {
//       handleUpdate()
//     }
//   };

//   return (
//     <div className="flex flex-col md:flex-row items-start gap-6">
//       <div className="relative">
//         <Avatar className="h-32 w-32">
//           {previewImage || "" ? (
//             <AvatarImage
//               src={previewImage || ""}
//               alt={name as string}
//             />
//           ) : (
//             <AvatarFallback className="text-3xl">
//               {getInitials(profilePicture as string)}
//             </AvatarFallback>
//           )}
//         </Avatar>
//         <label
//           htmlFor="file"
//           className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90 transition-colors"
//         >
//           <Camera className="h-4 w-4" />
//           <Input
//             type="file"
//             id="file"
//             name="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleImageChange}
//             disabled={isPending || uploading}
//           />
//         </label>
//       </div>
//     </div>
//   )
// }
