"use client"

import { CreateAdminModal } from "@/components/admin/CreateAdminModal"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState } from "react"

const SearchUser = () => {
      const [searchTerm, setSearchTerm] = useState("")

  return (
   <div className="mb-6 flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <CreateAdminModal />
          </div>
  )
}

export default SearchUser
