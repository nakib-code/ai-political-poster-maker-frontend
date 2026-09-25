"use client";

import { RefreshCw, LayoutTemplate } from "lucide-react";

import DashboardShell from "@/components/layout/dashboard-shell";
import TemplateGrid from "@/components/templates/template-grid";
import Button from "@/components/ui/button";

import { useAuth } from "@/hooks/use-auth";
import { useTemplates } from "@/hooks/use-templates";

export default function TemplatesPage() {
  const { data: user } = useAuth();

  const {
    data: templates = [],
    isLoading,
    isError,
    refetch,
  } = useTemplates();

  return (
    <DashboardShell userName={user?.name}>
      {/* Header */}
      <section className="page-header">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-emerald-400">
              <LayoutTemplate className="h-5 w-5" />

              <span className="text-sm font-semibold">
                Template Library
              </span>
            </div>

            <h1 className="page-title">
              Choose a template
            </h1>

            <p className="page-description">
              Select a design and start creating your poster.
            </p>
          </div>

          {isError && (
            <Button
              variant="outline"
              onClick={() => refetch()}
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </Button>
          )}
        </div>
      </section>

      {/* Loading */}
      {isLoading ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="overflow-hidden rounded-xl border border-white/10 bg-slate-900"
            >
              <div className="aspect-[4/5] animate-pulse bg-slate-800" />

              <div className="space-y-3 p-4">
                <div className="h-5 w-2/3 animate-pulse rounded bg-slate-800" />

                <div className="h-4 w-1/2 animate-pulse rounded bg-slate-800" />
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="card p-10 text-center">
          <h3 className="text-lg font-bold">
            Failed to load templates
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Make sure the backend server is running.
          </p>
        </div>
      ) : (
        <TemplateGrid templates={templates} />
      )}
    </DashboardShell>
  );
}