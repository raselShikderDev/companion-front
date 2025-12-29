import ClearFiltersButton from "@/components/shared/ClearFilter"
import DateRangeFilter from "@/components/shared/DateRangeFilter"
import SearchFilter from "@/components/shared/SearchFilter"
import SelectFilter from "@/components/shared/SelectFilter"
import { ReviewStatus } from "@/types/enum.interface"


const ReviewSearchFilter = () => {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-3">
                <SearchFilter />
                <SelectFilter
                    paramName="status"
                    placheholder="Review Status"
                    defaultValue="All"
                    options={[
                        { label: ReviewStatus.APPROVED, value: "false" },
                        { label: ReviewStatus.PENDING, value: "false" },
                        { label: ReviewStatus.REJECTED, value: "false" },
                    ]}
                />
                <DateRangeFilter />
                <ClearFiltersButton />
            </div>
        </div>
    )
}

export default ReviewSearchFilter
