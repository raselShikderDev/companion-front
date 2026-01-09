// app/(dashboardLayout)/admin/payments/page.tsx
import { serverFetch } from "@/lib/serverFetch";
import PaymentTable from "@/components/admin/payments/PaymentTable";
import PaymentGrid from "@/components/admin/payments/PaymentGrid";
import { getAllPayments } from "@/services/admin/payments/payment.service";
import { queryStringFormatter } from "@/lib/allFormattors";
import Pagination from "@/components/shared/Paggination";
import SelectFilter from "@/components/shared/SelectFilter";
import DateRangeFilter from "@/components/shared/DateRangeFilter";
import ClearFiltersButton from "@/components/shared/ClearFilter";
import { PaymentStatus } from "@/types/enum.interface";

export default async function AdminPaymentsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getAllPayments(queryString)
  const payments = res?.data || [];
console.log({payments});

  const totalPages = Math.ceil(res?.meta?.total / res?.meta?.limit) || 1;
  const currentpage = res?.meta?.page || 1;

  console.log({ totalpage: Math.ceil(res?.meta?.total / res?.meta?.limit) });
  console.log({ currentpage: res.meta?.page });
  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Payments</h1>
        <p className="text-muted-foreground">
          All subscription payments and transactions
        </p>
      </div>
<div className="mb-6">
        <div className="flex items-center gap-3">
          <SelectFilter
            paramName="status"
            placheholder="Payment Status"
            defaultValue="Payments"
            options={[
              { label: PaymentStatus.FAILED, value: "false" },
              { label: PaymentStatus.PAID, value: "false" },
              { label: PaymentStatus.PENDING, value: "false" },
              { label: PaymentStatus.UNPAID, value: "false" },
              
            ]}
          />
          <DateRangeFilter />
          <ClearFiltersButton />
        </div>
      </div>
      <div className="hidden lg:block">
        <PaymentTable payments={payments} />
      </div>

      <div className="lg:hidden">
        <PaymentGrid payments={payments} />
      </div>
       <Pagination currentPages={currentpage} totalPages={totalPages} />
    </div>
  );
}
