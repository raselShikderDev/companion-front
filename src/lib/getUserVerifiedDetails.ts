/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/correctness/noUnusedImports: > */
/** biome-ignore-all lint/style/useImportType: > */
import { getUserInfo } from "@/services/auth/getUserInfo";

export default async function getUserVerifiedDetails() {
  const user = await getUserInfo();
  return user.explorer
}
