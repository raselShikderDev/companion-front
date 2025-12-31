/** biome-ignore-all assist/source/organizeImports: > */

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { queryStringFormatter } from "@/lib/allFormattors";
import { getAllUsers } from "@/services/admin/users/getAllUsers.service";
import UserTable from "@/components/admin/ManageUser/UserTable";
import Pagination from "@/components/shared/Paggination";
import SearchUser from "@/components/admin/ManageUser/SearchUser";

export default async function ManageExplorers({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);
  const res = await getAllUsers(queryString);
  console.log({ res });

  const users = res.success ? res.data : [];
  console.log({ users });

  const totalPages = Math.ceil(res?.meta?.total / res?.meta?.limit) || 1;
  const currentpage = res?.meta?.page || 1;

  console.log({ totalpage: Math.ceil(res?.meta?.total / res?.meta?.limit) });
  console.log({ currentpage: res.meta?.page });

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Manage Users</h1>
        <p className="text-muted-foreground">
          View and manage all registered travelers
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchUser />

          <div className="space-y-3.5">
            <UserTable users={users} />
            <Pagination currentPages={currentpage} totalPages={totalPages} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
