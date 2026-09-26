"use client";

import Link from "next/link";
import {
  Download,
  Eye,
  Image as ImageIcon,
} from "lucide-react";

import Card from "@/components/ui/card";

import type { Poster } from "@/types/poster";

interface PosterCardProps {
  poster: Poster;
}

export default function PosterCard({
  poster,
}: PosterCardProps) {
  const handleDownload = () => {
    if (!poster.generatedImageUrl) return;

    const link = document.createElement("a");

    link.href = poster.generatedImageUrl;
    link.download = `poster-${poster._id}.png`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const renderStatus = () => {
    switch (poster.status) {
      case "COMPLETED":
        return (
          <span className="badge badge-primary">
            Completed
          </span>
        );

      case "GENERATING":
        return (
          <span className="badge badge-muted">
            Generating...
          </span>
        );

      case "FAILED":
        return (
          <span className="badge badge-danger">
            Failed
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="group overflow-hidden">
      {/* Poster Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
        {poster.generatedImageUrl ? (
          <img
            src={poster.generatedImageUrl}
            alt={`Poster for ${poster.name}`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ImageIcon className="h-10 w-10 text-slate-700" />
          </div>
        )}

        {/* Status */}
        <div className="absolute left-3 top-3">
          {renderStatus()}
        </div>

        {/* Hover Actions */}
        {poster.generatedImageUrl && (
          <div className="absolute inset-x-0 bottom-0 flex translate-y-full gap-2 bg-gradient-to-t from-black/80 to-transparent p-4 pt-10 transition-transform duration-300 group-hover:translate-y-0">
            <Link
              href={`/dashboard/posters/${poster._id}`}
              className="btn btn-primary btn-sm flex-1"
            >
              <Eye className="h-4 w-4" />
              View
            </Link>

            <button
              type="button"
              onClick={handleDownload}
              aria-label="Download poster"
              title="Download poster"
              className="btn btn-secondary btn-sm"
            >
              <Download className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Poster Info */}
      <div className="p-4">
        <h3 className="truncate font-bold text-white">
          {poster.name}
        </h3>

        <p className="mt-1 truncate text-sm text-slate-500">
          {poster.headline}
        </p>

        <div className="mt-3 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-600">
            {new Date(poster.createdAt).toLocaleDateString()}
          </span>

          <span className="text-xs font-medium text-slate-500">
            {poster.generationCount}/3 generations
          </span>
        </div>
      </div>
    </Card>
  );
}