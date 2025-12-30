"use client";

import { UserCard } from "./UserCard";
import { UserProfileModal } from "./UserProfileModal";

interface ExplorerProfile {
  id: string;
  fullName: string;
  profilePicture?: string | null;
  bio?: string | null;
  phone: string;
  address?: string | null;
  gender?: string;
  age?: string | null;
  travelStyleTags?: string[];
  interests?: string[];
  isPremium?: boolean;
}

interface Props {
  title: string;
  explorer: ExplorerProfile;
}

export function UserCardWithProfileModal({ title, explorer }: Props) {
  return (
    <UserProfileModal explorer={explorer}>
      <div className="cursor-pointer">
        <UserCard
          title={title}
          name={explorer.fullName}
          avatar={explorer.profilePicture}
          className="hover:shadow-md hover:border-primary/40"
        />
      </div>
    </UserProfileModal>
  );
}
