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
  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    departureLocation: "",
    startDate: "",
    endDate: "",
    description: "",
    budget: "",
    image: "",
    journeyType: [] as string[],
    duration: "",
    Languages: [] as string[],
  });

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

  // Handle edit trip
  const handleEditClick = (trip: Trip) => {
    setEditingTrip(trip);
    setFormData({
      title: trip.title,
      destination: trip.destination,
      departureLocation: trip.departureLocation,
      startDate: trip.startDate.split("T")[0],
      endDate: trip.endDate.split("T")[0],
      description: trip.description,
      budget: trip.budget,
      image: trip.image || "",
      journeyType: trip.journeyType,
      duration: trip.duration,
      Languages: trip.Languages,
    });
    setIsEditDialogOpen(true);
  };

  // Handle update trip
  const handleUpdateTrip = async () => {
    if (!editingTrip) return;

    setLoading(true);
    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch(`/api/trips/${editingTrip.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        await fetchTrips();
        setIsEditDialogOpen(false);
        setEditingTrip(null);
      }
    } catch (error) {
      console.error("Error updating trip:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete trip
  const handleDeleteClick = (tripId: string) => {
    setDeletingTripId(tripId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteTrip = async () => {
    if (!deletingTripId) return;

    setLoading(true);
    try {
      // TODO: Replace with your actual API endpoint
      const response = await fetch(`/api/trips/${deletingTripId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTrips(trips.filter((trip) => trip.id !== deletingTripId));
        setIsDeleteDialogOpen(false);
        setDeletingTripId(null);
      }
    } catch (error) {
      console.error("Error deleting trip:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJourneyTypeChange = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      journeyType: prev.journeyType.includes(type)
        ? prev.journeyType.filter((t) => t !== type)
        : [...prev.journeyType, type],
    }));
  };

  const handleLanguageChange = (lang: string) => {
    setFormData((prev) => ({
      ...prev,
      Languages: prev.Languages.includes(lang)
        ? prev.Languages.filter((l) => l !== lang)
        : [...prev.Languages, lang],
    }));
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
        <Card>
          <CardContent className="py-12 text-center">
            <MapPin className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-xl text-muted-foreground mb-2">
              No unmatched trips found
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              Create a new trip to start finding travel companions
            </p>
            <Button asChild>
              <a href="/explorer/create-trip">Create Trip</a>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <Card
              key={trip.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              {trip.image && (
                <div className="relative aspect-video w-full overflow-hidden bg-muted">
                  <Image
                    src={trip.image || "/placeholder.svg"}
                    alt={trip.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-xl text-balance">
                    {trip.title}
                  </CardTitle>
                  <Badge variant="secondary" className="shrink-0">
                    {trip.status}
                  </Badge>
                </div>
                <CardDescription className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  {trip.departureLocation} → {trip.destination}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {trip.description}
                </p>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      {new Date(trip.startDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      {trip.duration}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">
                      ${trip.budget}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {trip.journeyType.map((type) => (
                      <Badge key={type} variant="outline" className="text-xs">
                        {type}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {trip.Languages.map((lang) => (
                      <Badge key={lang} variant="secondary" className="text-xs">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 gap-2 bg-transparent"
                    onClick={() => handleEditClick(trip)}
                  >
                    <Pencil className="h-4 w-4" />
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="flex-1 gap-2"
                    onClick={() => handleDeleteClick(trip.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
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
