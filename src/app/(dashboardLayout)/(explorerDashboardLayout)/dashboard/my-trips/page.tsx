/** biome-ignore-all assist/source/organizeImports: > */
"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Calendar,
  MapPin,
  Wallet,
  Clock,
  Pencil,
  Trash2,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { getMyTrips } from "@/services/trips/getMyTrips.service";
import EmptyTripCard from "@/components/shared/EmptyTripCard";
import { ExplorerTripsGrid } from "@/components/explorer/trips/ExplorerTripsGrid";

interface Trip {
  id: string;
  title: string;
  image: string | null;
  destination: string;
  departureLocation: string;
  startDate: string;
  endDate: string;
  description: string;
  budget: string;
  journeyType: string[];
  matchCompleted: boolean;
  duration: string;
  Languages: string[];
  status: string;
}

export default function MyTripsPage() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [deletingTripId, setDeletingTripId] = useState<string | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Fetch unmatched trips (matchCompleted: false)
  const fetchTrips = () => {
    setLoading(true);
    try {
      // TODO: Replace with your actual API endpoint
      getMyTrips({ page: 1, limit: 10 }).then((res) => {
        if (res.success) setTrips(res.data);
      });
    } catch (error) {
      console.error("Error fetching trips:", error);
    } finally {
      setLoading(false);
    }
  };
  getMyTrips({ page: 1, limit: 10 }).then((res) => {
    if (res.success) setTrips(res.data);
  });
  // Handle edit trip
  const handleEditClick = (trip: Trip) => {
    setEditingTrip(trip);
    setIsEditDialogOpen(true);
  };

  // Handle update trip
  const handleUpdateTrip = async () => {
    if (!editingTrip) return;
  };

  // Handle delete trip
  const handleDeleteClick = (tripId: string) => {
    // setDeletingTripId(tripId);
    console.log("handle deleteing", tripId);

    setIsDeleteDialogOpen(true);
  };

  const handleDeleteTrip = async () => {
    if (!deletingTripId) return;
    console.log("deleteing", deletingTripId);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 text-foreground">My Trips</h1>
        <p className="text-muted-foreground">
          Manage your unmatched trips - edit details or remove them
        </p>
      </div>

      <div className="mb-6">
        <Button onClick={fetchTrips} disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            "Load My Trips"
          )}
        </Button>
      </div>

      {trips.length === 0 && !loading ? (
        <EmptyTripCard />
      ) : (
        <ExplorerTripsGrid
          trips={trips}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Trip</DialogTitle>
            <DialogDescription>
              Update your trip details below
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Trip Title</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-departure">Departure Location</Label>
                <Input
                  id="edit-departure"
                  value={formData.departureLocation}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      departureLocation: e.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-destination">Destination</Label>
                <Input
                  id="edit-destination"
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-start">Start Date</Label>
                <Input
                  id="edit-start"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-end">End Date</Label>
                <Input
                  id="edit-end"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-duration">Duration</Label>
                <Input
                  id="edit-duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  placeholder="e.g., 5 days"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-budget">Budget ($)</Label>
                <Input
                  id="edit-budget"
                  type="number"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData({ ...formData, budget: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                placeholder="https://your-image-url.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Journey Type</Label>
              <div className="flex flex-wrap gap-2">
                {["Bus", "Train", "Flight", "Car"].map((type) => (
                  <Badge
                    key={type}
                    variant={
                      formData.journeyType.includes(type)
                        ? "default"
                        : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => handleJourneyTypeChange(type)}
                  >
                    {type}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Languages</Label>
              <div className="flex flex-wrap gap-2">
                {["Bangla", "English", "Hindi", "Urdu"].map((lang) => (
                  <Badge
                    key={lang}
                    variant={
                      formData.Languages.includes(lang) ? "default" : "outline"
                    }
                    className="cursor-pointer"
                    onClick={() => handleLanguageChange(lang)}
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleUpdateTrip} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              trip.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTrip}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
