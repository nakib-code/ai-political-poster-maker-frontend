"use client";

import Link from "next/link";
import { Plus, Loader2 } from "lucide-react";

import DashboardShell from "@/components/layout/dashboard-shell";
import Card from "@/components/ui/card";
import PosterCard from "@/components/poster/poster-card";

import { useAuth } from "@/hooks/use-auth";
import { usePosters } from "@/hooks/use-posters";

export default function MyPostersPage() {
  const { data: user } = useAuth();

  const {
    data: posters = [],
    isLoading,
    isError,
    refetch,
  } = usePosters();

  if (isLoading) {
    return (
      <DashboardShell userName={user?.name}>
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell userName={user?.name}>
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="page-title">
              My Posters
            </h1>

            <p className="page-description">
              View and manage all your generated
              posters.
            </p>
          </div>

          <Link
            href="/dashboard/templates"
            className="btn btn-primary"
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Poster
          </Link>
        </div>

        {/* Error */}
        {isError && (
          <Card className="p-8 text-center">
            <h2 className="text-lg font-bold text-white">
              Failed to load posters
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Something went wrong while loading
              your posters.
            </p>

            <button
              type="button"
              onClick={() => refetch()}
              className="btn btn-primary mt-5"
            >
              Try Again
            </button>
          </Card>
        )}

        {/* Empty */}
        {!isError && posters.length === 0 && (
          <Card className="p-12 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
              <Plus className="h-7 w-7 text-emerald-400" />
            </div>

            <h2 className="mt-5 text-xl font-bold text-white">
              No posters yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              Create your first poster by selecting
              a template and adding your information.
            </p>

            <Link
              href="/dashboard/templates"
              className="btn btn-primary mt-6"
            >
              Create Your First Poster
            </Link>
          </Card>
        )}

        {/* Posters */}
        {!isError && posters.length > 0 && (
          <>
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {posters.length}{" "}
                {posters.length === 1
                  ? "poster"
                  : "posters"}
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {posters.map((poster) => (
                <PosterCard
                  key={poster._id}
                  poster={poster}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardShell>
  );
}