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
      <div className="card p-10 text-center">
        <h3 className="text-lg font-bold">
          No templates available
        </h3>

        <p className="mt-2 text-sm text-slate-500">
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