/** biome-ignore-all assist/source/organizeImports: > */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import { updateProfile } from "@/services/auth/updateProfile.service";
import { UserRole } from "@/lib/authUtils";
import { Role } from "@/types/enum.interface";
// import { updateMyProfile } from "@/services/auth/updateUser.services";

interface SettingsFormProps {
  profile: {
    fullName: string;
    phone: string;
    address?: string;
    bio?: string;
    age?: string;
    gender: string;
    travelStyleTags?: string[];
    interests?: string[];
  };
  role: UserRole;
}

export function SettingsForm({ profile, role }: SettingsFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfile, null);
  const [isDirty, setIsDirty] = useState(false);
  const initialValuesRef = useRef<Record<string, string>>({});
  const travelStyleTags = profile.travelStyleTags ?? [];
  const interests = profile.interests ?? [];
  const isExplorer = role !== Role.ADMIN && role !== Role.SUPER_ADMIN;


  useEffect(() => {
    initialValuesRef.current = {
      fullName: profile.fullName || "",
      phone: profile.phone || "",
      address: profile.address || "",
      bio: profile.bio || "",
      ...(isExplorer && {
        age: profile.age || "",
        travelStyleTags: travelStyleTags.join(", "),
        interests: interests.join(", "),
      }),
      //  age: profile.age || "",
      // travelStyleTags: travelStyleTags.join(", "),
      // interests: interests.join(", "),


    };
  }, [profile]);


  const handleFormChange = (e: React.FormEvent<HTMLFormElement>) => {
    console.log(e.currentTarget);

    const formData = new FormData(e.currentTarget);

    

    for (const [key, initialValue] of Object.entries(
      initialValuesRef.current
    )) {
      const currentValue = String(formData.get(key) || "");
      if (currentValue !== initialValue) {
        setIsDirty(true);
        return;
      }
    }

    setIsDirty(false);
  };

  useEffect(() => {
    if (state?.success) {
      console.log("Successfully updated");

      toast.success(state.message);
      setIsDirty(false);
    } else if (state?.success === false) {
      console.log("Update failed");
      toast.error(state?.message);
    }
  }, [state]);
  console.log({ state });

  return (
    <form
      action={formAction}
      onChange={handleFormChange}
      onSubmit={(e) => {
        if (!isExplorer) {
          const form = e.currentTarget;
          form.querySelector<HTMLInputElement>('input[name="travelStyleTags"]')?.remove();
          form.querySelector<HTMLInputElement>('input[name="interests"]')?.remove();
        }
      }}
      className="space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" name="fullName" defaultValue={profile.fullName} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input id="phone" name="phone" type="tel" defaultValue={profile.phone} required />
        </div>
        {
          isExplorer && (
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input id="age" name="age" type="number" defaultValue={profile.age} />
            </div>
          )
        }


        {
          isExplorer && (
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Input id="gender" name="gender" defaultValue={profile.gender} disabled className="bg-muted" />
              <p className="text-xs text-muted-foreground">Gender cannot be changed</p>
            </div>
          )
        }
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
        />
      </div>

      {
        isExplorer && (
          <div className="space-y-2">
            <Label htmlFor="travelStyleTags">Travel Style Tags</Label>
            <Input
              id="travelStyleTags"
              name="travelStyleTags"
              defaultValue={travelStyleTags.join(", ")}
            />
          </div>
        )
      }
      {/* <div className="space-y-2">
        <Label htmlFor="travelStyleTags">Travel Style Tags</Label>
        <Input
          id="travelStyleTags"
          name="travelStyleTags"
          defaultValue={profile.travelStyleTags.join(", ")}
        />
      </div> */}
      {
        isExplorer && (
          <div className="space-y-2">
            <Label htmlFor="interests">Interests</Label>
            <Input
              id="interests"
              name="interests"
              defaultValue={interests.join(", ")}
            />
          </div>
        )
      }

      {/* <div className="space-y-2">
        <Label htmlFor="interests">Interests</Label>
        <Input
          id="interests"
          name="interests"
          defaultValue={profile.interests.join(", ")}
        />
      </div> */}

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => window.location.reload()}>
          Cancel
        </Button>

        {/* ✅ Save disabled unless dirty */}
        <Button
          type="submit"
          disabled={!isDirty || isPending}
          className="bg-accent hover:bg-accent/90 text-accent-foreground"
        >
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
  );
}
