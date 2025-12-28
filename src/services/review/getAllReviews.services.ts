/** biome-ignore-all lint/suspicious/noExplicitAny: > */
"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getAllReviews = async (queryString?: string) => {
    try {

        const res = await serverFetch.get(
            `/review${queryString ? `?${queryString}` : ""}`
        );

        const data = await res.json();
        console.log({ data });

        return data;
    } catch (error: any) {
        console.error("Get all reviews Error:", error.message);
        return {
            success: false,
            message: "Server error while fetching reviews",
        };
    }
};
