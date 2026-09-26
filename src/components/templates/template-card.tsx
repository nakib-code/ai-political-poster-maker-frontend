"use client";

import Link from "next/link";
import {
  ArrowRight,
  Image as ImageIcon,
} from "lucide-react";

import Card from "@/components/ui/card";

import TemplateBadge from "./template-badge";

import type { Template } from "@/types/template";

interface TemplateCardProps {
  template: Template;
}

export default function TemplateCard({
  template,
}: TemplateCardProps) {
  const photoSlots = template.layoutConfig.photoSlots;

  return (
    <Card className="card-hover group overflow-hidden">
      {/* Preview */}
      <div className="relative aspect-[4/5] overflow-hidden bg-slate-900">
        {template.thumbnailUrl ? (
          <img
            src={template.thumbnailUrl}
            alt={template.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-600">
            <ImageIcon className="h-10 w-10" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
          <TemplateBadge
            occasionType={template.occasionType}
          />
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="truncate text-base font-bold text-white">
          {template.title}
        </h3>

        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-xs text-slate-500">
            {photoSlots} photo
            {photoSlots === 1 ? "" : "s"} supported
          </p>

          <Link
            href={`/dashboard/create?template=${template._id}`}
            className="flex shrink-0 items-center gap-1 text-xs font-bold text-emerald-400 transition hover:text-emerald-300"
          >
            Use template
            <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}