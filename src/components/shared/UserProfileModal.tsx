"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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

interface UserProfileModalProps {
  explorer: ExplorerProfile;
  children: React.ReactNode;
}

export function UserProfileModal({
  explorer,
  children,
}: UserProfileModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Explorer Profile</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col items-center gap-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={explorer.profilePicture ?? undefined} />
            <AvatarFallback>
              {explorer.fullName.charAt(0)}
            </AvatarFallback>
          </Avatar>

          <div className="text-center">
            <h3 className="text-xl font-semibold">{explorer.fullName}</h3>
            {explorer.isPremium && (
              <Badge className="mt-1">Premium</Badge>
            )}
          </div>

          {explorer.bio && (
            <p className="text-sm text-muted-foreground text-center">
              {explorer.bio}
            </p>
          )}

          <div className="w-full grid grid-cols-2 gap-4 text-sm mt-4">
            {explorer.gender && (
              <div>
                <p className="text-muted-foreground">Gender</p>
                <p>{explorer.gender}</p>
              </div>
            )}

            {explorer.age && (
              <div>
                <p className="text-muted-foreground">Age</p>
                <p>{explorer.age}</p>
              </div>
            )}

            <div>
              <p className="text-muted-foreground">Phone</p>
              <p>{explorer.phone}</p>
            </div>

            {explorer.address && (
              <div>
                <p className="text-muted-foreground">Address</p>
                <p>{explorer.address}</p>
              </div>
            )}
          </div>

          {explorer.travelStyleTags?.length ? (
            <div className="w-full mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Travel Styles
              </p>
              <div className="flex flex-wrap gap-2">
                {explorer.travelStyleTags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}

          {explorer.interests?.length ? (
            <div className="w-full mt-4">
              <p className="text-sm text-muted-foreground mb-2">
                Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {explorer.interests.map((interest) => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
