// app/(dashboardLayout)/admin/subscriptions/page.tsx

import SubscriptionGrid from "@/components/admin/subscription/SubscriptionGrid";
import SubscriptionTable from "@/components/admin/subscription/SubscriptionTable";
import ClearFiltersButton from "@/components/shared/ClearFilter";
import DateRangeFilter from "@/components/shared/DateRangeFilter";
import Pagination from "@/components/shared/Paggination";
import SelectFilter from "@/components/shared/SelectFilter";
import { queryStringFormatter } from "@/lib/allFormattors";
import { getAllSubscriptions } from "@/services/subscription/subscription.service";
import { SubscriptionPlan } from "@/types/enum.interface";

export default async function AdminSubscriptionsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getAllSubscriptions(queryString);
  const subscriptions = res?.data || [];
  console.log({ subscriptions });


  const totalPages = Math.ceil(res?.meta?.total / res?.meta?.limit) || 1;
  const currentpage = res?.meta?.page || 1;

  console.log({ totalpage: Math.ceil(res?.meta?.total / res?.meta?.limit) });
  console.log({ currentpage: res.meta?.page });

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Subscriptions</h1>
        <p className="text-muted-foreground">
          All active and expired subscriptions
        </p>
      </div>
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <SelectFilter
            paramName="status"
            placheholder="Subscription Status"
            defaultValue="Subscriptions"
            options={[
              { label: SubscriptionPlan.FREE, value: "false" },
              { label: SubscriptionPlan.PREMIUM, value: "false" },
              { label: SubscriptionPlan.STANDARD, value: "false" },
            ]}
          />
          <DateRangeFilter />
          <ClearFiltersButton />
        </div>
      </div>
      {/* Desktop table */}
      <div className="hidden lg:block">
        <SubscriptionTable subscriptions={subscriptions} />
      </div>

      {/* Mobile cards */}
      <div className="lg:hidden">
        <SubscriptionGrid subscriptions={subscriptions} />
      </div>
      <Pagination currentPages={currentpage} totalPages={totalPages} />
    </div>
  );
}
