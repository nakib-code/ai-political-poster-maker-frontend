"use client";

import Link from "next/link";
import { ArrowRight, LayoutTemplate } from "lucide-react";

import { useTemplates } from "@/hooks/use-templates";

export default function HomeTemplates() {
  const {
    data: templates = [],
    isLoading,
    isError,
  } = useTemplates();

  if (isLoading) {
    return (
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <div key={item} className="card overflow-hidden">
            <div className="aspect-[4/3] animate-pulse bg-white/[0.04]" />

            <div className="space-y-3 p-5">
              <div className="h-5 w-2/3 animate-pulse rounded bg-white/[0.06]" />
              <div className="h-4 w-1/2 animate-pulse rounded bg-white/[0.04]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="card mt-10 p-8 text-center">
        <LayoutTemplate className="mx-auto h-7 w-7 text-slate-600" />

        <p className="mt-3 text-sm text-slate-500">
          Templates are currently unavailable.
        </p>

        <Link
          href="/dashboard/templates"
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300"
        >
          Open Template Library
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  const visibleTemplates = templates.slice(0, 3);

  if (visibleTemplates.length === 0) {
    return (
      <div className="card mt-10 p-10 text-center">
        <LayoutTemplate className="mx-auto h-7 w-7 text-slate-600" />

        <p className="mt-3 text-sm text-slate-500">
          No templates are available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {visibleTemplates.map((template) => (
        <div
          key={template._id}
          className="card card-hover group overflow-hidden"
        >
          <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
            {template.thumbnailUrl ? (
              <img
                src={template.thumbnailUrl}
                alt={template.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <LayoutTemplate className="h-10 w-10 text-slate-700" />
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

            <div className="absolute left-4 top-4">
              <span className="badge badge-primary uppercase tracking-wider">
                {template.occasionType.replace("_", " ")}
              </span>
            </div>
          </div>

          <div className="p-5">
            <h3 className="font-bold text-white">{template.title}</h3>

            <p className="mt-1 text-xs text-slate-600">
              {template.layoutConfig.photoSlots}{" "}
              {template.layoutConfig.photoSlots === 1
                ? "photo slot"
                : "photo slots"}
            </p>

            <Link
              href={`/dashboard/create?template=${template._id}`}
              className="btn btn-outline btn-sm mt-5 w-full"
            >
              Use Template
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}