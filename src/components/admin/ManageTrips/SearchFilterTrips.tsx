import SearchFilter from "@/components/shared/SearchFilter"
import ClearFiltersButton from "@/components/shared/ClearFilter"
import DateRangeFilter from "@/components/shared/DateRangeFilter"
import SelectFilter from "@/components/shared/SelectFilter"
import { TripStatus } from "@/types/enum.interface"

const SearchFilterTrips = () => {
    return (
        <div className="mb-6">
            <div className="flex items-center gap-3">
                <SearchFilter />
                <SelectFilter
                    paramName="status"
                    placheholder="Trip Status"
                    defaultValue="All Trips"
                    options={[
                        { label: TripStatus.COMPLETED, value: "false" },
                        { label: TripStatus.PLANNED, value: "false" },
                        { label: TripStatus.CANCELLED, value: "false" },
                    ]}
                />
                <DateRangeFilter />
                <ClearFiltersButton />
            </div>
        </div>
    )
}

export default SearchFilterTrips
