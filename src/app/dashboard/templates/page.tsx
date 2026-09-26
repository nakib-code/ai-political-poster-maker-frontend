"use client";

import {
  LayoutTemplate,
  RefreshCw,
} from "lucide-react";

import TemplateGrid from "@/components/templates/template-grid";
import Button from "@/components/ui/button";

import { useTemplates } from "@/hooks/use-templates";

export default function TemplatesPage() {
  const {
    data: templates = [],
    isLoading,
    isError,
    refetch,
  } = useTemplates();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        {/* Header */}
        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/10">
                  <LayoutTemplate className="h-4 w-4 text-emerald-400" />
                </div>

                <span className="text-sm font-semibold text-emerald-400">
                  Template Library
                </span>
              </div>

              <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
                Choose a template
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Select a design and start creating your poster.
              </p>
            </div>

            {isError && (
              <Button
                variant="outline"
                onClick={() => refetch()}
                className="w-full sm:w-auto"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            )}
          </div>
        </section>

        {/* Loading */}
        {isLoading && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="card overflow-hidden"
              >
                <div className="aspect-[4/5] animate-pulse bg-white/[0.04]" />

                <div className="space-y-3 p-5">
                  <div className="h-5 w-2/3 animate-pulse rounded-lg bg-white/[0.06]" />

                  <div className="h-4 w-1/2 animate-pulse rounded-lg bg-white/[0.04]" />

                  <div className="h-10 w-full animate-pulse rounded-xl bg-white/[0.04]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!isLoading && isError && (
          <div className="flex min-h-[45vh] items-center justify-center">
            <div className="card w-full max-w-md p-8 text-center sm:p-10">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
                <LayoutTemplate className="h-7 w-7 text-red-400" />
              </div>

              <h2 className="mt-5 text-lg font-bold text-white">
                Failed to load templates
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                We couldn't load the template library.
                Please check your connection and try again.
              </p>

              <Button
                variant="outline"
                onClick={() => refetch()}
                className="mt-6"
              >
                <RefreshCw className="h-4 w-4" />
                Try Again
              </Button>
            </div>
          </div>
        )}

        {/* Empty */}
        {!isLoading &&
          !isError &&
          templates.length === 0 && (
            <div className="flex min-h-[45vh] items-center justify-center">
              <div className="card w-full max-w-md p-8 text-center sm:p-10">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10">
                  <LayoutTemplate className="h-7 w-7 text-emerald-400" />
                </div>

                <h2 className="mt-5 text-lg font-bold text-white">
                  No templates available
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  There are currently no active templates
                  available for creating posters.
                </p>
              </div>
            </div>
          )}

        {/* Templates */}
        {!isLoading &&
          !isError &&
          templates.length > 0 && (
            <TemplateGrid templates={templates} />
          )}
      </div>
    </div>
  );
}