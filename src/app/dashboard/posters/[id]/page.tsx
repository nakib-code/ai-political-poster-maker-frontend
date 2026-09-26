"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  Download,
  FolderOpen,
  RefreshCw,
  Trash2,
} from "lucide-react";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import GenerationLoader from "@/components/poster/generation-loader";

import {
  useDeletePoster,
  usePoster,
  useRegeneratePoster,
} from "@/hooks/use-posters";

export default function PosterDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const posterId =
    typeof params.id === "string" ? params.id : "";

  const {
    data: poster,
    isLoading,
    isError,
    error,
    refetch,
  } = usePoster(posterId);

  const regenerateMutation = useRegeneratePoster();
  const deleteMutation = useDeletePoster();

  const handleRegenerate = async () => {
    if (!poster || poster.generationCount >= 3) {
      return;
    }

    try {
      await regenerateMutation.mutateAsync(poster._id);
    } catch (error) {
      console.error(
        "Poster regeneration failed:",
        error
      );
    }
  };

  const handleDelete = async () => {
    if (!poster || deleteMutation.isPending) {
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this poster? This action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteMutation.mutateAsync(poster._id);

      router.push("/dashboard/posters");
    } catch (error) {
      console.error(
        "Poster deletion failed:",
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
        throw new Error("Failed to download poster");
      }

      const blob = await response.blob();
      const blobUrl =
        window.URL.createObjectURL(blob);

      const link = document.createElement("a");

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

      window.open(
        poster.generatedImageUrl,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  /* Loading */
  if (isLoading) {
    return (
      <GenerationLoader message="Loading your poster..." />
    );
  }

  /* Error */
  if (isError || !poster) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
        <Card className="w-full max-w-md p-8 text-center sm:p-10">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
            <FolderOpen className="h-7 w-7 text-red-400" />
          </div>

          <h1 className="mt-5 text-xl font-bold text-white">
            Poster not found
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We could not load this poster. It may have been
            removed or the link may be invalid.
          </p>

          {error instanceof Error && (
            <p className="mt-3 break-words text-xs text-red-400">
              {error.message}
            </p>
          )}

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button
              variant="secondary"
              onClick={() => refetch()}
              className="w-full sm:w-auto"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </Button>

            <Link
              href="/dashboard/posters"
              className="w-full sm:w-auto"
            >
              <Button className="w-full">
                My Posters
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  const canRegenerate =
    poster.generationCount < 3 &&
    !regenerateMutation.isPending &&
    !deleteMutation.isPending;

  const generationsRemaining = Math.max(
    3 - poster.generationCount,
    0
  );

  const generationProgress = Math.min(
    (poster.generationCount / 3) * 100,
    100
  );

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <section className="mb-6">
          <Link
            href="/dashboard/posters"
            className="mb-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to My Posters
          </Link>

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="mb-2 text-sm font-semibold text-emerald-400">
                Poster Preview
              </p>

              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Your generated poster
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Review your poster, download it, or generate
                another version.
              </p>
            </div>

            {/* Actions */}
            <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:gap-3">
              {poster.generatedImageUrl &&
                poster.status === "COMPLETED" && (
                  <Button
                    variant="outline"
                    onClick={handleDownload}
                    disabled={deleteMutation.isPending}
                    className="w-full"
                  >
                    <Download className="h-4 w-4" />

                    <span className="hidden sm:inline">
                      Download
                    </span>

                    <span className="sm:hidden">
                      PNG
                    </span>
                  </Button>
                )}

              <Button
                onClick={handleRegenerate}
                loading={regenerateMutation.isPending}
                disabled={!canRegenerate}
                className="w-full"
              >
                {!regenerateMutation.isPending && (
                  <RefreshCw className="h-4 w-4" />
                )}

                {poster.generationCount >= 3
                  ? "Limit Reached"
                  : "Regenerate"}
              </Button>

              <Button
                variant="danger"
                onClick={handleDelete}
                loading={deleteMutation.isPending}
                disabled={deleteMutation.isPending}
                className="col-span-2 w-full sm:col-span-1"
              >
                {!deleteMutation.isPending && (
                  <Trash2 className="h-4 w-4" />
                )}

                Delete
              </Button>
            </div>
          </div>
        </section>

        {/* Main */}
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* Preview */}
          <Card className="overflow-hidden p-2 sm:p-4">
            {poster.status === "GENERATING" && (
              <GenerationLoader />
            )}

            {poster.status === "FAILED" && (
              <div className="flex min-h-[500px] items-center justify-center px-5 py-10 sm:px-8">
                <div className="max-w-sm text-center">
                  <span className="badge badge-danger">
                    Generation failed
                  </span>

                  <h2 className="mt-4 text-lg font-bold text-white">
                    We couldn't generate your poster
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Something went wrong while generating this
                    poster. You can try again if you still have
                    generations available.
                  </p>

                  <Button
                    className="mt-6"
                    onClick={handleRegenerate}
                    loading={regenerateMutation.isPending}
                    disabled={!canRegenerate}
                  >
                    {!regenerateMutation.isPending && (
                      <RefreshCw className="h-4 w-4" />
                    )}

                    {poster.generationCount >= 3
                      ? "Limit Reached"
                      : "Try Again"}
                  </Button>
                </div>
              </div>
            )}

            {poster.status === "COMPLETED" &&
              poster.generatedImageUrl && (
                <div className="flex justify-center rounded-xl bg-slate-950 p-1 sm:p-2">
                  <img
                    src={poster.generatedImageUrl}
                    alt={`Generated poster for ${poster.name}`}
                    className="h-auto w-full max-w-[720px] rounded-lg object-contain shadow-2xl"
                  />
                </div>
              )}

            {poster.status === "COMPLETED" &&
              !poster.generatedImageUrl && (
                <div className="flex min-h-[500px] items-center justify-center px-6">
                  <div className="text-center">
                    <h2 className="text-lg font-bold text-white">
                      Poster image unavailable
                    </h2>

                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      The poster was generated but the image URL
                      is unavailable.
                    </p>
                  </div>
                </div>
              )}
          </Card>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Poster Details */}
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

                    <div className="mt-2 space-y-1.5 text-sm text-slate-300">
                      {poster.union && (
                        <p className="break-words">
                          <span className="text-slate-500">
                            Union:
                          </span>{" "}
                          {poster.union}
                        </p>
                      )}

                      {poster.thana && (
                        <p className="break-words">
                          <span className="text-slate-500">
                            Thana:
                          </span>{" "}
                          {poster.thana}
                        </p>
                      )}

                      {poster.district && (
                        <p className="break-words">
                          <span className="text-slate-500">
                            District:
                          </span>{" "}
                          {poster.district}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Generation */}
            <Card className="p-5">
              <h2 className="text-lg font-bold text-white">
                Generation
              </h2>

              <div className="mt-5">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-slate-500">
                    Generations used
                  </span>

                  <span className="shrink-0 font-bold text-white">
                    {poster.generationCount} / 3
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                    style={{
                      width: `${generationProgress}%`,
                    }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 text-xs">
                  <span className="text-slate-600">
                    Maximum 3 generations
                  </span>

                  <span
                    className={
                      poster.generationCount >= 3
                        ? "shrink-0 font-semibold text-amber-400"
                        : "shrink-0 text-slate-500"
                    }
                  >
                    {generationsRemaining} remaining
                  </span>
                </div>
              </div>
            </Card>

            {/* Status */}
            <Card className="p-5">
              <div className="flex items-center justify-between gap-3">
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

              <p className="mt-3 break-words text-xs text-slate-600">
                Created{" "}
                {new Date(
                  poster.createdAt
                ).toLocaleString()}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
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

      <p className="mt-1 break-words text-sm leading-6 text-slate-300">
        {value}
      </p>
    </div>
  );
}