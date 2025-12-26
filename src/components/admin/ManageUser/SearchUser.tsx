/** biome-ignore-all assist/source/organizeImports: > */

import { CreateAdminModal } from "@/components/admin/CreateAdminModal";
import SelectFilter from "@/components/shared/SelectFilter";
import ClearFiltersButton from "@/components/shared/ClearFilter";
import DateRangeFilter from "@/components/shared/DateRangeFilter";
import { Role, UserStatus } from "@/types/enum.interface";

const SearchUser = () => {
  return (
    <div className="mb-6 flex justify-between gap-4">
      <div>
        <div className="flex-1 relative w-full">
          <div className="flex items-center gap-3">
            <SelectFilter
              paramName="role"
              placheholder="Role"
              defaultValue="All"
              options={[
                { label: Role.ADMIN, value: "false" },
                { label: Role.EXPLORER, value: "true" },
              ]}
            />
            <SelectFilter
              paramName="status"
              placheholder="User Status"
              defaultValue="All Users"
              options={[
                { label: UserStatus.ACTIVE, value: "false" },
                { label: UserStatus.BLOCKED, value: "true" },
                { label: UserStatus.SUSPENDED, value: "true" },
              ]}
            />
            <DateRangeFilter />
            <ClearFiltersButton />
          </div>
        </div>
      </div>
      <CreateAdminModal />
    </div>
  );
};

export default SearchUser;
