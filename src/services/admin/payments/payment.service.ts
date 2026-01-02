
"use server";

/** biome-ignore-all lint/suspicious/noExplicitAny: > */

import { serverFetch } from "@/lib/serverFetch";

export async function getAllPayments(queryString?: string) {


    const res = await serverFetch.get(
        `/payment${queryString ? `?${queryString}` : ""}`
    );

    const data = res.json();
    console.log({ data });

    return data
}