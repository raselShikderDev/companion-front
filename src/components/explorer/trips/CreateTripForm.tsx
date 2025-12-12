/** biome-ignore-all lint/suspicious/noExplicitAny: > */
/** biome-ignore-all assist/source/organizeImports: > */
"use client";

import { useActionState, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldLabel,
  FieldGroup,
} from "@/components/ui/field";
import InputFeildError from "@/lib/inputFeildError";
import { toast } from "react-toastify";
import { createTrip } from "@/services/trips/createTrip.service.";
import Image from "next/image";
import { uploadToImageBB } from "@/lib/uploadImage";

export default function CreateTripForm() {
  const [state, formAction, isPending] = useActionState(createTrip, null);

  const journeyOptions = ["Bus", "Train", "Flight", "Ship"];
  const languageOptions = ["Bangla", "English", "Hindi"];

  const [journeyType, setJourneyType] = useState<string[]>([]);
  const [languages, setLanguages] = useState<string[]>([]);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Restore form state after validation fail
  useEffect(() => {
    if (state?.wrongData) {
      setJourneyType(state.wrongData.journeyType || []);
      setLanguages(state.wrongData.languages || []);
      setPreviewImage(state.wrongData.image || null);
      setUploadedUrl(state.wrongData.image || null);
    }
  }, [state]);

  // Toast Feedback
  useEffect(() => {
    if (state?.success && state.message) toast.success(state.message);
    else if (state && !state.success && state.message) toast.error(state.message);
  }, [state]);

  const toggleJourney = (item: string) =>
    setJourneyType((prev) => prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]);

  const toggleLanguage = (item: string) =>
    setLanguages((prev) => prev.includes(item) ? prev.filter((v) => v !== item) : [...prev, item]);

  const handleFileChange = (e: any) => {
    const f = e.target.files[0];
    if (!f) return;

    setFile(f);
    setPreviewImage(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadToImageBB(file);
      setUploadedUrl(url);
      toast.success("Image uploaded successfully!");
    } catch (err:any) {
        console.log(err);
        
      toast.error("Image upload failed");
    }
    setUploading(false);
  };

  const removeImage = () => {
    setPreviewImage(null);
    setUploadedUrl(null);
    setFile(null);
  };

  return (
    <div className="bg-card border border-border p-8 rounded-xl shadow-sm max-w-3xl mx-auto">
      <form action={formAction} className="space-y-6">
        <FieldGroup className="space-y-5">
          {/* Title */}
          <Field>
            <FieldLabel>Trip Title</FieldLabel>
            <Input
              name="title"
              placeholder="Adventure to Cox's Bazar"
              defaultValue={state?.wrongData?.title}
            />
            <InputFeildError feild="title" state={state} />
          </Field>

          {/* Destination */}
          <Field>
            <FieldLabel>Destination</FieldLabel>
            <Input
              name="destination"
              placeholder="Cox's Bazar"
              defaultValue={state?.wrongData?.destination}
            />
            <InputFeildError feild="destination" state={state} />
          </Field>

          {/* Departure Location */}
          <Field>
            <FieldLabel>Departure Location</FieldLabel>
            <Input
              name="departureLocation"
              placeholder="Dhaka"
              defaultValue={state?.wrongData?.departureLocation}
            />
            <InputFeildError feild="departureLocation" state={state} />
          </Field>

          {/* Dates */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field>
              <FieldLabel>Start Date</FieldLabel>
              <Input
                name="startDate"
                type="date"
                defaultValue={state?.wrongData?.startDate}
              />
              <InputFeildError feild="startDate" state={state} />
            </Field>

            <Field>
              <FieldLabel>End Date</FieldLabel>
              <Input
                name="endDate"
                type="date"
                defaultValue={state?.wrongData?.endDate}
              />
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
              defaultValue={state?.wrongData?.description}
            ></textarea>
            <InputFeildError feild="description" state={state} />
          </Field>

          {/* Budget */}
          <Field>
            <FieldLabel>Budget</FieldLabel>
            <Input
              name="budget"
              placeholder="12"
              defaultValue={state?.wrongData?.budget}
            />
            <InputFeildError feild="budget" state={state} />
          </Field>

          {/* Duration */}
          <Field>
            <FieldLabel>Duration</FieldLabel>
            <Input
              name="duration"
              placeholder="5 days"
              defaultValue={state?.wrongData?.duration}
            />
            <InputFeildError feild="duration" state={state} />
          </Field>

          {/* Journey Type */}
          <Field>
            <FieldLabel>Journey Type</FieldLabel>
            <div className="flex flex-wrap gap-3">
              {journeyOptions.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => toggleJourney(type)}
                  className={`px-3 py-1 rounded-lg border ${
                    journeyType.includes(type)
                      ? "bg-accent text-accent-foreground"
                      : "bg-background text-foreground"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {journeyType.map((j) => (
              <input key={j} type="hidden" name="journeyType" value={j} />
            ))}
          </Field>

          {/* Languages */}
          <Field>
            <FieldLabel>Languages</FieldLabel>
            <div className="flex flex-wrap gap-3">
              {languageOptions.map((lang) => (
                <button
                  key={lang}
                  type="button"
                  onClick={() => toggleLanguage(lang)}
                  className={`px-3 py-1 rounded-lg border ${
                    languages.includes(lang)
                      ? "bg-accent text-accent-foreground"
                      : "bg-background text-foreground"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            {languages.map((l) => (
              <input key={l} type="hidden" name="languages" value={l} />
            ))}
          </Field>

          {/* Image Upload + Preview */}
          <Field>
            <FieldLabel>Upload Trip Image</FieldLabel>

            {!previewImage && (
              <Input type="file" accept="image/*" onChange={handleFileChange} />
            )}

            {previewImage && (
              <div className="mt-3 space-y-2">
                <Image
                  src={previewImage}
                  alt="preview"
                  width={300}
                  height={200}
                  className="rounded border object-cover"
                />

                {!uploadedUrl && (
                  <Button type="button" onClick={handleUpload} disabled={uploading}>
                    {uploading ? "Uploading..." : "Upload Image"}
                  </Button>
                )}

                <Button
                  type="button"
                  variant="destructive"
                  onClick={removeImage}
                >
                  Remove Image
                </Button>
              </div>
            )}

            {/* Final URL sent to server */}
            <input type="hidden" name="image" value={uploadedUrl || ""} />

            <InputFeildError feild="image" state={state} />
          </Field>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Creating Trip..." : "Create Trip"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
