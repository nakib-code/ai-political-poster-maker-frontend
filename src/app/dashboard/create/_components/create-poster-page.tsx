"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  LayoutTemplate,
} from "lucide-react";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import PosterForm from "@/components/poster/poster-form";

import { useTemplates } from "@/hooks/use-templates";
import { useCreatePoster } from "@/hooks/use-posters";
import { uploadImages } from "@/services/upload.service";

import type { CreatePosterPayload } from "@/types/poster";

export default function CreatePosterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const templateId = searchParams.get("template");

  const {
    data: templates = [],
    isLoading: templatesLoading,
    isError: templatesError,
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

      if (files.length > 0) {
        photoUrls = await uploadImages(files);
      }

      const poster = await createPosterMutation.mutateAsync({
        ...payload,
        photoUrls,
      });

      router.push(`/dashboard/posters/${poster._id}`);
    } catch (error) {
      console.error("Poster generation failed:", error);
    }
  };

  // Loading
  if (templatesLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="text-center">
          <span className="spinner mx-auto block h-7 w-7" />

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading templates...
          </p>
        </div>
      </div>
    );
  }

  // Template error
  if (templatesError) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md p-7 text-center sm:p-9">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
            <LayoutTemplate className="h-7 w-7 text-red-400" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-white">
            Unable to load templates
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We couldn't load the available templates.
            Please try again.
          </p>

          <Link
            href="/dashboard/templates"
            className="mt-6 inline-flex"
          >
            <Button>
              View Templates
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  // No template selected
  if (!templateId || !selectedTemplate) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md p-7 text-center sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
            <LayoutTemplate className="h-8 w-8 text-emerald-400" />
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-emerald-400">
            Create Poster
          </p>

          <h1 className="mt-2 text-xl font-bold text-white sm:text-2xl">
            Choose a template
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
            Select a template first, then add your information
            and photos to create your poster.
          </p>

          <Link
            href="/dashboard/templates"
            className="mt-7 inline-flex"
          >
            <Button size="lg">
              Browse Templates
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/templates"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to templates
          </Link>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-emerald-400">
                Create Poster
              </p>

              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Create your poster
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Add your information and photos using the
                selected template.
              </p>
            </div>

            {/* Selected Template */}
            <div className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 sm:w-auto sm:min-w-44">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-600">
                Selected Template
              </p>

              <p className="mt-1 truncate text-sm font-semibold text-slate-300">
                {selectedTemplate.title}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <PosterForm
          template={selectedTemplate}
          onSubmit={handleSubmit}
          loading={createPosterMutation.isPending}
        />

        {/* Error */}
        {createPosterMutation.isError && (
          <div className="alert alert-error mt-4">
            {createPosterMutation.error instanceof Error
              ? createPosterMutation.error.message
              : "Failed to generate poster. Please try again."}
          </div>
        )}

        {/* Info */}
        <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] px-4 py-3">
          <p className="text-center text-xs leading-5 text-slate-600">
            Your exact text and uploaded photos will be used in
            the final poster. AI only assists with the visual
            layout.
          </p>
        </div>
      </div>
    </div>
  );
}