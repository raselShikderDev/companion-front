import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trash2, Edit, Eye } from "lucide-react"
import { ITrip } from "@/types/trip.interface"
import { ReviewStatus, TripStatus } from "@/types/enum.interface"
import { formatDateOnly, formatDateTime } from "@/lib/allFormattors"
import TripRowActions from "../ManageTrips/TripRowActions"
import { IReview } from "@/types/review.interface"
import ReviewRowActions from "./ReviewRowActions"



const ReviewsTable = ({ reviews }: { reviews: any }) => {
    console.log({reviews});
    
    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="text-left py-4 px-4 font-semibold text-foreground">Reviewer</th>
                        <th className="text-left py-4 px-4 font-semibold text-foreground">Comments</th>
                        <th className="text-left py-4 px-4 font-semibold text-foreground">Status</th>
                        <th className="text-left py-4 px-4 font-semibold text-foreground">Date</th>
                        <th className="text-right py-4 px-4 font-semibold text-foreground">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews?.map((reveiw: IReview) => (
                        <tr key={reveiw.id} className="border-b hover:bg-muted/30 transition-colors">
                            <td className="py-4 px-4 font-medium">{reveiw.reviewer?.fullName}</td>
                            <td className="py-4 px-4 text-muted-foreground">{reveiw.comment}</td>
                            <td className="py-4 px-4"><Badge
                                className={`${reveiw.status === ReviewStatus.APPROVED
                                    ? "bg-accent/20 text-accent"
                                    : reveiw.status === ReviewStatus.REJECTED
                                        ? "bg-red-300 text-destructive"
                                        : "bg-green-200 text-green-700"
                                    }`}
                            >
                                {reveiw.status}
                            </Badge></td>
                            <td className="py-4 px-4">{formatDateOnly(formatDateTime(reveiw.createdAt as Date))}</td>
                            <td className="py-4 px-4 text-right">
                                <ReviewRowActions reveiw={reveiw} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReviewsTable
