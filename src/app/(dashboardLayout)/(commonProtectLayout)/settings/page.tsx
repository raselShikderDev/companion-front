/** biome-ignore-all assist/source/organizeImports: > */
import { ProfilePictureUpload } from "@/components/auth/ProfilePictureUpload"
import { SettingsForm } from "@/components/auth/SettingsForm"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getUserInfo } from "@/services/auth/getUserInfo"

export default async function SettingsPage() {
  
  const user = await getUserInfo();
  const { explorer, admin } = user;


let profile:any | null;

if (explorer) {
  profile = explorer
} else if(admin){
  profile = admin
} else {
profile = null
}

console.log({user});
console.log(explorer, admin);



  if (!profile) {
    return (
      <div className="p-6">
        <p className="text-destructive">Failed to load profile. Please try again.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-2">Manage your account settings and profile information</p>
      </div>

      <Separator />

      {/* Profile Picture Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Picture</CardTitle>
          <CardDescription>Update your profile picture. Recommended size: 400x400px</CardDescription>
        </CardHeader>
        <CardContent>
          <ProfilePictureUpload profilePicture={profile?.profilePicture} name={profile?.fullName} />
        </CardContent>
      </Card>

      {/* Profile Information Section */}
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your personal information and travel preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm profile={profile} />
        </CardContent>
      </Card>
    </div>
  )
}
