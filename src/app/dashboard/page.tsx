"use client";

import Link from "next/link";
import {
  ArrowRight,
  FileImage,
  ImagePlus,
  Sparkles,
} from "lucide-react";
import DashboardShell from "@/components/layout/dashboard-shell";
import Card from "@/components/ui/card";
import Button from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { usePosters } from "@/hooks/use-posters";

export default function DashboardPage() {
  const { data: user, isLoading: userLoading } = useAuth();
  const { data: posters = [], isLoading: postersLoading } =
    usePosters();

  const completedPosters = posters.filter(
    (poster) => poster.status === "COMPLETED"
  );

  const recentPosters = posters.slice(0, 4);

  return (
    <DashboardShell userName={user?.name}>
      {/* Header */}
      <section className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-semibold text-emerald-400">
            Dashboard
          </p>

          <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
            {userLoading
              ? "Welcome back"
              : `Welcome back, ${user?.name || "Creator"}`}
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
            Create, manage, and download your professional
            posters from one place.
          </p>
        </div>

        <Link href="/dashboard/create">
          <Button size="lg">
            <ImagePlus className="h-5 w-5" />
            Create New Poster
          </Button>
        </Link>
      </section>

      {/* Stats */}
      <section className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Posters
              </p>

              <p className="mt-2 text-3xl font-black">
                {postersLoading ? "—" : posters.length}
              </p>
            </div>

            <div className="rounded-xl bg-blue-500/10 p-3 text-blue-400">
              <FileImage className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Completed
              </p>

              <p className="mt-2 text-3xl font-black">
                {postersLoading
                  ? "—"
                  : completedPosters.length}
              </p>
            </div>

            <div className="rounded-xl bg-emerald-500/10 p-3 text-emerald-400">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </Card>

        <Card className="p-5 sm:col-span-2 xl:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Max Generations
              </p>

              <p className="mt-2 text-3xl font-black">
                3
              </p>
            </div>

            <div className="rounded-xl bg-purple-500/10 p-3 text-purple-400">
              <Sparkles className="h-6 w-6" />
            </div>
          </div>
        </Card>
      </section>

      {/* Recent Posters */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold">
              Recent Posters
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Your latest generated posters.
            </p>
          </div>

          <Link
            href="/dashboard/posters"
            className="flex items-center gap-1 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
          >
            View all
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {postersLoading ? (
          <Card className="p-10 text-center text-sm text-slate-500">
            Loading posters...
          </Card>
        ) : recentPosters.length === 0 ? (
          <Card className="p-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400">
              <ImagePlus className="h-7 w-7" />
            </div>

            <h3 className="mt-5 text-lg font-bold">
              No posters yet
            </h3>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              Choose a template and create your first
              professional poster.
            </p>

            <Link
              href="/dashboard/create"
              className="mt-6 inline-block"
            >
              <Button>
                Create Your First Poster
              </Button>
            </Link>
          </Card>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {recentPosters.map((poster) => (
              <Link
                key={poster._id}
                href={`/dashboard/posters/${poster._id}`}
              >
                <Card hover className="overflow-hidden">
                  <div className="aspect-[4/5] bg-slate-900">
                    {poster.generatedImageUrl ? (
                      <img
                        src={poster.generatedImageUrl}
                        alt={poster.headline}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-slate-600">
                        No preview
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <p className="truncate text-sm font-bold">
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
    </DashboardShell>
  );
}