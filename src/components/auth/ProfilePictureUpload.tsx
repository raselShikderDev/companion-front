/** biome-ignore-all assist/source/organizeImports: <explanation> */
"use client"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload } from "lucide-react"
import { toast } from "sonner"
import { updateProfilePicture } from "@/services/auth/updateProfile.service"

interface ProfilePictureUploadProps {
  currentImage?: string | null
}

export function ProfilePictureUpload({ currentImage }: ProfilePictureUploadProps) {
  const [imageUrl, setImageUrl] = useState("")
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState(currentImage || "")

  const handleUpdate = async () => {
    if (!imageUrl.trim()) {
      toast.error("Please enter an image URL")
      return
    }

    setLoading(true)
    try {
      const result = await updateProfilePicture(imageUrl)

      if (result.success) {
        toast.success(result.message)
        setPreview(imageUrl)
        setImageUrl("")
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col md:flex-row items-start gap-6">
      <div className="flex flex-col items-center gap-3">
        <Avatar className="w-32 h-32">
          <AvatarImage src={preview || undefined} alt="Profile" />
          <AvatarFallback className="text-2xl">{preview ? "PP" : "?"}</AvatarFallback>
        </Avatar>
        <p className="text-xs text-muted-foreground text-center max-w-[150px]">Current profile picture</p>
      </div>

      <div className="flex-1 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image URL from ImageBB</Label>
          <Input
            id="imageUrl"
            type="url"
            placeholder="https://i.ibb.co/..."
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">Upload your image to ImageBB and paste the direct link here</p>
        </div>

        <Button
          onClick={handleUpdate}
          disabled={loading || !imageUrl.trim()}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Updating...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4 mr-2" />
              Update Picture
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
