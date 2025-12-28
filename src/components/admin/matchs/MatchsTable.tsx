/** biome-ignore-all assist/source/organizeImports: > */
/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all lint/style/useImportType: > */
import { Badge } from "@/components/ui/badge";
import { IMatch } from "@/types/match.interface";
import { formatDateOnly, formatDateTime } from "@/lib/allFormattors";
import AdminMatchRowActions from "./AdminMatchRowActions";

const MatchsTable = ({ matches }: { matches: any }) => {
  const statusStyles: Record<string, string> = {
    ACCEPTED: "bg-emerald-500 hover:bg-emerald-600 text-white border-none",
    COMPLETED: "bg-blue-600 hover:bg-blue-700 text-white border-none",
    REJECTED: "bg-red-500 hover:bg-red-600 text-white border-none",
    PENDING: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",
    DEFAULT: "bg-slate-100 text-slate-600",
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-4 px-4 font-semibold text-foreground">
              Title
            </th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">
              Creator
            </th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">
              recipient
            </th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">
              Status
            </th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">
              Start Date
            </th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">
              CreatedAt
            </th>
            <th className="text-left py-4 px-4 font-semibold text-foreground">
              Actions
            </th>
            {/* <th className="text-right py-4 px-4 font-semibold text-foreground">
              
            </th> */}
          </tr>
        </thead>
        <tbody>
          {matches.map((match: IMatch) => (
            <tr
              key={match.id}
              className="border-b hover:bg-muted/30 transition-colors"
            >
              <td className="py-4 px-4 text-muted-foreground">
                {match.trip?.title}
              </td>
              <td className="py-4 px-4">{match.requester?.fullName}</td>
              <td className="py-4 px-4">{match.recipient?.fullName}</td>
              {/* <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-border rounded-full">
                          <div className="h-full bg-accent rounded-full" style={{ width: match.matchScore }}></div>
                        </div>
                        <span className="text-sm font-medium text-accent">{match.matchScore}</span>
                      </div>
                    </td> */}
              <td className="py-4 px-4">
                <Badge
                  variant="outline"
                  className={`px-2.5 py-0.5 text-xs font-semibold transition-colors shadow-sm ${
                    statusStyles[match.status] || statusStyles.DEFAULT
                  }`}
                >
                  {match.status}
                </Badge>
              </td>
              <td className="py-4 px-4 text-muted-foreground">
                {formatDateOnly(formatDateTime(match.trip?.startDate as Date))}
              </td>
               <td className="py-4 px-4 text-muted-foreground">
                {formatDateOnly(formatDateTime(match.createdAt as Date))}
               </td>
              <td className="py-4 px-4 text-right">
               <AdminMatchRowActions match={match}/>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MatchsTable;
