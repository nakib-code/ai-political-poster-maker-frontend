import { LayoutTemplate } from "lucide-react";

import TemplateCard from "./template-card";

import type { Template } from "@/types/template";

interface TemplateGridProps {
  templates: Template[];
}

export default function TemplateGrid({
  templates,
}: TemplateGridProps) {
  if (templates.length === 0) {
    return (
      <div className="card flex min-h-[280px] flex-col items-center justify-center p-10 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
          <LayoutTemplate className="h-6 w-6" />
        </div>

        <h3 className="mt-4 text-lg font-bold text-white">
          No templates available
        </h3>

        <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
          There are no poster templates available right now.
          Please check again later.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard
          key={template._id}
          template={template}
        />
      ))}
    </div>
  );
}