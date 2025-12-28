/** biome-ignore-all assist/source/organizeImports: > */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MatchsTable from "@/components/admin/matchs/MatchsTable";
import Pagination from "@/components/shared/Paggination";
import { queryStringFormatter } from "@/lib/allFormattors";
import getAllMatches from "@/services/match/getAllMatches.service";
import DateRangeFilter from "@/components/shared/DateRangeFilter";
import ClearFiltersButton from "@/components/shared/ClearFilter";
import SelectFilter from "@/components/shared/SelectFilter";

export default async function ManageMatches({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getAllMatches(queryString);
  console.log({ res });

  const matches = res.success ? res.data : [];
  console.log({ matches });

  const totalPages = Math.ceil(res?.meta?.total / res?.meta?.limit) || 1;
  const currentpage = res?.meta?.page || 1;

  console.log({ totalpage: Math.ceil(res?.meta?.total / res?.meta?.limit) });
  console.log({ currentpage: res.meta?.page });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Manage Matches</h1>
        <p className="text-muted-foreground">
          Review and handles smart matched created by explorers{" "}
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Explorer Matches</CardTitle>
          <CardDescription>Total: {res.meta?.total} matches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
              <div className="flex items-center gap-3">
        <SelectFilter
          paramName="status"
          placheholder="Match Status"
          defaultValue="All Matches"
          options={[
            { label: "PENDING", value: "false" },
            { label: "ACCEPTED", value: "true" },
            { label: "REJECTED", value: "true" },
            { label: "COMPLETED", value: "true" },
          ]}
        />
        <DateRangeFilter />
        <ClearFiltersButton />
      </div>
          </div>
          <div className="space-y-3.5">
            <MatchsTable matches={matches} />
            <Pagination currentPages={currentpage} totalPages={totalPages} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
