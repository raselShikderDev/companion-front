/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all assist/source/organizeImports: > */
"use client";

import { useActionState, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldGroup } from "@/components/ui/field";
import InputFeildError from "@/lib/inputFeildError";
import { toast } from "react-toastify";
import Image from "next/image";
import { uploadToImageBB } from "@/lib/uploadImage";
import { updateTrip } from "@/services/trips/updateTrip.service";

export default function UpdateTripForm({ trip }: { trip: any }) {
  const [state, formAction, isPending] = useActionState(updateTrip, null);

  const journeyOptions = ["Bus", "Train", "Flight", "Ship"];
  const languageOptions = ["Bangla", "English", "Hindi"];

  const [journeyType, setJourneyType] = useState<string[]>(trip.journeyType || []);
  const [languages, setLanguages] = useState<string[]>(trip.languages || []);
  const [previewImage, setPreviewImage] = useState<string | null>(trip.image || null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(trip.image || null);

  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Restore previous selections on validation error
  useEffect(() => {
    if (state?.wrongData) {
      setJourneyType(state.wrongData.journeyType || []);
      setLanguages(state.wrongData.languages || []);
      setPreviewImage(state.wrongData.image || null);
      setUploadedUrl(state.wrongData.image || null);
    }
  }, [state]);

  // Toast notifications
  useEffect(() => {
    if (!state) return;

    if (state.success && state.message) toast.success(state.message);
    if (!state.success && state.message) toast.error(state.message);
  }, [state]);

  const toggleJourney = (item: string) =>
    setJourneyType((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );

  const toggleLanguage = (item: string) =>
    setLanguages((prev) =>
      prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]
    );

  // Handle new image selection
  const handleFileChange = (e: any) => {
    const f = e.target.files?.[0];
    if (!f) return;

    setFile(f);
    setPreviewImage(URL.createObjectURL(f));
    setUploadedUrl(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToImageBB(file);
      setUploadedUrl(url);
      toast.success("Image uploaded successfully!");
    } catch (err: any) {
      toast.error(err?.message || "Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setUploadedUrl(null);
    setFile(null);
  };

  const disableSubmit = isPending || uploading || !uploadedUrl;

  return (
    <div className="bg-card border border-border p-8 rounded-xl shadow-sm max-w-3xl mx-auto">
      <form action={formAction} className="space-y-6">
        <input type="hidden" name="tripId" value={trip.id} />

        <FieldGroup className="space-y-5">
          {/* Title */}
          <Field>
            <FieldLabel>Trip Title</FieldLabel>
            <Input name="title" defaultValue={trip.title} />
            <InputFeildError feild="title" state={state} />
          </Field>

          {/* Destination */}
          <Field>
            <FieldLabel>Destination</FieldLabel>
            <Input name="destination" defaultValue={trip.destination} />
            <InputFeildError feild="destination" state={state} />
          </Field>

          {/* Departure */}
          <Field>
            <FieldLabel>Departure Location</FieldLabel>
            <Input name="departureLocation" defaultValue={trip.departureLocation} />
            <InputFeildError feild="departureLocation" state={state} />
          </Field>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Start Date</FieldLabel>
              <Input type="date" name="startDate" defaultValue={trip.startDate} />
              <InputFeildError feild="startDate" state={state} />
            </Field>

            <Field>
              <FieldLabel>End Date</FieldLabel>
              <Input type="date" name="endDate" defaultValue={trip.endDate} />
              <InputFeildError feild="endDate" state={state} />
            </Field>
          </div>

          {/* Description */}
          <Field>
            <FieldLabel>Description</FieldLabel>
            <textarea
              name="description"
              className="w-full p-3 rounded-md border bg-background"
              rows={4}
              defaultValue={trip.description}
            ></textarea>
            <InputFeildError feild="description" state={state} />
          </Field>

          {/* Budget */}
          <Field>
            <FieldLabel>Budget</FieldLabel>
            <Input name="budget" defaultValue={trip.budget} />
            <InputFeildError feild="budget" state={state} />
          </Field>

          {/* Required Person */}
          <Field>
            <FieldLabel>Required Person</FieldLabel>
            <Input name="requiredPerson" defaultValue={trip.requiredPerson} />
            <InputFeildError feild="requiredPerson" state={state} />
          </Field>

          {/* Duration */}
          <Field>
            <FieldLabel>Duration</FieldLabel>
            <Input name="duration" defaultValue={trip.duration} />
            <InputFeildError feild="duration" state={state} />
          </Field>

          {/* Journey Type */}
          <Field>
            <FieldLabel>Journey Type</FieldLabel>
            <div className="flex flex-wrap gap-3">
              {journeyOptions.map((jt) => (
                <button
                  key={jt}
                  type="button"
                  onClick={() => toggleJourney(jt)}
                  className={`px-3 py-1 rounded-lg border ${
                    journeyType.includes(jt)
                      ? "bg-accent text-accent-foreground"
                      : "bg-background text-foreground"
                  }`}
                >
                  {jt}
                </button>
              ))}
            </div>

            {journeyType.map((jt) => (
              <input key={jt} type="hidden" name="journeyType" value={jt} />
            ))}

            <InputFeildError feild="journeyType" state={state} />
          </Field>

          {/* Languages */}
          <Field>
            <FieldLabel>Languages</FieldLabel>
            <div className="flex flex-wrap gap-3">
              {languageOptions.map((lng) => (
                <button
                  key={lng}
                  type="button"
                  onClick={() => toggleLanguage(lng)}
                  className={`px-3 py-1 rounded-lg border ${
                    languages.includes(lng)
                      ? "bg-accent text-accent-foreground"
                      : "bg-background text-foreground"
                  }`}
                >
                  {lng}
                </button>
              ))}
            </div>

            {languages.map((l) => (
              <input key={l} type="hidden" name="languages" value={l} />
            ))}

            <InputFeildError feild="languages" state={state} />
          </Field>

          {/* Image Upload */}
          <Field>
            <FieldLabel>Trip Image</FieldLabel>

            {!previewImage && (
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            )}

            {previewImage && (
              <div className="mt-3 space-y-2">
                <div className="relative w-[400px] h-[250px] rounded overflow-hidden border">
                  <Image
                    src={previewImage}
                    alt="preview"
                    fill
                    className="object-cover"
                  />

                  {uploading && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full"></div>
                    </div>
                  )}
                </div>

                {!uploadedUrl && !uploading && (
                  <Button type="button" onClick={handleUpload}>
                    Upload Image
                  </Button>
                )}

                <Button type="button" variant="destructive" onClick={removeImage}>
                  Remove Image
                </Button>
              </div>
            )}

            {uploadedUrl && (
              <input type="hidden" name="image" value={uploadedUrl} />
            )}

            <InputFeildError feild="image" state={state} />
          </Field>

          {/* SUBMIT */}
          <Button type="submit" disabled={disableSubmit} className="w-full">
            {isPending ? "Updating Trip..." : "Update Trip"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
