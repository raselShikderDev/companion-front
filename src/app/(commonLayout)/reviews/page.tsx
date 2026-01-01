/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */
export const dynamic = "force-dynamic";

import ExplorerRevewsTable from "@/components/explorer/review/ExplorerRevewsTable";
import { getAllReviews } from "@/services/review/getAllReviews.services";

export default async function ReviewsPage() {
  const res = await getAllReviews();
  console.log({ res });

  let reviews: any | [];
  if (res?.success) {
    reviews = res?.data;
  } else {
    reviews = [];
  }
  console.log({ reviews });

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Top Reviews</h1>
        <p className="text-muted-foreground">
          Read and share real-time reviews from fellow travelers
        </p>
      </div>
      <ExplorerRevewsTable reviews={reviews?.data} />
    </div>
  );
}
