/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: > */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, MapPin, Share2, TrendingUp } from "lucide-react"
import { Suspense, useEffect, useState } from "react";
import { getAdminAnalysis } from "@/services/analysis/getAdminAnalysis.service";
import { usePathname } from "next/navigation";
import AdminStatsCards from "@/components/admin/AdminStatsCards";
import AdminStatsSkeleton from "@/components/admin/AdminStatsSkeleton";

// export default function AdminDashboard() {
//   const pathname = usePathname();
//   const [data, setData] = useState<any | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const res = await getAdminAnalysis();
//         if (res?.success) {
//           setData(res?.data);
//         } else {
//           setData(null);
//         }

//       } catch (error) {
//         console.error("Failed to fetch admin analyis data:", error);
//       }
//     };

//     fetchUser();
//   }, [pathname]);


//   console.log({ "data": data });


//   return (
//     <div >
//       <Suspense fallback={<AdminStatsSkeleton />}>
//         <AdminStatsCards stats={data} />
//       </Suspense>
//     </div>
//   )
// }
export default function AdminDashboard() {
  const pathname = usePathname();
  const [data, setData] = useState<any | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getAdminAnalysis();
        console.log({ res });

        if (res?.success) {
          setData(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch admin analysis:", error);
      }
    };

    fetchUser();
  }, [pathname]);

  console.log({ data });

  if (!data) {
    return <AdminStatsSkeleton />;
  }
  console.log(data);

  return (
    <div>
      <AdminStatsCards stats={data} />
    </div>
  );
}
