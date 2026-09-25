"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Download,
  RefreshCw,
} from "lucide-react";

import DashboardShell from "@/components/layout/dashboard-shell";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import GenerationLoader from "@/components/poster/generation-loader";

import {
  usePoster,
  useRegeneratePoster,
} from "@/hooks/use-posters";

export default function PosterDetailsPage() {
  const params = useParams();

  const posterId =
    typeof params.id === "string"
      ? params.id
      : "";

  const {
    data: poster,
    isLoading,
    isError,
    error,
    refetch,
  } = usePoster(posterId);

  const regenerateMutation =
    useRegeneratePoster();

  const handleRegenerate = async () => {
    if (!poster) {
      return;
    }

    if (poster.generationCount >= 3) {
      return;
    }

    try {
      await regenerateMutation.mutateAsync(
        poster._id
      );
    } catch (error) {
      console.error(
        "Poster regeneration failed:",
        error
      );
    }
  };

  const handleDownload = async () => {
    if (!poster?.generatedImageUrl) {
      return;
    }

    try {
      const response = await fetch(
        poster.generatedImageUrl
      );

      if (!response.ok) {
        throw new Error(
          "Failed to download poster"
        );
      }

      const blob = await response.blob();

      const blobUrl =
        window.URL.createObjectURL(blob);

      const link =
        document.createElement("a");

      link.href = blobUrl;
      link.download = `poster-${poster._id}.png`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error(
        "Poster download failed:",
        error
      );

      // Fallback: open image in a new tab
      window.open(
        poster.generatedImageUrl,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  if (isLoading) {
    return (
      <DashboardShell>
        <GenerationLoader
          message="Loading your poster..."
        />
      </DashboardShell>
    );
  }

  if (isError || !poster) {
    return (
      <DashboardShell>
        <div className="mx-auto max-w-xl">
          <Card className="p-10 text-center">
            <h1 className="text-xl font-bold text-white">
              Poster not found
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              We could not load this poster. It may
              have been removed or the link may be
              invalid.
            </p>

            {error instanceof Error && (
              <p className="mt-3 text-xs text-red-400">
                {error.message}
              </p>
            )}

            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => refetch()}
                className="btn btn-secondary"
              >
                Try Again
              </button>

              <Link
                href="/dashboard/posters"
                className="btn btn-primary"
              >
                My Posters
              </Link>
            </div>
          </Card>
        </div>
      </DashboardShell>
    );
  }

  const canRegenerate =
    poster.generationCount < 3 &&
    !regenerateMutation.isPending;

  return (
    <DashboardShell>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <Link
            href="/dashboard/posters"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Posters
          </Link>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="page-title">
                Poster Preview
              </h1>

              <p className="page-description">
                Review your generated poster and
                manage your generations.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {poster.generatedImageUrl &&
                poster.status === "COMPLETED" && (
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download PNG
                  </Button>
                )}

              <Button
                variant="primary"
                onClick={handleRegenerate}
                loading={
                  regenerateMutation.isPending
                }
                disabled={!canRegenerate}
              >
                {!regenerateMutation.isPending && (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}

                {poster.generationCount >= 3
                  ? "Limit Reached"
                  : "Regenerate"}
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Preview */}
          <Card className="overflow-hidden p-3 sm:p-5">
            {poster.status === "GENERATING" && (
              <GenerationLoader />
            )}

            {poster.status === "FAILED" && (
              <div className="flex min-h-[500px] items-center justify-center px-6">
                <div className="max-w-sm text-center">
                  <div className="badge badge-danger">
                    Generation failed
                  </div>

                  <h2 className="mt-4 text-lg font-bold text-white">
                    We couldn&apos;t generate your
                    poster
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Something went wrong while
                    generating this poster. You can
                    try again if you still have
                    generations available.
                  </p>

                  <Button
                    variant="primary"
                    className="mt-5"
                    onClick={handleRegenerate}
                    loading={
                      regenerateMutation.isPending
                    }
                    disabled={!canRegenerate}
                  >
                    {!regenerateMutation.isPending && (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}

                    Try Again
                  </Button>
                </div>
              </div>
            )}

            {poster.status === "COMPLETED" &&
              poster.generatedImageUrl && (
                <div className="flex justify-center">
                  <img
                    src={poster.generatedImageUrl}
                    alt={`Generated poster for ${poster.name}`}
                    className="h-auto w-full max-w-[720px] rounded-xl object-contain shadow-2xl"
                  />
                </div>
              )}

            {poster.status === "COMPLETED" &&
              !poster.generatedImageUrl && (
                <div className="flex min-h-[500px] items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-lg font-bold text-white">
                      Poster image unavailable
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      The poster was generated but the
                      image URL is unavailable.
                    </p>
                  </div>
                </div>
              )}
          </Card>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Poster details */}
            <Card className="p-5">
              <h2 className="text-lg font-bold text-white">
                Poster Details
              </h2>

              <div className="mt-5 space-y-4">
                <DetailItem
                  label="Name"
                  value={poster.name}
                />

                {poster.designation && (
                  <DetailItem
                    label="Designation"
                    value={poster.designation}
                  />
                )}

                {poster.organization && (
                  <DetailItem
                    label="Organization"
                    value={poster.organization}
                  />
                )}

                <DetailItem
                  label="Occasion"
                  value={poster.occasion}
                />

                <DetailItem
                  label="Headline"
                  value={poster.headline}
                />

                {(poster.union ||
                  poster.thana ||
                  poster.district) && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Location
                    </p>

                    <div className="mt-1 space-y-1 text-sm text-slate-300">
                      {poster.union && (
                        <p>
                          Union: {poster.union}
                        </p>
                      )}

                      {poster.thana && (
                        <p>
                          Thana: {poster.thana}
                        </p>
                      )}

                      {poster.district && (
                        <p>
                          District: {poster.district}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Generation info */}
            <Card className="p-5">
              <h2 className="text-lg font-bold text-white">
                Generation
              </h2>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500">
                    Generations used
                  </span>

                  <span className="font-bold text-white">
                    {poster.generationCount} / 3
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        (poster.generationCount / 3) *
                          100,
                        100
                      )}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-slate-600">
                    Maximum 3 generations
                  </span>

                  <span
                    className={
                      poster.generationCount >= 3
                        ? "font-semibold text-amber-400"
                        : "text-slate-500"
                    }
                  >
                    {Math.max(
                      3 - poster.generationCount,
                      0
                    )}{" "}
                    remaining
                  </span>
                </div>
              </div>
            </Card>

            {/* Status */}
            <Card className="p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-white">
                  Status
                </h2>

                {poster.status === "COMPLETED" && (
                  <span className="badge badge-primary">
                    Completed
                  </span>
                )}

                {poster.status === "GENERATING" && (
                  <span className="badge badge-muted">
                    Generating
                  </span>
                )}

                {poster.status === "FAILED" && (
                  <span className="badge badge-danger">
                    Failed
                  </span>
                )}
              </div>

              <p className="mt-3 text-xs text-slate-600">
                Created{" "}
                {new Date(
                  poster.createdAt
                ).toLocaleString()}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

interface DetailItemProps {
  label: string;
  value: string;
}

function DetailItem({
  label,
  value,
}: DetailItemProps) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm text-slate-300">
        {value}
      </p>
    </div>
  );
}