"use client";

import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  FileImage,
  ImagePlus,
} from "lucide-react";

import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { usePosters } from "@/hooks/use-posters";

export default function DashboardPage() {
  const {
    data: posters = [],
    isLoading: postersLoading,
  } = usePosters();

  const completedPosters = posters.filter(
    (poster) => poster.status === "COMPLETED"
  );

  const generatingPosters = posters.filter(
    (poster) => poster.status === "GENERATING"
  );

  const recentPosters = posters.slice(0, 4);

  return (
    <div className="page-container">
      {/* Header */}
      <section className="mb-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-sm font-semibold text-emerald-400">
              Dashboard
            </p>

            <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              Your Poster Workspace
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
              Create, manage, and download your posters
              from one place.
            </p>
          </div>

          <Link href="/dashboard/create">
            <Button
              size="lg"
              className="w-full sm:w-auto"
            >
              <ImagePlus className="h-5 w-5" />
              Create New Poster
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Posters
              </p>

              <p className="mt-2 text-3xl font-black text-white">
                {postersLoading ? "—" : posters.length}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                All created posters
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
              <FileImage className="h-5 w-5 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Completed
              </p>

              <p className="mt-2 text-3xl font-black text-white">
                {postersLoading
                  ? "—"
                  : completedPosters.length}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Ready to download
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
              <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Processing
              </p>

              <p className="mt-2 text-3xl font-black text-white">
                {postersLoading
                  ? "—"
                  : generatingPosters.length}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Currently generating
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
              <Clock3 className="h-5 w-5 text-amber-400" />
            </div>
          </div>
        </Card>
      </section>

      {/* Quick Create */}
      <section className="mb-10">
        <div className="relative overflow-hidden rounded-2xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[0.08] via-slate-900 to-slate-950 p-6 sm:p-8">
          <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                <ImagePlus className="h-5 w-5 text-emerald-400" />
              </div>

              <h2 className="text-xl font-bold text-white">
                Create a new poster
              </h2>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                Choose a template, add your information and
                photos, then generate your poster.
              </p>
            </div>

            <Link href="/dashboard/create">
              <Button className="w-full sm:w-auto">
                Start Creating
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Recent Posters */}
      <section>
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white">
              Recent Posters
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your latest generated posters.
            </p>
          </div>

          {posters.length > 0 && (
            <Link
              href="/dashboard/posters"
              className="flex shrink-0 items-center gap-1.5 text-sm font-semibold text-emerald-400 transition hover:text-emerald-300"
            >
              View all
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>

        {postersLoading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="aspect-[4/5] animate-pulse rounded-2xl border border-white/5 bg-white/[0.03]"
              />
            ))}
          </div>
        ) : recentPosters.length === 0 ? (
          <Card className="p-8 sm:p-12">
            <div className="mx-auto flex max-w-md flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
                <ImagePlus className="h-7 w-7" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-white">
                No posters yet
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Choose a template and create your first
                professional poster.
              </p>

              <Link
                href="/dashboard/create"
                className="mt-6"
              >
                <Button>
                  Create Your First Poster
                </Button>
              </Link>
            </div>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentPosters.map((poster) => (
              <Link
                key={poster._id}
                href={`/dashboard/posters/${poster._id}`}
                className="group"
              >
                <Card className="overflow-hidden transition duration-200 group-hover:-translate-y-0.5 group-hover:border-emerald-500/20">
                  <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
                    {poster.generatedImageUrl ? (
                      <img
                        src={poster.generatedImageUrl}
                        alt={poster.headline}
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-600">
                        No preview
                      </div>
                    )}

                    <div className="absolute left-3 top-3">
                      <span
                        className={`rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide backdrop-blur-md ${
                          poster.status === "COMPLETED"
                            ? "border-emerald-400/20 bg-emerald-500/15 text-emerald-300"
                            : poster.status === "GENERATING"
                              ? "border-amber-400/20 bg-amber-500/15 text-amber-300"
                              : "border-red-400/20 bg-red-500/15 text-red-300"
                        }`}
                      >
                        {poster.status}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="truncate text-sm font-bold text-white">
                      {poster.headline}
                    </p>

                    <p className="mt-1 truncate text-xs text-slate-500">
                      {poster.name}
                    </p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}