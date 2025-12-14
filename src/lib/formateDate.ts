/** biome-ignore-all lint/suspicious/noGlobalIsNan: > */
export const formatDate = (dateStr?: string) => {
  if (!dateStr) return "N/A";
  const d = new Date(dateStr);
  return isNaN(d.getTime()) ? "N/A" : d.toLocaleDateString();
};