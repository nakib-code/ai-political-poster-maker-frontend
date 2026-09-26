"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";

import Input from "@/components/ui/input";
import Textarea from "@/components/ui/textarea";
import Button from "@/components/ui/button";
import Card from "@/components/ui/card";

import ImageUploader from "./image-uploader";

import type { Template } from "@/types/template";
import type { CreatePosterPayload } from "@/types/poster";

interface PosterFormProps {
  template: Template;
  onSubmit: (
    payload: CreatePosterPayload,
    files: File[]
  ) => Promise<void>;
  loading?: boolean;
}

export default function PosterForm({
  template,
  onSubmit,
  loading = false,
}: PosterFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    organization: "",
    union: "",
    thana: "",
    district: "",
    occasion: "",
    headline: "",
  });

  const [files, setFiles] = useState<File[]>([]);
  const [error, setError] = useState("");

  const updateField = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setError("");

    const maxPhotos = Math.min(
      3,
      template.layoutConfig.photoSlots
    );

    if (files.length > maxPhotos) {
      setError(
        `This template supports a maximum of ${maxPhotos} photo${
          maxPhotos === 1 ? "" : "s"
        }.`
      );
      return;
    }

    try {
      await onSubmit(
        {
          templateId: template._id,
          name: formData.name,
          designation: formData.designation || undefined,
          organization: formData.organization || undefined,
          union: formData.union || undefined,
          thana: formData.thana || undefined,
          district: formData.district || undefined,
          occasion: formData.occasion,
          headline: formData.headline,
        },
        files
      );
    } catch (err: any) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Failed to create poster."
      );
    }
  };

  const maxPhotos = Math.min(
    3,
    template.layoutConfig.photoSlots
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <Card className="p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add the information that should appear on the poster.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            id="name"
            label="Name"
            placeholder="Enter name"
            value={formData.name}
            onChange={(event) =>
              updateField("name", event.target.value)
            }
            required
          />

          <Input
            id="designation"
            label="Designation"
            placeholder="e.g. Chairman"
            value={formData.designation}
            onChange={(event) =>
              updateField("designation", event.target.value)
            }
          />

          <Input
            id="organization"
            label="Party / Organization"
            placeholder="Enter organization"
            value={formData.organization}
            onChange={(event) =>
              updateField("organization", event.target.value)
            }
          />

          <Input
            id="occasion"
            label="Occasion"
            placeholder="e.g. Victory Day"
            value={formData.occasion}
            onChange={(event) =>
              updateField("occasion", event.target.value)
            }
            required
          />
        </div>
      </Card>

      {/* Location */}
      <Card className="p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">
            Location
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Add location information if it is needed on the poster.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Input
            id="union"
            label="Union"
            placeholder="Union name"
            value={formData.union}
            onChange={(event) =>
              updateField("union", event.target.value)
            }
          />

          <Input
            id="thana"
            label="Thana"
            placeholder="Thana name"
            value={formData.thana}
            onChange={(event) =>
              updateField("thana", event.target.value)
            }
          />

          <Input
            id="district"
            label="District"
            placeholder="District name"
            value={formData.district}
            onChange={(event) =>
              updateField("district", event.target.value)
            }
          />
        </div>
      </Card>

      {/* Poster Content */}
      <Card className="p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">
            Poster Content
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Enter the exact headline you want to appear.
          </p>
        </div>

        <Textarea
          id="headline"
          label="Headline"
          placeholder="Enter your poster headline"
          value={formData.headline}
          onChange={(event) =>
            updateField("headline", event.target.value)
          }
          required
          maxLength={200}
        />
      </Card>

      {/* Photos */}
      <Card className="p-5 sm:p-6">
        <div className="mb-5">
          <h2 className="text-lg font-bold text-white">
            Poster Photos
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Upload up to {maxPhotos} photo
            {maxPhotos === 1 ? "" : "s"} for this template.
          </p>
        </div>

        <ImageUploader
          maxImages={maxPhotos}
          onChange={setFiles}
        />
      </Card>

      {/* Error */}
      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          loading={loading}
          disabled={loading}
          className="w-full sm:w-auto"
        >
          {!loading && <Sparkles className="h-5 w-5" />}

          {loading ? "Generating poster..." : "Generate Poster"}
        </Button>
      </div>
    </form>
  );
}