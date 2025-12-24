/** biome-ignore-all assist/source/organizeImports: <explanation> */
/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
"use server"

import { serverFetch } from "@/lib/serverFetch"
import { revalidatePath } from "next/cache"

export async function updateProfile(_currentState: any, formData: FormData) {
  try {
    const payload = {
      fullName: formData.get("fullName"),
      phone: formData.get("phone"),
      address: formData.get("address"),
      bio: formData.get("bio"),
      age: formData.get("age"),
      travelStyleTags: formData.getAll("travelStyleTags").filter(Boolean),
      interests: formData.getAll("interests").filter(Boolean),
    }

    const res = await serverFetch.patch("/explorer/update-profile", {
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()

    if (!res.ok || !data?.success) {
      return {
        success: false,
        message: data?.message || "Failed to update profile",
      }
    }

    revalidatePath("/dashboard/settings")
    return {
      success: true,
      message: "Profile updated successfully",
    }
  } catch (error: any) {
    console.error("[v0] Update profile error:", error)
    return {
      success: false,
      message: error.message || "Server error",
    }
  }
}

export async function updateProfilePicture(imageUrl: string) {
  try {
    const res = await serverFetch.patch("/users/profile-picture", {
      body: JSON.stringify({ profilePicture: imageUrl }),
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await res.json()
console.log(data);

    if (!res.ok || !data?.success) {
      return {
        success: false,
        message: data?.message || "Failed to update profile picture",
      }
    }

    revalidatePath("/settings")
    return data.data
  } catch (error: any) {
    console.error(" Update profile picture error:", error)
    return {
      success: false,
      message: error.message || "Server error",
    }
  }
}

export async function getExplorerProfile() {
  try {
    const res = await serverFetch.get("/explorer/me")
    const data = await res.json()

    if (!res.ok || !data?.success) {
      return null
    }

    return data.data
  } catch (error) {
    console.error("[v0] Get explorer profile error:", error)
    return null
  }
}
