import { serverFetch } from "@/lib/serverFetch";

export async function getTripById(id: string) {
  const res = await serverFetch.get(`/trip/${id}`);

  const data = await res.json();
  return data;
}
