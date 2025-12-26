
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { queryStringFormatter } from "@/lib/allFormattors";
import { getAllUsers } from "@/services/admin/users/getAllUsers.service"
import UserTable from "@/components/admin/ManageUser/UserTable"
import SearchUser from "@/services/admin/users/SearchUser"

export default async function ManageExplorers({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const searchParamsObj = await searchParams;
    const queryString = queryStringFormatter(searchParamsObj);
    const res = await getAllUsers(queryString);

    const users = res.success ? res.data : [];
    



  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Manage Explorers</h1>
        <p className="text-muted-foreground">View and manage all registered travelers</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Explorers</CardTitle>
        </CardHeader>
        <CardContent>
          <SearchUser/>

        <UserTable users={users} />
        </CardContent>
      </Card>
    </div>
  )
}
