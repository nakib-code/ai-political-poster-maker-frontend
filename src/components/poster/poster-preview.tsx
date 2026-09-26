"use client";

import Image from "next/image";
import { Download, RefreshCw } from "lucide-react";

import Button from "@/components/ui/button";

import type { Poster } from "@/types/poster";

interface PosterPreviewProps {
  poster: Poster;
  onRegenerate: () => void;
  regenerating?: boolean;
}

export default function PosterPreview({
  poster,
  onRegenerate,
  regenerating = false,
}: PosterPreviewProps) {
  const canRegenerate = poster.generationCount < 3;

  const handleDownload = async () => {
    if (!poster.generatedImageUrl) return;

    try {
      const response = await fetch(poster.generatedImageUrl);
      const blob = await response.blob();

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `poster-${poster._id}.png`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Poster download failed:", error);

      window.open(
        poster.generatedImageUrl,
        "_blank",
        "noopener,noreferrer"
      );
    }
  };

  if (poster.status === "GENERATING") {
    return (
      <div className="card flex min-h-[500px] items-center justify-center">
        <div className="text-center">
          <span className="spinner mx-auto mb-5 block h-8 w-8" />

          <h2 className="text-lg font-semibold text-white">
            Generating your poster...
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            AI is preparing your poster. Please wait.
          </p>
        </div>
      </div>
    );
  }

  if (poster.status === "FAILED") {
    return (
      <div className="card flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-500/10 text-red-400">
            !
          </div>

          <h2 className="text-lg font-semibold text-white">
            Poster generation failed
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Something went wrong while generating the poster.
          </p>

          {canRegenerate && (
            <div className="mt-6">
              <Button
                onClick={onRegenerate}
                loading={regenerating}
              >
                <RefreshCw size={16} />
                Regenerate
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      {poster.generatedImageUrl ? (
        <div className="overflow-hidden rounded-xl bg-black">
          <Image
            src={poster.generatedImageUrl}
            alt={`Generated poster for ${poster.name}`}
            width={1080}
            height={1350}
            className="h-auto w-full"
            priority
            unoptimized
          />
        </div>
      ) : (
        <div className="flex min-h-[400px] items-center justify-center">
          <p className="text-sm text-slate-500">
            Poster image is not available.
          </p>
        </div>
      )}

      <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-white">
            Generation {poster.generationCount} / 3
          </p>

          <p className="mt-1 text-xs text-slate-500">
            {canRegenerate
              ? `${3 - poster.generationCount} regeneration${
                  3 - poster.generationCount === 1 ? "" : "s"
                } remaining`
              : "Maximum generations reached"}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={handleDownload}
            disabled={!poster.generatedImageUrl}
          >
            <Download size={16} />
            Download PNG
          </Button>

          {canRegenerate && (
            <Button
              onClick={onRegenerate}
              loading={regenerating}
            >
              <RefreshCw size={16} />
              Regenerate
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}