"use server";

import { serverFetch } from "@/lib/serverFetch";

export const getReviewsByMatchId = async (matchId: string) => {
  const res = await serverFetch.get(`/review/match/${matchId}`);
  return res.json();
};
