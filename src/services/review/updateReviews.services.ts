"use server"

import { serverFetch } from "@/lib/serverFetch";
import { ReviewStatus } from "@/types/enum.interface";
import { revalidatePath } from "next/cache";

 
 export async function updateReviewStatus( reviewId: string, status: ReviewStatus) {
   const res = await serverFetch.patch(`/review/change-status/${reviewId}`, {
     body: JSON.stringify({ status }),
     headers: {
       "Content-Type": "application/json",
     },
   });
    revalidatePath("dashboard");
    revalidatePath("dashboard/reviews");
   return res.json();
 }
 