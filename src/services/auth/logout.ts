/** biome-ignore-all assist/source/organizeImports: > */
"use server";


import { deleteCookie } from "@/lib/tokenHandeler";
import { redirect } from "next/navigation";

export const logOutUser = async () => {
 await deleteCookie("accessToken")
 await deleteCookie("refreshToken")

 redirect("/signin?logout=true")
};
