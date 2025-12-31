/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/style/useImportType: > */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */


import { getMyReviews } from "@/services/review/myReview.service";
import {
  queryStringFormatter,
} from "@/lib/allFormattors";
import ReviewSearchFilter from "@/components/admin/manageReviews/ReviewSearchFilter";
import ExplorerRevewsTable from "@/components/explorer/review/ExplorerRevewsTable";
import Pagination from "@/components/shared/Paggination";

export default async function Reviews({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getMyReviews(queryString);
  console.log({ res });

  let reviews: any | [];
  if (res.success) {
    reviews = res.data;
  } else {
    reviews = [];
  }


  console.log("Reviews fetched:", reviews);
    const totalPages = Math.ceil(res?.meta?.total / res?.meta?.limit) || 1;
  const currentpage = res?.meta?.page || 1;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Trip Reviews</h1>
        <p className="text-muted-foreground">
          Read and share real-time reviews from fellow travelers
        </p>
      </div>
      <ReviewSearchFilter />
      <ExplorerRevewsTable reviews={reviews} />
      <Pagination currentPages={currentpage} totalPages={totalPages} />
    </div>
  );
}
