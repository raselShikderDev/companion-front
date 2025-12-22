/** biome-ignore-all assist/source/organizeImports: > */
"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useActionState } from "react"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"
import { useEffect } from "react"
import { updateProfile } from "@/services/auth/updateProfile.service"

interface SettingsFormProps {
  profile: {
    fullName: string
    phone: string
    address?: string
    bio?: string
    age?: string
    gender: string
    travelStyleTags: string[]
    interests: string[]
  }
}

export function SettingsForm({ profile }: SettingsFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfile, null)

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
    } else if (state?.success === false) {
      toast.error(state.message)
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" name="fullName" defaultValue={profile.fullName} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" name="phone" type="tel" defaultValue={profile.phone} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="age">Age</Label>
          <Input id="age" name="age" type="number" defaultValue={profile.age} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender</Label>
          <Input id="gender" name="gender" defaultValue={profile.gender} disabled className="bg-muted" />
          <p className="text-xs text-muted-foreground">Gender cannot be changed</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Input id="address" name="address" defaultValue={profile.address || ""} />
      </div>

      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          name="bio"
          rows={4}
          defaultValue={profile.bio || ""}
          placeholder="Tell us about yourself and your travel experiences..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="travelStyleTags">Travel Style Tags</Label>
        <Input
          id="travelStyleTags"
          name="travelStyleTags"
          defaultValue={profile.travelStyleTags.join(", ")}
          placeholder="e.g., Adventure, Luxury, Budget, Cultural"
        />
        <p className="text-xs text-muted-foreground">Separate multiple tags with commas</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="interests">Interests</Label>
        <Input
          id="interests"
          name="interests"
          defaultValue={profile.interests.join(", ")}
          placeholder="e.g., Hiking, Photography, Food, History"
        />
        <p className="text-xs text-muted-foreground">Separate multiple interests with commas</p>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => window.location.reload()}>
          Cancel
        </Button>
        <Button type="submit" disabled={isPending} className="bg-accent hover:bg-accent/90 text-accent-foreground">
          {isPending ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  )
}
