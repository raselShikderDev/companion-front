"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getMatchById = async (matchId: string) => {
  const res = await serverFetch.get(`/match/${matchId}`);
  return res.json();
};
