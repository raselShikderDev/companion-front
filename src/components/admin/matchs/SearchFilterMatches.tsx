/** biome-ignore-all assist/source/organizeImports: > */

import { CreateAdminModal } from "@/components/admin/CreateAdminModal";
import SelectFilter from "@/components/shared/SelectFilter";
import ClearFiltersButton from "@/components/shared/ClearFilter";
import DateRangeFilter from "@/components/shared/DateRangeFilter";
import { MatchStatus } from "@/types/enum.interface";

const SearchFilterMatches = () => {
  return (
    <div className="mb-6 flex justify-between gap-4">
      <div>
        <div className="flex-1 relative w-full">
          <div className="flex items-center gap-3">
            <SelectFilter
              paramName="status"
              placheholder="status"
              defaultValue="All"
              options={[
                { label: MatchStatus.ACCEPTED, value: "false" },
                { label: MatchStatus.BLOCKED, value: "false" },
                { label: MatchStatus.COMPLETED, value: "false" },
                { label: MatchStatus.PENDING, value: "false" },
                { label: MatchStatus.REJECTED, value: "false" },
              ]}
            />
            <DateRangeFilter />
            <ClearFiltersButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilterMatches;
