"use client";

import { useRouter, useSearchParams } from "next/navigation";

import { ArrowLeft, Loader2 } from "lucide-react";

import Link from "next/link";

import DashboardShell from "@/components/layout/dashboard-shell";

import PosterForm from "@/components/poster/poster-form";

import Card from "@/components/ui/card";

import { useAuth } from "@/hooks/use-auth";

import { useTemplates } from "@/hooks/use-templates";

import { useCreatePoster } from "@/hooks/use-posters";

import { uploadImages } from "@/services/upload.service";

import type { CreatePosterPayload } from "@/types/poster";

export default function CreatePosterPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const templateId = searchParams.get("template");

  const { data: user } = useAuth();

  const {
    data: templates = [],
    isLoading: templatesLoading,
  } = useTemplates();

  const createPosterMutation = useCreatePoster();

  const selectedTemplate = templates.find(
    (template) => template._id === templateId
  );

  const handleSubmit = async (
    payload: CreatePosterPayload,
    files: File[]
  ) => {
    try {
      let photoUrls: string[] = [];

      // Upload images first
      if (files.length > 0) {
        photoUrls = await uploadImages(files);
      }

      // Create poster
      const poster =
        await createPosterMutation.mutateAsync({
          ...payload,
          photoUrls,
        });

      // Go to generated poster preview
      router.push(
        `/dashboard/posters/${poster._id}`
      );
    } catch (error) {
      console.error(
        "Poster generation failed:",
        error
      );
    }
  };

  // Loading templates
  if (templatesLoading) {
    return (
      <DashboardShell userName={user?.name}>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-7 w-7 animate-spin text-emerald-400" />
        </div>
      </DashboardShell>
    );
  }

  // Template not selected
  if (!templateId || !selectedTemplate) {
    return (
      <DashboardShell userName={user?.name}>
        <Card className="mx-auto max-w-xl p-10 text-center">
          <h1 className="text-xl font-bold">
            Select a template first
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Choose a template before creating your
            poster.
          </p>

          <Link
            href="/dashboard/templates"
            className="mt-6 inline-block"
          >
            <span className="btn btn-primary">
              Choose Template
            </span>
          </Link>
        </Card>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell userName={user?.name}>
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/templates"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />

            Back to templates
          </Link>

          <h1 className="page-title">
            Create Poster
          </h1>

          <p className="page-description">
            Using template:{" "}
            <span className="font-semibold text-slate-300">
              {selectedTemplate.title}
            </span>
          </p>
        </div>

        {/* Poster Form */}
        <PosterForm
          template={selectedTemplate}
          onSubmit={handleSubmit}
          loading={createPosterMutation.isPending}
        />

        {/* Error */}
        {createPosterMutation.isError && (
          <div className="alert alert-error mt-4">
            {createPosterMutation.error instanceof
            Error
              ? createPosterMutation.error.message
              : "Failed to generate poster. Please try again."}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}