"use client";

import Link from "next/link";
import {
  FolderOpen,
  Loader2,
  Plus,
  RefreshCw,
} from "lucide-react";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import PosterCard from "@/components/poster/poster-card";

import { usePosters } from "@/hooks/use-posters";

export default function MyPostersPage() {
  const {
    data: posters = [],
    isLoading,
    isError,
    refetch,
  } = usePosters();

  /* -----------------------------
     Loading
  ----------------------------- */

  if (isLoading) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-emerald-500/10 bg-emerald-500/5">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-400" />
          </div>

          <p className="mt-4 text-sm font-medium text-slate-500">
            Loading your posters...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
                  <FolderOpen className="h-4 w-4 text-emerald-400" />
                </div>

                <span className="text-sm font-semibold text-emerald-400">
                  Poster Library
                </span>
              </div>

              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                My Posters
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                View, manage, and download all your
                generated posters.
              </p>
            </div>

            <Link
              href="/dashboard/templates"
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full sm:w-auto"
              >
                <Plus className="h-4 w-4" />
                Create Poster
              </Button>
            </Link>
          </div>
        </section>

        {/* Error */}
        {isError && (
          <div className="flex min-h-[45vh] items-center justify-center">
            <Card className="w-full max-w-md p-8 text-center sm:p-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
                <FolderOpen className="h-7 w-7 text-red-400" />
              </div>

              <h2 className="mt-5 text-lg font-bold text-white">
                Failed to load posters
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Something went wrong while loading your
                posters. Please try again.
              </p>

              <Button
                variant="outline"
                onClick={() => refetch()}
                className="mt-6"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </Card>
          </div>
        )}

        {/* Empty */}
        {!isError && posters.length === 0 && (
          <div className="flex min-h-[55vh] items-center justify-center">
            <Card className="w-full max-w-lg p-8 text-center sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10">
                <FolderOpen className="h-8 w-8 text-emerald-400" />
              </div>

              <h2 className="mt-5 text-xl font-bold text-white">
                No posters yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
                Your generated posters will appear here.
                Create your first poster by choosing a
                template and adding your information.
              </p>

              <Link
                href="/dashboard/templates"
                className="mt-7 inline-flex"
              >
                <Button size="lg">
                  <Plus className="h-4 w-4" />
                  Create Your First Poster
                </Button>
              </Link>
            </Card>
          </div>
        )}

        {/* Posters */}
        {!isError && posters.length > 0 && (
          <section>
            {/* Result count */}
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-300">
                  Your posters
                </p>

                <p className="mt-0.5 text-xs text-slate-600">
                  {posters.length}{" "}
                  {posters.length === 1
                    ? "poster"
                    : "posters"}{" "}
                  created
                </p>
              </div>
            </div>

            {/* Grid */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {posters.map((poster) => (
                <PosterCard
                  key={poster._id}
                  poster={poster}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}