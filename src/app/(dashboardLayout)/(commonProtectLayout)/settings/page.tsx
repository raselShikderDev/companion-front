/** biome-ignore-all assist/source/organizeImports: > */
import { ProfilePictureUpload } from "@/components/settingsPage/ProfilePictureUpload";
import { SettingsForm } from "@/components/settingsPage/SettingsForm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function SettingsPage() {
  const user = await getUserInfo();
  const { explorer, admin } = user;
  const role = user.role;

  let profile: any | null = null;

  if (explorer) {
    profile = {
      role: "EXPLORER",
      fullName: explorer.fullName,
      phone: explorer.phone,
      gender: explorer.gender,
      age: explorer.age,
      address: explorer.address,
      bio: explorer.bio,
      travelStyleTags: explorer.travelStyleTags,
      interests: explorer.interests,
      profilePicture: explorer.profilePicture,
    };
  }

  if (admin) {
    profile = {
      role: "ADMIN",
      fullName: admin.fullName,
      phone: admin.phone,
      address: admin.address,
      bio: admin.bio,
      profilePicture: admin.profilePicture,
    };
  }

  if (!profile) {
    return <p className="text-destructive">Failed to load profile</p>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Settings</h1>
      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Upload a square image</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfilePictureUpload
            profilePicture={profile.profilePicture}
            name={profile.fullName}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
        </CardHeader>
        <CardContent>
          <SettingsForm profile={profile} role={role} />
        </CardContent>
      </Card>
    </div>
  );
}
